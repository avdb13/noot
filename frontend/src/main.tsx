import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/account/register",
    element: <Register />,
  }
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
