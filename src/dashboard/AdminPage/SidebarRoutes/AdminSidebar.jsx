import { FaUsersGear } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { RiFunctionAddLine, RiUserCommunityFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <ul>
            <li><Link to="/dashboard/admin-manage-profile"><MdManageAccounts className="text-2xl" />Manage Profile</Link></li>
            <li><Link to="/dashboard/admin-add-package"><RiFunctionAddLine className="text-2xl" />Add Package</Link></li>
            <li><Link to="/dashboard/admin-manage-users"><FaUsersGear className="text-2xl" />Manage Users</Link></li>
            <li><Link to="/dashboard/admin-manage-candidates"><RiUserCommunityFill className="text-2xl" />Manage Candidates</Link></li>
        </ul>
    );
};

export default AdminSidebar;