import {
  Route,
  Routes
} from "react-router-dom";
import Home, { HomeNav } from "./Home";
import Login, { Logout } from "./Login";
import CreateQuiz, { CreateNav } from "./quiz/Create";
import Register from "./Register";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <div className="[&>*]:font-poppins flex flex-col justify-center items-center h-screen w-screen [&>*]:capitalize ">
      <nav className="basis-1/8 flex-initial flex justify-between sticky bg-zinc-200 w-full [&>*]:uppercase gap-4 p-4 font-medium">
        <Routes>
          <Route path="/account/create" element={<CreateNav />} />
          <Route path="*" element={<HomeNav />} />
        </Routes>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/create" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
        <Route path="/account/register" element={<Register />} />
        <Route
          path="/account/logout"
          element={<Logout />}
        />
      </Routes>
      <div className="basis-1/8 flex-initial text-slate-600 bg-slate-200 w-full p-4">
        <p>Noot, just another app</p>
      </div>
    </div>
  );
};

export default App;
