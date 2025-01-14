import { createBrowserRouter } from "react-router-dom";
import FrontLayoute from "../layoutes/FrontLayoute";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";

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
                path: "/register",
                element: <Register></Register>,
            }
        ],
    },
]);


