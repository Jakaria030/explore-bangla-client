import { createBrowserRouter } from "react-router-dom";
import FrontLayoute from "../layoutes/FrontLayoute";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <FrontLayoute></FrontLayoute>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            }
        ],
    },
]);


