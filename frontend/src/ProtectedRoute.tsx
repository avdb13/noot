import { PropsWithChildren, useContext } from "react";
import { UserContext } from "./providers/UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props: PropsWithChildren)  => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" />
  }

  return props.children;
}

export default ProtectedRoute;
