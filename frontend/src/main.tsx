import ReactDOM from "react-dom/client";
import "./index.css";
import UserProvider from "./providers/user";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//   },

//   {
//     path: "/account/register",
//     element: <Register />,
//   },

//   {
//     path: "/account/login",
//     element: <Login />,
//   },
//   {
//     path: "/account/profile",
//     element: <ProtectedRoute><Profile /></ProtectedRoute>,
//   }
// ])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
);
