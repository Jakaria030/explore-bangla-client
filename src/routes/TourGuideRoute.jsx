import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTourGuide from "../hooks/useTourGuide";
import Spinner from "../components/Spinner";

const TourGuideRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const {isTourGuide, isTourGuideLoading} = useTourGuide();
    const location = useLocation();

    if(loading || isTourGuideLoading){
        return <Spinner></Spinner>;
    }

    if(user && isTourGuide){
        return children;
    }
    return <Navigate to="/login" state={location.pathname}></Navigate>
};

export default TourGuideRoute;