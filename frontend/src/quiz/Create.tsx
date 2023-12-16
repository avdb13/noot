import { ComponentProps, useId, useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  console.log(checked)
  const id = Math.random().toString();

  return (
    <label className={`box-border rounded-sm border-4 h-8 w-8 ${checked ? "bg-slate-400" : "bg-white"}`} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onClick={() => setChecked(!checked)}
      />
    </label>
  );
};
const CreateQuiz = () => {
  const [amount, setAmount] = useState(3);
  const [picture, setPicture] = useState<string | null>(null);

  const handleChange = (event: React.SyntheticEvent) => {
    const e = event.target as HTMLInputElement;

    if (e.files && e.files[0]) {
      setPicture(URL.createObjectURL(e.files[0]));
    }
  };

  return (
    <div className="grow flex items-center gap-8">
      <div className="basis-1/3 bg-slate-200 h-full">
      
      </div>
      <div className="flex-initial flex flex-col items-center gap-8">
        <nav className="basis-1/6 flex-initial flex justify-between sticky bg-zinc-200 w-1/2 uppercase gap-4 p-4 font-bold">
          <button>save</button>
          <button>exit</button>
        </nav>
        <TextInput />

        <div className="basis-1/2 bg-slate-100 rounded-md shadow-inner w-1/3 flex items-center justify-center">
          <input
            id="image-picker"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
          <label
            className="relative group basis-full flex flex-col items-center justify-center p-32"
            htmlFor="image-picker"
          >
            {picture ? (
              <>
                <img src={picture} className="peer shadow-md duration-300 transition-all hover:blur-[2px]" />
                <ImageIcon className="absolute center duration-300 transition-all peer-hover:opacity-50 opacity-0 fill-current text-slate-600" />
              </>
            ) : (
              <>
                <ImageIcon className="duration-300 transition-all group-hover:opacity-50 opacity-75 fill-current text-slate-600" />
                <p className="text-lg font-bold text-slate-600">
                  click here to select your image
                </p>
              </>
            )}
          </label>
        </div>

        <div className="basis-1/2 grid grid-cols-2 gap-4">
          {[...Array(4).keys()].map((i) => (
            <div
              className="bg-sky-100 flex items-center p-4 rounded-md gap-2"
              style={{ filter: `hue-rotate(${(360 / 4) * i}deg)` }}
            >
              <div className="flex items-center gap-4">
                <Checkbox />
                <TextInput />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TextInput = () => {
  const [editing, setEditing] = useState(false);
  return (
    <div className="flex border-2 border-slate-200">
      <input
        className={`px-2 text-center text-xl focus:outline-none grow ${
          editing ? "bg-slate-100" : "bg-white"
        }`}
        disabled={!editing}
        type="text"
      />
      <button
        className="basis-[10%] text-sm border-l-2 border-slate-200 bg-white p-2"
        onClick={() => setEditing(!editing)}
      >
        {editing ? "save" : "edit"}
      </button>
    </div>
  );
};

const ImageIcon = (props: ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={80}
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

export default CreateQuiz;
