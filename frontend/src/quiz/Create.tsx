import { ComponentProps, useId, useState } from "react";

const CreateQuiz = () => {
  const newQuestion = {picture: new Blob(), answers: ["", "", "", ""], correct: [false, false, false, false], question: ""};
  const [questions, setQuestions] = useState<Question[]>([newQuestion]);
  const [selection, setSelection] = useState(0);

  console.log(questions)
  return (
    <div className="w-full grow flex items-center gap-8">
      <ul className="pl-6 flex flex-col basis-1/6 bg-slate-100 h-full gap-2 p-2 list-decimal">
          {
            [...Array(questions.length).keys()].map((i) => (
            <button key={i+"readonly"} onClick={() => setSelection(i)} className="h-32 w-full bg-sky-50 border-2 scale-[10%]">
              <Slide
                setQuestion={() => {}}
                question={questions[i]}
                readonly
              />
            </button>
          ))
          }
        <div className="flex flex-col gap-2">
          <button className="w-full p-2 bg-slate-200 " onClick={() => setQuestions([...questions, newQuestion])}>add question</button>
          <button className="w-full p-2 bg-slate-200 ">question bank</button>
        </div>
      </ul>
      <Slide
        setQuestion={(p) => setQuestions(questions.map((q, j) => j !== selection ? q : p))}
        question={questions[selection]}
      />
    </div>
  );
};

type Question = {
  question: string;
  answers: string[];
  correct: boolean[];
  picture: Blob;
};

const Slide = ({
  question,
  setQuestion,
  readonly = false,
}: {
  question: Question;
  setQuestion: (_: Question) => void;
  readonly?: boolean;
}) => {
  const handleFileChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const e = event.target as HTMLInputElement;

    if (e.files) {
      setQuestion({...question, picture: e.files[0]})
    }
  };

  console.log(question.picture.type)
  return (
    <div
      id="editor"
      className={`grow flex-initial flex flex-col items-center gap-8 grow ${readonly ? "pointer-events-none" : null}`}
    >
      <TextInput value={question.question} onChange={(e) => setQuestion({...question, question: e.target.value})} className="w-[60%] text" />
      <div className="h-64 w-1/2 shrink bg-slate-100 rounded-md shadow-inner flex items-center justify-center">
        <input
          id="image-picker"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          className="h-full w-full relative group flex flex-col items-center justify-center"
          htmlFor="image-picker"
        >
          {question.picture.size > 0 ? (
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
                onChange={(e) => setQuestion ?
                  setQuestion({
                    ...question,
                    correct: question.correct.map((a, j) =>
                      j === i
                        ? e.target.checked
                        : a,
                    ),
                  })
                  : null}
                checked={question.correct[i]}
              />
              <TextInput className="w-full"
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    answers: question.answers.map((a, j) =>
                      j === i
                        ? e.target.value
                        : a,
                    ),
                  })
                }
                value={question.answers[i]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TextInput = (props: ComponentProps<"input">) => {
  const {className, ...rest} = props;

  return (
    <div
      className={`min-w-0 flex border-2 border-slate-200  ${className}`}
    >
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
