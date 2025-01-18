import useAllPackages from "../../hooks/useAllPackages";
import PackageCard from "../components/PackageCard";
import SectionTitle from "../components/SectionTitle";

const AllTrips = () => {
    const { packages, isAllPackagesLoading } = useAllPackages();

    return (
        <section className="max-w-8xl mx-auto px-5 mb-8 md:mb-16">
            <div className="my-8">
                <SectionTitle title={"Our all packages"}></SectionTitle>
            </div>

            {
                !isAllPackagesLoading && packages.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        packages.map(item => <PackageCard key={item._id} item={item}></PackageCard>)
                    }
                </div> : <div className="py-4 bg-teal/50 text-lg font-bold text-center text-black">No Package Found!</div>
            }
        </section>
    );
};

export default AllTrips;