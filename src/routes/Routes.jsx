import { createBrowserRouter, Navigate } from "react-router-dom";
import FrontLayoute from "../layoutes/FrontLayoute";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import BackLayoute from "../layoutes/BackLayoute";
import PrivateRoute from "./PrivateRoute";
import AddTourPackage from "../dashboard/AdminPage/AddPackage/AddPackage";
import ManageUsers from "../dashboard/AdminPage/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import TourGuideRoute from "./TourGuideRoute";
import TouristRoute from "./TouristRoute";
import RoleBaseRedirect from "../dashboard/components/RoleBaseRedirect";
import PackageDetails from "../pages/components/PackageDetails";
import AllTrips from "../pages/AllTrips/AllTrips";
import TouristManageProfile from "../dashboard/TouristPage/TouristManageProfile/TouristManageProfile";
import JoinAsTourGuide from "../dashboard/TouristPage/JoinAsTourGuide/JoinAsTourGuide";
import ManageCandidates from "../dashboard/AdminPage/ManageCandidates/ManageCandidates";
import TouristAddStory from "../dashboard/TouristPage/TouristAddStory/TouristAddStory";

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
                path: "/package-details/:id",
                element: <PackageDetails></PackageDetails>
            },
            {
                path: "/community",
                element: <h1>Community Page</h1>
            },
            {
                path: "/trips",
                element: <AllTrips></AllTrips>
            },
            {
                path: "/about",
                element: <h1>about Page</h1>
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
            {
                index: true,
                element: <RoleBaseRedirect></RoleBaseRedirect>
            },
            // tourist routes
            {
                path: "tourist-manage-profile",
                element: <TouristRoute><TouristManageProfile></TouristManageProfile></TouristRoute>
            },
            {
                path: "tourist-my-bookings",
                element: <TouristRoute><h1>tourist-my-bookings</h1></TouristRoute>
            },
            {
                path: "tourist-manage-stories",
                element: <TouristRoute><h1>tourist-manage-stories</h1></TouristRoute>
            },
            {
                path: "tourist-add-stories",
                element: <TouristRoute><TouristAddStory></TouristAddStory></TouristRoute>
            },
            {
                path: "tourist-join-as-tour-guid",
                element: <TouristRoute><JoinAsTourGuide></JoinAsTourGuide></TouristRoute>
            },

            // tour guid routes
            {
                path: "tour-guide-manage-profile",
                element: <TourGuideRoute><h1>tour-guide-manage-profile</h1></TourGuideRoute>
            },
            {
                path: "tour-guide-my-assigned-tours",
                element: <TourGuideRoute><h1>tour-guide-my-assigned-tours</h1></TourGuideRoute>
            },
            {
                path: "tour-guide-add-stories",
                element: <TourGuideRoute><h1>tour-guide-add-stories</h1></TourGuideRoute>
            },
            {
                path: "tour-guide-manage-stories",
                element: <TourGuideRoute><h1>tour-guide-manage-stories</h1></TourGuideRoute>
            },

            // admin routes
            {
                path: "admin-manage-profile",
                element: <AdminRoute><h1>admin-manage-profile</h1></AdminRoute>
            },
            {
                path: "admin-add-package",
                element: <AdminRoute><AddTourPackage></AddTourPackage></AdminRoute>
            },
            {
                path: "admin-manage-users",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "admin-manage-candidates",
                element: <AdminRoute><ManageCandidates></ManageCandidates></AdminRoute>
            },
        ],
    }
]);