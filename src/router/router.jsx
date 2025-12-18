import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AuthLayout from "../Layouts/AuthLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

import Loader from "../Components/Common/Loader";
import Error from "../Components/Common/Error";
import CreateMeals from "../RoleBase/Chef/CreateMeals";
import Home from "../Pages/Home/Home";
import Allmeals from "../Pages/Allmeals/Allmeals";
import PrivateRoute from "../Components/Common/PrivateRoute";
import Details from "../Pages/Allmeals/Details";
import Order from "../Pages/Allmeals/Order";
import success from "../Components/Payment/success";
import MyOrders from "../RoleBase/User/MyOrders";
import MyProfile from "../Layouts/MyProfile";
import ManageRequests from "../RoleBase/Admin/ManageRequests";
import ManageUsers from "../RoleBase/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import ChefRoute from "./ChefRoute";

const router = createBrowserRouter([
  {
    path: "/",

    Component: MainLayout,

    errorElement: <Error />,
    hydrateFallbackElement: <Loader></Loader>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allmeals",
        Component: Allmeals,
      },
      {
        path: "/meals/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
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
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      ///admin

      {
        path: "manage-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRequests></ManageRequests>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      // chef
      { path: "createmeals", Component: CreateMeals },

      ///user
      {
        path: "order/:id",

        element: (
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        ),
        loader: () => fetch("/locations.json").then((res) => res.json()),
      },

      { path: "my-orders", Component: MyOrders },

      { path: "success", Component: success },
    ],
  },
]);
export default router;
