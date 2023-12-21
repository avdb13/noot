import { ComponentProps, useContext, useId, useState } from "react";
import { UserContext } from "../providers/user";

export const CreateNav = () => {
  return (
    <>
    <div className="grow"></div>
    <button>save</button>
    <button>exit</button>
    </>
  )
}

const CreateQuiz = () => {
  const newQuestion: Question = {
    body: "",
    picture: null,
    answers: new Array(4).fill({}).map(() => ({body: "", correct: false} as Answer)),
  };
  console.log(document.cookie.split(";").find(cookie => cookie.startsWith("auth")))

  const {user} = useContext(UserContext);
  const [questions, setQuestions] = useState([newQuestion])
  const [selection, setSelection] = useState(0);

  if (!user) {
    return null;
  }

  const handleSave = () => {
    console.log(user);
    const _quiz: Quiz = {questions, title: "some quiz", user: user.username};

    // uploadQuiz(user.token, quiz);
  }

  console.log(questions);
  return (
    <div className="w-full grow flex items-center">
      <ul className="pl-6 pr-4 flex flex-col min-w-0 basis-1/6 bg-slate-100 h-full gap-2 p-2 list-decimal">
        {[...Array(questions.length).keys()].map((i) => (
          <button
            key={i + "readonly"}
            onClick={() => setSelection(i)}
          className={`box-content rounded-sm h-32 w-full border-4 ${selection === i ? "border-sky-400" : "border-white"}`}
          >
            <SlidePreview question={questions[i] ?? newQuestion} />
          </button>
        ))}
        <div className="flex flex-col gap-2">
          <button
            className="w-full p-2 bg-slate-200 "
            onClick={() => setQuestions([...questions, newQuestion])}
          >
            add question
          </button>
          <button className="w-full p-2 bg-slate-200 ">question bank</button>
        </div>
      </ul>
      <div className="flex flex-col grow h-full">
        <button onClick={handleSave} className="border-dotted border-2 text-center">last saved at</button>
        <Slide
          selection={selection}
          setQuestion={(p) =>
            setQuestions(questions.map((q, j) => (j !== selection ? q : p)))
          }
          question={questions[selection]!}
        />
      </div>
    </div>
  );
};

const SlidePreview = ({
  question
}: {
  question: Question;
}) => {
  return (
    <div
      id="editor"
      className={`w-full h-full flex-initial flex flex-col items-center pointer-events-none bg-white`}
    >
      <div className="text-xs font-bold flex items-center justify-center w-[90%] h-1/5 whitespace-nowrap">
        <p className="truncate max-w-full"
        >{question.body}</p>
      </div>
      <div className="h-2/5 w-1/2 shrink bg-slate-100 flex items-center justify-center">
        {question.picture &&
          <img
            src={URL.createObjectURL(question.picture)}
            className="w-full h-full object-contain"
          />
        }
      </div>

      <div className="w-full h-2/5 gap-1 grid grid-cols-2 p-2">
        {[...Array(4).keys()].map((i) => (
          <div
            className="border-sky-100 border-2 h-[80%] bg-white flex items-center w-full"
            style={{ filter: `hue-rotate(${(360 / 4) * i}deg)` }}
            key={i}
          >
            <div className="w-full flex items-center gap-2 grow">
              <Checkbox
                className="w-3 h-full outline-none"
                checked={question.answers[i]?.correct ?? false}
                readOnly
              />
              <p
                className={`w-full`}
              >{question.answers[i]?.body ?? ""}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Slide = ({
  question,
  setQuestion,
  selection,
}: {
  question: Question;
  setQuestion: (_: Question) => void;
  selection: number;
}) => {
  const handleFileChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const e = event.target as HTMLInputElement;

    if (e.files) {
      setQuestion({ ...question, picture: e.files[0] || null });
    }
  };

  return (
    <div
      id="editor"
      className={`grow flex-initial flex flex-col items-center gap-8 grow justify-center`}
    >
      <TextInput
        value={question.body}
        onChange={(e) => setQuestion({ ...question, body: e.target.value })}
        className="w-[60%] text"
      />
      <div className="h-64 w-1/2 shrink bg-slate-100 rounded-md shadow-inner flex items-center justify-center">
        <input
          id={`image-picker-${selection}`}
          type="file"
          className="opacity-0 absolute"
          onChange={handleFileChange}
        />
        <label
          className="h-full w-full relative group flex flex-col items-center justify-center"
          htmlFor={`image-picker-${selection}`}
        >
          {question.picture ? (
            <img
              src={URL.createObjectURL(question.picture)}
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              <ImageIcon className="duration-300 transition-all group-hover:opacity-50 opacity-75 fill-current text-slate-600" />
              <p className="text-xs font-bold text-slate-600">
                click here to select your image
              </p>
            </>
          )}
        </label>
      </div>

      <div className="w-[60%] grid grid-cols-2 gap-4">
        {[...Array(4).keys()].map((i) => (
          <div
            className="bg-sky-100 flex items-center p-2 rounded-md w-full"
            style={{ filter: `hue-rotate(${(360 / 4) * i}deg)` }}
          >
            <div className="w-full flex items-center gap-2 grow">
              <Checkbox
                onChange={(e) =>
                  setQuestion
                    ? setQuestion({
                        ...question,
                        answers: question.answers.map((a, j) =>
                          j === i ? ({...a, correct: e.target.checked}) : a,
                        ),
                      })
                    : null
                }
                checked={question.answers[i]?.correct ?? false}
              />
              <TextInput
                className={`w-full ${selection ? null : "bg-white outline-sky-200"}`}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    answers: question.answers.map((a, j) =>
                      j === i ? ({...a, correct: e.target.checked}) : a,
                    ),
                  })
                }
                value={question.answers[i]?.body ?? ""}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TextInput = (props: ComponentProps<"input">) => {
  const { className, ...rest } = props;

  return (
    <div className={`min-w-0 flex border-2 border-slate-200  ${className}`}>
      <input
        className={`grow px-1 text-center focus:outline-none
          bg-slate-100 focus:bg-white
        `}
        type="text"
        {...rest}
      />
    </div>
  );
};

const ImageIcon = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4 10V6a2 2 0 0 1 2-2h6M4.027 18.329A2 2 0 0 0 6 20h12a2 2 0 0 0 2-2v-3.81M4.027 18.33A2.014 2.014 0 0 1 4 18v-3m.027 3.329 3.82-3.82a2 2 0 0 1 2.427-.16l.51.34a2 2 0 0 0 2.358-.103l2.648-2.118a2 2 0 0 1 2.333-.12c.08.052.15.115.217.182L20 14.19m0 0V6a2 2 0 0 0-2-2h-1m-6 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </svg>
);

const Checkbox = (props: ComponentProps<"input">) => {
  const [checked, setChecked] = useState(false);
  const id = useId();

  return (
    <label
      className={`box-border rounded-sm border-2 h-4 w-4 ${
        checked ? "bg-slate-400" : "bg-white"
      }`}
      htmlFor={id}
    >
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onClick={() => setChecked(!checked)}
        {...props}
      />
    </label>
  );
};

export default CreateQuiz;
