import { useState } from "react";
import useAllPackages from "../../hooks/useAllPackages";
import PackageCard from "../components/PackageCard";
import SectionTitle from "../components/SectionTitle";

const AllTrips = () => {
    const { packages, isAllPackagesLoading } = useAllPackages();
    const [sortOrder, setSortOrder] = useState("");

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedPackages = [...packages].sort((a, b) => {
        if (sortOrder === "ascending") {
            return a.price - b.price;
        } else if (sortOrder === "descending") {
            return b.price - a.price;
        }

        return 0;
    });

    return (
        <section className="max-w-8xl mx-auto px-5 mb-8 md:mb-16">
            <div className="my-8">
                <SectionTitle title={"Our all packages"}></SectionTitle>
            </div>

            <div className="flex items-center justify-end py-4">
                <select onChange={handleSortChange} defaultValue="Sort By Price" className="select select-bordered w-full max-w-xs">
                    <option disabled>Sort By Price</option>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>

            {
                !isAllPackagesLoading && sortedPackages.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            sortedPackages.map(item => <PackageCard key={item._id} item={item}></PackageCard>)
                        }
                    </div> : <div className="py-4 bg-teal/50 text-lg font-bold text-center text-black">No Package Found!</div>
            }
        </section>
    );
};

export default AllTrips;