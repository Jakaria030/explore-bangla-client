import { useParams } from "react-router-dom";
import useSinglePackage from "../../hooks/useSinglePackage";
import SectionTitle from "./SectionTitle";

const PackageDetails = () => {
    const { id } = useParams();
    const { singlePackage, isSinglePackageLoading } = useSinglePackage(id);

    const images = singlePackage.images;

    return (
        <>
            {
                !isSinglePackageLoading && <section className="mb-8 md:mb-16">
                    {/* gallary section */}
                    <section className="max-w-8xl mx-auto px-5">
                        <div className=" my-8">
                            <SectionTitle title={"Photo Gallery"}></SectionTitle>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-5 border-2 border-slate-500 rounded-md p-2">
                            {images.map((image, indx) => (
                                <div key={indx} className={`relative rounded-md ${indx % 2 === 0 ? "row-span-2" : "" }`}>
                                    <figure className="h-full">
                                        <img className="w-full h-full object-cover rounded-md" src={image}/>
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* about the tour */}
                    
                </section>
            }
        </>
    );
};

export default PackageDetails;