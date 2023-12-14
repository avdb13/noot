import { useRef } from "react";
import { Form } from "react-router-dom";

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  return (
    <div className="prose prose-slate 2xl:prose-2xl flex flex-col justify-center items-center gap-4 h-screen w-screen [&>*:capitalize]">
      <Form method="POST" action="/user/create" className="flex flex-col gap-2">
        <div className="input-container">
          <label htmlFor="username-input">username</label>
          <input id="username-input" type="text" ref={userRef} />
        </div>
        <div className="input-container">
        <label htmlFor="email-input">email</label>
        <input id="email-input" type="email" ref={userRef} />
        </div>
        <div className="input-container">
        <label htmlFor="password-input">password</label>
        <input id="password-input" type="password" ref={userRef} />
        </div>
        <button type="submit">create</button>
      </Form>
    </div>
  )
}

export default Register;
