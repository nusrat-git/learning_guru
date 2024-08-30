import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layouts/Main";
import Courses from "../components/Courses/Courses";
import Home from "../components/Home/Home";
import Details from "../components/Details/Details";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Auth/Login";
import Auth from "../layouts/Auth";
import Signup from "../components/Auth/Signup";
import Enroll from "../components/Enrollment/Enroll";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/courses",
          element: <Courses title={"All Courses"} />,
        },
        {
          path: "/courses/:courseId",
          element: <Details />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/enroll/:courseId",
          element: (
            <PrivateRoute>
              <Enroll />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <Auth />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/forget-password",
          element: (
            <div className="text-center">hehe, i forgot my password</div>
          ),
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default Routes;
