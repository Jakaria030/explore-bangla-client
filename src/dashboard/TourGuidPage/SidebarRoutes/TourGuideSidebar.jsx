import { GrUnorderedList } from "react-icons/gr";
import { MdManageAccounts, MdNoteAdd } from "react-icons/md";
import { SiStorybook } from "react-icons/si";
import { NavLink } from "react-router-dom";

const TourGuideSidebar = () => {
    return (
        <ul className="text-white">
            <li><NavLink to="/dashboard/tour-guide-manage-profile"><MdManageAccounts className="text-2xl" />Manage Profile</NavLink></li>
            <li><NavLink to="/dashboard/tour-guide-my-assigned-tours"><GrUnorderedList className="text-2xl" />My Assigned Tours</NavLink></li>
            <li><NavLink to="/dashboard/tour-guide-add-stories"><MdNoteAdd className="text-2xl" />Add Stories</NavLink></li>
            <li><NavLink to="/dashboard/tour-guide-manage-stories"><SiStorybook className="text-2xl" />Manage Stories</NavLink></li>
        </ul>
    );
};

export default TourGuideSidebar;