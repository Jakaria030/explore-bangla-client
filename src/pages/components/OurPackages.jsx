import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useRandomPackages from "../../hooks/useRandomPackages";

const OurPackages = () => {
    const { randomPackages, isRandomPackagesLoading } = useRandomPackages();
    // const isRandomPackagesLoading = false;
    // const randomPackages = [
    //     {
    //       _id: "6788f475cc38ccdc1233a873",
    //       placeName: "Srimongal, Sylhet",
    //       tourType: "Nature & Tea Garden Tour (Single Package)",
    //       "tripTitle": "Experience the Tranquility of Srimongal’s Tea Gardens",
    //       price: 70,
    //       image: "https://i.ibb.co.com/DR4g93M/images-5.jpg"
    //     },
    //     {
    //       _id: "6788f475cc38ccdc1233a873",
    //       placeName: "Srimongal, Sylhet",
    //       tourType: "Nature & Tea Garden Tour (Single Package)",
    //       "tripTitle": "Experience the Tranquility of Srimongal’s Tea Gardens",
    //       price: 70,
    //       image: "https://i.ibb.co.com/DR4g93M/images-5.jpg"
    //     },
    //     {
    //       _id: "6788f475cc38ccdc1233a873",
    //       placeName: "Srimongal, Sylhet",
    //       tourType: "Nature & Tea Garden Tour (Single Package)",
    //       "tripTitle": "Experience the Tranquility of Srimongal’s Tea Gardens",
    //       price: 70,
    //       image: "https://i.ibb.co.com/DR4g93M/images-5.jpg"
    //     }
    //   ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 py-5">
            {!isRandomPackagesLoading &&
                randomPackages.map((randomPackage) => (
                    <div key={randomPackage._id} className="border border-slate-500 rounded-sm flex flex-col">
                        <figure className="h-[200px] md:h-[300px]">
                            <img className="w-full h-full rounded-t-sm" src={randomPackage.image} />
                        </figure>

                        <div className="p-5 flex flex-col flex-grow justify-between">
                            <div className="space-y-2 text-center">
                                <h2 className="text-xl font-bold text-teal">
                                    {randomPackage.tripTitle}
                                </h2>
                                <p>{randomPackage.tourType}</p>
                                <h2 className="text-3xl">${randomPackage.price}</h2>
                            </div>

                            <div className="text-center mt-4">
                                <Link to={`/package-details/${randomPackage._id}`}>
                                    <button className="px-4 py-2 bg-orange text-white font-medium">View Details</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
        </div>

    );
};

export default OurPackages;