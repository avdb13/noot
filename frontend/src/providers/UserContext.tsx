import { PropsWithChildren, createContext, useState } from "react"

export type User = {
  token: string;
  username: string;
  email: string;
}

export type UserState = {
  user?: User;
  setUser: (_: User) => void;
}

export const UserContext = createContext({} as UserState);

const UserProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | undefined>();

  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;
