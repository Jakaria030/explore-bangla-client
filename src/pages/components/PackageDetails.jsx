import { useParams } from "react-router-dom";
import useSinglePackage from "../../hooks/useSinglePackage";
import SectionTitle from "./SectionTitle";

const PackageDetails = () => {
    const { id } = useParams();
    const { singlePackage, isSinglePackageLoading } = useSinglePackage(id);

    const images = singlePackage.images;
    const inclusions = singlePackage.inclusions;
    const tourPlan = singlePackage.tourPlan;

    return (
        <>
            {
                !isSinglePackageLoading && <section className="space-y-8 md:space-y-16">
                    {/* gallary section */}
                    <section className="max-w-8xl mx-auto px-5">
                        <div className="my-8">
                            <SectionTitle title={"Photo Gallery"}></SectionTitle>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-5 border-2 border-slate-500 rounded-md p-2">
                            {images.map((image, indx) => (
                                <div key={indx} className={`relative rounded-md ${indx % 2 === 0 ? "row-span-2" : ""}`}>
                                    <figure className="h-full">
                                        <img className="w-full h-full object-cover rounded-md" src={image} />
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* about the tour */}
                    <section className="bg-teal/30 py-8">

                        <section className="max-w-8xl mx-auto px-5">
                            <div className="my-8">
                                <SectionTitle title={"About the tour"}></SectionTitle>
                            </div>

                            <div className="flex justify-between">
                                <div className="overflow-x-auto ">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Place Name</th>
                                                <td>: {singlePackage.placeName}</td>
                                            </tr>
                                            <tr>
                                                <th>Trip Title</th>
                                                <td>: {singlePackage.tripTitle}</td>
                                            </tr>
                                            <tr>
                                                <th>Tour Type</th>
                                                <td>: {singlePackage.tourType}</td>
                                            </tr>
                                            <tr>
                                                <th>Members:</th>
                                                <td>: {singlePackage.members} person</td>
                                            </tr>
                                            <tr>
                                                <th>Package Price</th>
                                                <td>: ${singlePackage.price}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                {/* inclusions */}
                                <div>
                                    <h2 className="text-xl font-semibold">Inclusions</h2>
                                    {
                                        inclusions.map((inclusion, indx) => <ul key={indx} className="list-disc ml-5 space-y-1">
                                            <li>{inclusion}</li>
                                        </ul>)
                                    }
                                </div>
                            </div>
                        </section>
                    </section>

                    

                </section>
            }
        </>
    );
};

export default PackageDetails;