import { PropsWithChildren, createContext, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user";


export const UserContext = createContext({} as UserState);

const UserProvider = (props: PropsWithChildren) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (credentials: Credentials) => {
    const resp = await userService.login(credentials);
    console.log(resp)
    setUser(resp.data as User);

    navigate("/account/profile");
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);

    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
