import { GrUnorderedList } from "react-icons/gr";
import { MdManageAccounts, MdNoteAdd } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <ul>
            <li><Link to="/dashboard/admin-profile"><MdManageAccounts className="text-2xl" />Manage Profile</Link></li>
            <li><Link to="/"><GrUnorderedList className="text-2xl" />My Assigned Tours</Link></li>
            <li><Link to="/"><MdNoteAdd className="text-2xl" />Add Stories</Link></li>
            <li><Link to="/"><SiStorybook className="text-2xl" />Manage Stories</Link></li>
        </ul>
    );
};

export default AdminSidebar;