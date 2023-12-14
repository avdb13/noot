const App = () => {

  return (
    <div className="prose prose-slate 2xl:prose-2xl flex flex-col justify-center items-center gap-8 h-screen w-screen [&>*:capitalize]">
      <div>
        <h1 className="text-4xl">noot</h1>
        <p> quiz-style games for family and friends </p>
      </div>
      <div className="flex">
        <div>
          <h2>join game</h2>
          <input type="number" placeholder="123456" className="bg-slate-200 p-1 rounded-md" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl">create your own quiz</h2>
          <button>register</button>
          <button>login</button>
        </div>
      </div>
    </div>
  )
};

export default App;
