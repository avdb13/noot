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
      <input className="h-[5%] w-[40%]" type="text" />

      <input type="file" />

      <div className="grid grid-cols-2 gap-4">
        {[...Array(4).keys()].map((i) => (
          <div
            className="bg-sky-100 flex items-center p-8 rounded-md gap-4"
            style={{ filter: `hue-rotate(${(360 / 4) * i}deg)` }}
          >
            <Checkbox />
            <input
              className="w-full"
              type="text"
              style={{ background: "white" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateQuiz;
