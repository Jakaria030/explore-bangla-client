import useRandomPackages from "../../hooks/useRandomPackages";
import PackageCard from "./PackageCard";

const OurPackages = () => {
    const { randomPackages, isRandomPackagesLoading } = useRandomPackages();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 py-5">
            {!isRandomPackagesLoading &&
                randomPackages.map((randomPackage) => (
                    <PackageCard key={randomPackage._id} item={randomPackage}></PackageCard>
                ))}
        </div>

    );
};

export default OurPackages;