import { createBrowserRouter } from "react-router-dom";
import FrontLayoute from "../layoutes/FrontLayoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <FrontLayoute></FrontLayoute>,
    },
]);


