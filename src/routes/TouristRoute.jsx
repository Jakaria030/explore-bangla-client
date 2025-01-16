import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTourist from "../hooks/useTourist";
import Spinner from "../components/Spinner";

const TouristRoute = ({ children }) => {
    const { user, loading, signOutUser } = useAuth();
    const { isTourist, isTouristLoading } = useTourist();

    if (loading || isTouristLoading) {
        return <Spinner></Spinner>;
    }

    if (user && isTourist) {
        return children;
    }

    if (user) {
        const handleLogout = async () => {
            await signOutUser();
        };
        handleLogout();
    }

    return <Navigate to="/login"></Navigate>;
};

export default TouristRoute;