import { MdManageAccounts, MdNoteAdd, MdPersonAddAlt1 } from "react-icons/md";
import { GrUnorderedList } from "react-icons/gr";
import { SiStorybook } from "react-icons/si";
import { Link } from "react-router-dom";

const TouristSidebar = () => {
    return (
        <ul className="text-white">
            <li><Link to="/dashboard/tourist-manage-profile"><MdManageAccounts className="text-2xl" />Manage Profile</Link></li>
            <li><Link to="/dashboard/tourist-my-bookings"><GrUnorderedList className="text-2xl" />My Bookings</Link></li>
            <li><Link to="/dashboard/tourist-manage-stories"><SiStorybook className="text-2xl" />Manage Stories</Link></li>
            <li><Link to="/dashboard/tourist-add-stories"><MdNoteAdd className="text-2xl" />Add Stories</Link></li>
            <li><Link to="/dashboard/tourist-join-as-tour-guid"><MdPersonAddAlt1 className="text-2xl" />Join As Tour Guid</Link></li>
        </ul>
    );
};

export default TouristSidebar;