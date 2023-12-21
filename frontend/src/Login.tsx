import { AxiosError } from "axios";
import { useContext, useRef, useState } from "react";
import { UserContext } from "./providers/user";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);

  const [error, setError] = useState<AxiosError | null>(null);

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (idRef.current && passwordRef.current) {
      const credentials = {
        id: idRef.current.value,
        password: passwordRef.current.value,
      };

      console.log("logging in ...")
      login(credentials).catch((e) => {
        if (e instanceof AxiosError) {
          console.log(e);
          setError(e);
        }
      });
    }
  };
  return (
    <div className="grow flex-initial flex flex-col justify-center items-center gap-8 grow">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        {error ? (
          <p className="text-red-200">
            {error.cause?.message || error.message}
          </p>
        ) : null}
        <div className="input-container ">
          <label htmlFor="id-input">username or email</label>
          <input
            id="id-input"
            className="border-2 bg-slate-50 border-slate-200 rounded-sm px-1"
            type="text"
            ref={idRef}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password-input">password</label>
          <input
            id="password-input"
            className="border-2 bg-slate-50 border-slate-200 rounded-sm px-1"
            type="password"
            ref={passwordRef}
          />
        </div>
        <button type="submit" className="bg-slate-100 py-1 my-2 text-sm">
          login
        </button>
      </form>
    </div>
  );
};

export const Logout = () => {
  const {setUser} = useContext(UserContext);

  setUser(null);

  return <Navigate to="/" replace />;
}

export default Login;
