import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Form , useNavigate } from "react-router-dom";
import { UserContext } from "./providers/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);

  const [alert, setAlert] = useState<string | null>(null);
  const navigate = useNavigate();

  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const user = {
      id: idRef.current?.value,
      password: passwordRef.current?.value,
    };
    console.log(user)

    axios.post("http://localhost:3000/auth/login", user).then(resp => {
      setUser(resp.data);

      navigate("/account/profile");
    }).catch(e => {
      console.log(e);
    });
  };
  return (
    <div className="prose prose-slate 2xl:prose-2xl flex flex-col justify-center items-center gap-4 h-screen w-screen [&>*:capitalize]">
      <Form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <div className="input-container">
          <label htmlFor="id-input">username or email</label>
          <input id="id-input" type="text" ref={idRef} />
        </div>
        <div className="input-container">
          <label htmlFor="password-input">password</label>
          <input id="password-input" type="password" ref={passwordRef} />
        </div>
        <button type="submit">login</button>
      </Form>
    </div>
  );
};

export default Login;
