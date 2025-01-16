import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Navigate } from "react-router-dom";

const RoleBaseRedirect = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: userRole, isLoading} = useQuery({
        queryKey: ["role", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user?.email}`);
            return res.data?.role;
        }
    });

    if(isLoading) return;

    if (userRole === "tourist") {
        return <Navigate to="/dashboard/tourist-manage-profile" />;
    }
    if (userRole === "tour-guide") {
        return <Navigate to="/dashboard/tour-guide-manage-profile" />;
    }
    if (userRole === "admin") {
        return <Navigate to="/dashboard/admin-manage-profile" />;
    }

    return <Navigate to="/" />;
};

export default RoleBaseRedirect;