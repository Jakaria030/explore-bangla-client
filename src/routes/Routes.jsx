import { createBrowserRouter, Navigate } from "react-router-dom";
import FrontLayoute from "../layoutes/FrontLayoute";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import BackLayoute from "../layoutes/BackLayoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FrontLayoute></FrontLayoute>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            }
        ],
    },
    {
        path: "/dashboard",
        element: <BackLayoute></BackLayoute>,
        children: [
            // tourist routes
            {
                path: "tourist-profile",
                element: <h1>Hello tourist</h1>,
            },

            // tour guid routes
            {
                path: "tour-guid-profile",
                element: <h1>Hello guid</h1>,
            },

            // admin routes
            {
                path: "admin-profile",
                element: <h1>Hello admin</h1>,
            },
        ],
    }
]);


