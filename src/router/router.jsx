import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Loader from "../Components/Common/Loader";
import Error from "../Components/Common/Error";

const router = createBrowserRouter([
  {
    path: "/",

    Component: MainLayout,
    hydrateFallbackElement: <Loader />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      { path: "login", Component: Login },
      {
        path: "register",
        Component: Register,
        loader: () => fetch("/locations.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
  },
]);
export default router;
