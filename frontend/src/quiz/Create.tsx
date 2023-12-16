import { useId, useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  const id = useId();

  return (
    <span>
      <input id={id} type="checkbox" className="hidden" onClick={() => setChecked(!checked)} />
      <label className="whitespace-nowrap font-bold text-xl" htmlFor={id}>{checked ? "[X]" : "[ ]"}</label>
    </span>
  );
};
const CreateQuiz = () => {
  const [amount, setAmount] = useState(3);

  return (
    <div className="grow w-full flex flex-col items-center gap-8">
      <TextInput />

      <input type="file" />

      <div className="grid grid-cols-2 gap-4">
        {[...Array(4).keys()].map((i) => (
          <div
            className="bg-sky-100 flex items-center p-8 rounded-md gap-4"
            style={{ filter: `hue-rotate(${(360 / 4) * i}deg)` }}
          >
            <Checkbox />
            <input
              className="w-full text-xl px-2"
              type="text"
              style={{ background: "white" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const TextInput = () => {
  const [editing, setEditing] = useState(false);
  return (
    <span className="w-1/2 flex border-2 border-slate-200">
    <input className={`px-2 text-center text-3xl focus:outline-none grow ${editing ? "bg-slate-100" : "bg-white"}`} disabled={!editing} type="text" />
      <button className="basis-[10%] text-xl border-l-2 border-slate-200 bg-white p-2" onClick={() => setEditing(!editing)}>{editing ? "save" : "edit"}</button>
    </span>

  )
}

export default CreateQuiz;
