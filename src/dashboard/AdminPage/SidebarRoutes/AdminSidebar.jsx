import { FaUsersGear } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { RiFunctionAddLine, RiUserCommunityFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <ul className="text-white my-2">
            <li><NavLink to="/dashboard/admin-manage-profile"><MdManageAccounts className="text-2xl" />Manage Profile</NavLink></li>
            <li><NavLink to="/dashboard/admin-add-package"><RiFunctionAddLine className="text-2xl" />Add Package</NavLink></li>
            <li><NavLink to="/dashboard/admin-manage-users"><FaUsersGear className="text-2xl" />Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/admin-manage-candidates"><RiUserCommunityFill className="text-2xl" />Manage Candidates</NavLink></li>
        </ul>
    );
};

export default AdminSidebar;