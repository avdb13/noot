import { useContext } from "react";
import { UserContext } from "./providers/UserContext";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col gap-8 justify-center grow">
      <div>
        <h1 className="text-4xl">noot</h1>
        <p> quiz-style games for family and friends </p>
      </div>
      <div className="flex gap-8">
        <div>
          <h2>join game</h2>
          <input
            type="number"
            placeholder="123456"
            className="bg-slate-200 p-1 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl">create your own quiz</h2>
        </div>
      </div>
    </div>
  );
};

export const HomeNav = () => {
  const { user } = useContext(UserContext);
  console.log(user)

  return (
    <>
      <Link to="/">home</Link>
      <div className="grow"></div>
      {user ? (
        <>
          <p>profile</p>
          <Link to="/account/logout">logout</Link>
        </>
      ) : (
        <>
          <Link to="/account/login">login</Link>
          <Link to="/account/register">register</Link>
        </>
      )}
      {user ? <Link to="/account/create">create</Link> : null}
    </>
  );
};

export default Home;
