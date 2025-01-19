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
import TouristMangeStory from "../dashboard/TouristPage/TouristManageStory/TouristMangeStory";
import StoryUpdates from "../dashboard/components/StoryUpdates";
import TourGuideManageProfile from "../dashboard/TourGuidPage/TourGuideManageProfile/TourGuideManageProfile";
import TourGuideAddStory from "../dashboard/TourGuidPage/TourGuideAddStory/TourGuideAddStory";
import TourGuideMangeStory from "../dashboard/TourGuidPage/TourGuideManageStory/TourGuideMangeStory";
import TourGuideDetailsPage from "../pages/components/TourGuideDetailsPage";
import Community from "../pages/Community/Community";
import About from "../pages/About/About";
import ErrorPage from "../components/ErrorPage";
import TouristMyBookings from "../dashboard/TouristPage/TouristMyBookings/TouristMyBookings";
import TourGuideMyAssignTour from "../dashboard/TourGuidPage/TourGuideMyAssignTour/TourGuideMyAssignTour";

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
                path: "/tour-guide-details/:id",
                element: <TourGuideDetailsPage></TourGuideDetailsPage>
            },
            {
                path: "/community",
                element: <Community></Community>
            },
            {
                path: "/trips",
                element: <AllTrips></AllTrips>
            },
            {
                path: "/about",
                element: <About></About>
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
                element: <TouristRoute><TouristMyBookings></TouristMyBookings></TouristRoute>
            },
            {
                path: "tourist-manage-stories",
                element: <TouristRoute><TouristMangeStory></TouristMangeStory></TouristRoute>
            },
            {
                path: "story-edit/tourist/:id",
                element: <TouristRoute><StoryUpdates></StoryUpdates></TouristRoute>
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
                element: <TourGuideRoute><TourGuideManageProfile></TourGuideManageProfile></TourGuideRoute>
            },
            {
                path: "tour-guide-my-assigned-tours",
                element: <TourGuideRoute><TourGuideMyAssignTour></TourGuideMyAssignTour></TourGuideRoute>
            },
            {
                path: "tour-guide-add-stories",
                element: <TourGuideRoute><TourGuideAddStory></TourGuideAddStory></TourGuideRoute>
            },
            {
                path: "tour-guide-manage-stories",
                element: <TourGuideRoute><TourGuideMangeStory></TourGuideMangeStory></TourGuideRoute>
            },
            {
                path: "story-edit/tour-guide/:id",
                element: <TourGuideRoute><StoryUpdates></StoryUpdates></TourGuideRoute>
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
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
]);