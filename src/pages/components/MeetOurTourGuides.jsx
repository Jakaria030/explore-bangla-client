import useMeetTourGuides from "../../hooks/useMeetTourGuides";
import MeetTourGuideCard from "./MeetTourGuideCard";

const MeetOurTourGuides = () => {
    const { tourGuides, isTourGuideLoading } = useMeetTourGuides();

    return (
        <>
            {(!isTourGuideLoading && tourGuides.length > 0) ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 py-5">
                {
                    tourGuides.map(tourGuide => <MeetTourGuideCard
                        key={tourGuide._id}
                        user={tourGuide}
                    ></MeetTourGuideCard>)
                }
            </div> : <div className="py-4 bg-teal/50 text-lg font-bold text-center text-black">No Tour Guide Found!</div>
            }
        </>

    );
};

export default MeetOurTourGuides;