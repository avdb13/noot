import {
  PropsWithChildren,
  PropsWithRef,
  PropsWithoutRef,
  useContext,
} from "react";
import { UserContext } from "./providers/UserContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SelectionMenu from "./quiz/Selection";

const App = () => {
  const user = useContext(UserContext);

  return (
    <BrowserRouter>
      <div className="prose prose-slate 2xl:prose-2xl flex flex-col justify-center items-center gap-8 h-screen w-screen [&>*:capitalize]">
        <nav className="flex justify-between sticky bg-zinc-200 w-full uppercase gap-4 p-4 font-bold">
          <Link to="/">home</Link>
          <div className="grow"></div>
          <Link to="/account/login">login</Link>
          <Link to="/account/register">register</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account/login" element={<Login />} />
        </Routes>
        <div className="text-slate-600 bg-slate-200 w-full p-4">
          <p>Noot, just another app</p>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
