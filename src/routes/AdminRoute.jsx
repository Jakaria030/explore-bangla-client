import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import useAuth from '../hooks/useAuth';
import Spinner from '../components/Spinner';

const AdminRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const {isAdmin, isAdminLoading} = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <Spinner></Spinner>;
    }

    if(user && isAdmin){
        return children;
    }

    return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default AdminRoute;