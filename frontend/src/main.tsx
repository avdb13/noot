import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import UserProvider from "./providers/UserContext";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/account/register",
    element: <Register />,
  },

  {
    path: "/account/login",
    element: <Login />,
  },
  {
    path: "/account/profile",
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
