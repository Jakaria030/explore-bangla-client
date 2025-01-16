import useAllPackages from "../../hooks/useAllPackages";
import PackageCard from "../components/PackageCard";
import SectionTitle from "../components/SectionTitle";

const AllTrips = () => {
    const { packages, isAllPackagesLoading } = useAllPackages();

    return (
        <section className="max-w-8xl mx-auto px-5 my-8 md:my-16">
            <SectionTitle title={"Our all packages"}></SectionTitle>
        
            {
                !isAllPackagesLoading &&
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        packages.map(item => <PackageCard key={item._id} item={item}></PackageCard>)
                    }
                </div>
            }
        </section>
    );
};

export default AllTrips;