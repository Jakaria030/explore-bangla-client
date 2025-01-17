import { Link } from "react-router-dom";

const MeetTourGuideCard = ({user}) => {
    return (
        <div className="border border-slate-500 rounded-sm flex flex-col">
            <figure className="h-[200px] md:h-[300px]">
                <img className="w-full h-full rounded-t-sm" src={user.image} />
            </figure>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-teal">
                        {user.name}
                    </h2>
                    <p>{user.email}</p>
                </div>

                <div className="text-center mt-4">
                    
                    <Link to={`/tour-guide-details/${user._id}`}>
                        <button className="px-4 py-2 bg-orange text-white font-medium">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MeetTourGuideCard;