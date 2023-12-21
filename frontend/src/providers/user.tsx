import { PropsWithChildren, createContext, useState } from "react"
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({} as UserState);


const UserProvider = (props: PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const login = (user) => {
    setUser(user);

    navigate("/account/profile");
  }

  const logout = () => {
    setUser(null);

    navigate("/", {replace: true});
  }
  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;
