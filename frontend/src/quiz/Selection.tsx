const SelectionMenu = () => {
  return (
    <div className="grid grid-cols-2 h-[80%] w-full gap-8">
      {[...Array(4).keys()].map(i => (
        <div className={`bg-slate-200 rounded-md w-80 scale-90 hover:scale-100 ease-out duration-300 bg-sky-100 shadow-md`} style={{filter: `hue-rotate(${360/4*i}deg)`}}></div>
      ))}
    </div>
  )
}

export default SelectionMenu;
