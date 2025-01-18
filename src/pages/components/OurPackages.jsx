import useRandomPackages from "../../hooks/useRandomPackages";
import PackageCard from "./PackageCard";

const OurPackages = () => {
    const { randomPackages, isRandomPackagesLoading } = useRandomPackages();

    return (
        <>
            {
                (!isRandomPackagesLoading && randomPackages.length) > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 py-5">
                    {
                        randomPackages.map(randomPackage => <PackageCard key={randomPackage._id} item={randomPackage}></PackageCard>)
                    }</div> : <div className="py-4 bg-teal/50 text-lg font-bold text-center text-black">No Package Found!</div>
            }
        </>
    );
};

export default OurPackages;
