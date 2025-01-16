import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTourGuide from "../hooks/useTourGuide";
import Spinner from "../components/Spinner";

const TourGuideRoute = ({ children }) => {
    const {user, loading, signOutUser} = useAuth();
    const {isTourGuide, isTourGuideLoading} = useTourGuide();
  

    if(loading || isTourGuideLoading){
        return <Spinner></Spinner>;
    }

    if(user && isTourGuide){
        return children;
    }

    if (user) {
        const handleLogout = async () => {
            await signOutUser();
        };
        handleLogout();
    }

    return <Navigate to="/login"></Navigate>
};

export default TourGuideRoute;