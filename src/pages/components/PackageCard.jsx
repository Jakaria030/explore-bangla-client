import { AiOutlineDollar } from "react-icons/ai";
import { IoTimerOutline } from "react-icons/io5";
import { PiUsersThreeThin } from "react-icons/pi";
import { Link } from "react-router-dom";

const PackageCard = ({ item }) => {

    return (
        <div className="border border-slate-500 rounded-sm flex flex-col">
            <figure className="h-[200px] md:h-[300px]">
                <img className="w-full h-full rounded-t-sm" src={item.image} />
            </figure>

            <div className="p-5 flex flex-col flex-grow justify-between">
                <div className="space-y-2 text-center">
                    <h2 className="text-xl font-bold text-teal">
                        {item.tripTitle}
                    </h2>
                    <p>{item.tourType}</p>
                </div>

                <div className="text-center mt-4">
                    <div className="flex justify-between gap-1 sm:gap-5 mb-4">
                        <p className="flex gap-1 sm:gap-2 items-center"><IoTimerOutline className="text-xl text-orange shrink-0" />{item.duration}</p>
                        <p className="flex gap-1 sm:gap-2 items-center"><PiUsersThreeThin className="text-xl text-orange shrink-0"/>{item.members} person</p>
                        <p className="flex gap-1 sm:gap-2 items-center"><AiOutlineDollar className="text-xl text-orange shrink-0"/>{item.price} Dollar</p>
                    </div>

                    <Link to={`/package-details/${item._id}`}>
                        <button className="px-4 py-2 bg-orange text-white font-medium">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;