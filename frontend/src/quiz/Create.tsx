import { useState } from "react"

const CreateQuiz = () => {
  const [amount, setAmount] = useState(3);

  return (
    <div className="grow w-full flex flex-col items-center gap-8">
      <input className="h-[5%] w-[40%]" type="text" />

      <input type="file" />

      <div className="grid grid-cols-2 gap-4">
        {[...Array(4).keys()].map(i => (
          <div className="bg-slate-200 flex items-center p-8 rounded-md">
            <input type="checkbox" className="scale-[2]" />
            <input className="h-[5%] w-[40%]" type="text" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CreateQuiz;
