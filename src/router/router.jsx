import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
  },
  {
    path: "/authlayout",
    Component: AuthLayout,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
  },
]);
export default router;
