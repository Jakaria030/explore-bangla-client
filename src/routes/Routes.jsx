import { createBrowserRouter, Navigate } from "react-router-dom";
import FrontLayoute from "../layoutes/FrontLayoute";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import BackLayoute from "../layoutes/BackLayoute";
import PrivateRoute from "./PrivateRoute";
import AddTourPackage from "../dashboard/AdminPage/AddPackage/AddPackage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FrontLayoute></FrontLayoute>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            }
        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><BackLayoute></BackLayoute></PrivateRoute>,
        children: [
            // tourist routes
            {
                path: "tourist-manage-profile",
                element: <h1>tourist-manage-profile</h1>
            },
            {
                path: "tourist-my-bookings",
                element: <h1>tourist-my-bookings</h1>
            },
            {
                path: "tourist-manage-stories",
                element: <h1>tourist-manage-stories</h1>
            },
            {
                path: "tourist-add-stories",
                element: <h1>tourist-add-stories</h1>
            },
            {
                path: "tourist-join-as-tour-guid",
                element: <h1>tourist-join-as-tour-guid</h1>
            },

            // tour guid routes
            {
                path: "tour-guide-manage-profile",
                element: <h1>tour-guide-manage-profile</h1>
            },
            {
                path: "tour-guide-my-assigned-tours",
                element: <h1>tour-guide-my-assigned-tours</h1>
            },
            {
                path: "tour-guide-add-stories",
                element: <h1>tour-guide-add-stories</h1>
            },
            {
                path: "tour-guide-manage-stories",
                element: <h1>tour-guide-manage-stories</h1>
            },

            // admin routes
            {
                path: "admin-manage-profile",
                element: <h1>admin-manage-profile</h1>
            },
            {
                path: "admin-add-package",
                element: <AddTourPackage></AddTourPackage>
            },
            {
                path: "admin-manage-users",
                element: <h1>admin-manage-users</h1>
            },
            {
                path: "admin-manage-candidates",
                element: <h1>admin-manage-candidates</h1>
            },
        ],
    }
]);