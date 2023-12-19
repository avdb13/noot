import axios, { AxiosError } from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./providers/UserContext";
import { useCookies } from "react-cookie";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [_cookies, setCookie] = useCookies(['auth']);

  const [error, setError] = useState<AxiosError | null>(null);
  const navigate = useNavigate();

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const credentials = {
      id: idRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log(user)

    axios.post("http://localhost:3000/auth/login", credentials).then(resp => {
      setUser(resp.data);
      if (!user) {
        return;
      }
      setCookie('auth', user.token, {});

      navigate("/account/profile");
    }).catch(e => {
      if (e instanceof AxiosError) {
        console.log(e)
        setError(e)
      }
    });
  };
  return (
    <div
      className="grow flex-initial flex flex-col justify-center items-center gap-8 grow"
    >
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        {error ? (<p className="text-red-200">{error.cause?.message || error.message}</p>) : null}
        <div className="input-container ">
          <label htmlFor="id-input">username or email</label>
          <input id="id-input" className="border-2 bg-slate-50 border-slate-200 rounded-sm px-1" type="text" ref={idRef} />
        </div>
        <div className="input-container">
          <label htmlFor="password-input">password</label>
          <input id="password-input" className="border-2 bg-slate-50 border-slate-200 rounded-sm px-1" type="password" ref={passwordRef} />
        </div>
        <button type="submit" className="bg-slate-100 py-1 my-2 text-sm">login</button>
      </form>
    </div>
  );
};

export default Login;
