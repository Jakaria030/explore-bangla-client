import { Navigate, } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

const AdminRoute = ({ children }) => {
    const { user, loading, signOutUser } = useAuth();
    const { isAdmin, isAdminLoading } = useAdmin();

    if (loading || isAdminLoading) {
        return <Spinner></Spinner>;
    }

    if (user && isAdmin) {
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

export default AdminRoute;