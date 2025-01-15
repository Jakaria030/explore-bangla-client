import { GrUnorderedList } from "react-icons/gr";
import { MdManageAccounts, MdNoteAdd } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import { Link } from "react-router-dom";

const TourGuideSidebar = () => {
    return (
        <ul className="text-white">
            <li><Link to="/dashboard/tour-guide-manage-profile"><MdManageAccounts className="text-2xl" />Manage Profile</Link></li>
            <li><Link to="/dashboard/tour-guide-my-assigned-tours"><GrUnorderedList className="text-2xl" />My Assigned Tours</Link></li>
            <li><Link to="/dashboard/tour-guide-add-stories"><MdNoteAdd className="text-2xl" />Add Stories</Link></li>
            <li><Link to="/dashboard/tour-guide-manage-stories"><SiStorybook className="text-2xl" />Manage Stories</Link></li>
        </ul>
    );
};

export default TourGuideSidebar;