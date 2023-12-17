import { PropsWithChildren, createContext, useState } from "react"

export type User = {
  token: string;
  username: string;
  email: string;
}

export type UserState = {
  user: User | null;
  setUser: (_: User | null) => void;
}

export const UserContext = createContext({} as UserState);

const UserProvider = (props: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider;
