import axios from "axios";
import { useRef, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const Register = () => {
  const [alert, setAlert] = useState<string | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const user = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log(user)

    return axios.post("http://localhost:3000/user", user).then(() => {
      console.log("ok");
      navigate("/account/login");
    }).catch(e => {
      console.log(e);
    });
  };
  return (
    <div className="prose prose-slate 2xl:prose-2xl flex flex-col justify-center items-center gap-4 h-screen w-screen [&>*:capitalize]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <div className="input-container">
          <label htmlFor="username-input">username</label>
          <input id="username-input" className="border-2 bg-slate-50 border-slate-200 rounded-sm px-1" type="text" ref={usernameRef} />
        </div>
        <div className="input-container">
          <label htmlFor="email-input">email</label>
          <input id="email-input" className="border-2 bg-slate-50 border-slate-200 rounded-sm px-1" type="email" ref={emailRef} />
        </div>
        <div className="input-container">
          <label htmlFor="password-input">password</label>
          <input id="password-input" className="border-2 bg-slate-50 border-slate-200 rounded-sm px-1" type="password" ref={passwordRef} />
        </div>
        <button type="submit" className="bg-slate-100 py-1 my-2 text-sm">register</button>
      </form>
    </div>
  );
};

export default Register;
