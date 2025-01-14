import { MdManageAccounts, MdNoteAdd, MdPersonAddAlt1 } from "react-icons/md";
import { GrUnorderedList } from "react-icons/gr";
import { SiStorybook } from "react-icons/si";
import { Link } from "react-router-dom";

const TouristSidebar = () => {
    return (
        <ul>
            <li><Link to="/dashboard/tourist-profile"><MdManageAccounts className="text-2xl" />Manage Profile</Link></li>
            <li><Link to="/"><GrUnorderedList className="text-2xl" />My Bookings</Link></li>
            <li><Link to="/"><SiStorybook className="text-2xl" />Manage Stories</Link></li>
            <li><Link to="/"><MdNoteAdd className="text-2xl" />Add Stories</Link></li>
            <li><Link to="/"><MdPersonAddAlt1 className="text-2xl" />Join As Tour Guid</Link></li>
        </ul>
    );
};

export default TouristSidebar;