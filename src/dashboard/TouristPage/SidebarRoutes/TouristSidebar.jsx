import { MdManageAccounts, MdNoteAdd, MdPersonAddAlt1 } from "react-icons/md";
import { GrUnorderedList } from "react-icons/gr";
import { SiStorybook } from "react-icons/si";
import { NavLink } from "react-router-dom";

const TouristSidebar = () => {
    return (
        <ul className="text-white my-2">
            <li><NavLink to="/dashboard/tourist-manage-profile"><MdManageAccounts className="text-2xl" />Manage Profile</NavLink></li>
            <li><NavLink to="/dashboard/tourist-my-bookings"><GrUnorderedList className="text-2xl" />My Bookings</NavLink></li>
            <li><NavLink to="/dashboard/tourist-manage-stories"><SiStorybook className="text-2xl" />Manage Stories</NavLink></li>
            <li><NavLink to="/dashboard/tourist-add-stories"><MdNoteAdd className="text-2xl" />Add Stories</NavLink></li>
            <li><NavLink to="/dashboard/tourist-join-as-tour-guid"><MdPersonAddAlt1 className="text-2xl" />Join As Tour Guid</NavLink></li>
        </ul>
    );
};

export default TouristSidebar;