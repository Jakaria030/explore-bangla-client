import { Navigate } from "react-router-dom";
import userUserRole from "../../hooks/userUserRole";

const RoleBaseRedirect = () => {
    const {userRole, isUserRoleLoading} = userUserRole();

    if(isUserRoleLoading) return;

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