import { ComponentProps, useId, useMemo, useRef, useState } from "react";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selection, setSelection] = useState(0);

  return (
    <div className="w-full grow flex items-center gap-8">
      <ul className="pl-6 flex flex-col basis-1/6 bg-slate-100 h-full gap-2 p-2 list-decimal">
        <li className="h-32 w-full bg-sky-50 border-2">ok</li>
        <div className="flex flex-col gap-2">
          <button className="w-full p-2 bg-slate-200 ">add question</button>
          <button className="w-full p-2 bg-slate-200 ">question bank</button>
        </div>
      </ul>
      {[...Array(questions.length + 1).keys()].map((i) => (
        <Slide
          setQuestion={(question) =>
            setQuestions(questions.map((q, j) => (j === i ? question : q)))
          }
        question={questions[0] || {picture: null, answers: [], question: ""}}
        />
      ))}
    </div>
  );
};

type Question = {
  question: string;
  answers: [string, boolean][];
  picture: File | null;
};

const Slide = ({
  question,
  setQuestion,
}: {
  question: Question;
  setQuestion: (_: Question) => void;
}) => {
  const handleChange = (event: React.SyntheticEvent) => {
    const e = event.target as HTMLInputElement;

    const picture = e.files?.item(0) || null;
    if (picture) {
      setQuestion({ ...question, picture });
    }
  };

  return (
    <div
      id="editor"
      className="grow flex-initial flex flex-col items-center gap-8 grow"
    >
      <TextInput className="w-[60%] text" />

      <div className="h-64 w-1/2 shrink bg-slate-100 rounded-md shadow-inner flex items-center justify-center">
        <input
          id="image-picker"
          type="file"
          className="hidden"
          onChange={handleChange}
        />
        <label
          className="h-full w-full relative group flex flex-col items-center justify-center"
          htmlFor="image-picker"
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
                  setQuestion({
                    ...question,
                    answers: question.answers.map((a, j) =>
                      j === i
                        ? [question.answers.at(i)?.at(0) as string || "", e.target.checked]
                        : a,
                    ),
                  })
                }
                checked={question.answers.at(i)?.at(1) as boolean || false}
              />
              <TextInput className="w-full"
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    answers: question.answers.map((a, j) =>
                      j === i
                        ? [e.target.value, question.answers.at(i)?.at(1) as boolean || false]
                        : a,
                    ),
                  })
                }
                value={question.answers.at(i)?.at(0) as string || ""}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TextInput = (props: ComponentProps<"input">) => {
  const [editing, setEditing] = useState(false);

  return (
    <div
      className={`min-w-0 flex border-2 border-slate-200  ${props.className}`}
    >
      <input
        onBlur={() => setEditing(false)}
        onFocus={() => setEditing(true)}
        className={`grow px-1 text-center focus:outline-none ${
          editing ? "bg-slate-100" : "bg-white"
        }`}
        disabled={!editing}
        type="text"
        {...props}
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
