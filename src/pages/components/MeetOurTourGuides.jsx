import useMeetTourGuides from "../../hooks/useMeetTourGuides";
import MeetTourGuideCard from "./MeetTourGuideCard";

const MeetOurTourGuides = () => {
    const {tourGuides, isTourGuideLoading} = useMeetTourGuides();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 py-5">
            {
                !isTourGuideLoading && tourGuides.map(tourGuide => <MeetTourGuideCard
                    key={tourGuide._id}
                    user={tourGuide}
                ></MeetTourGuideCard>)
            }        
        </div>
    );
};

export default MeetOurTourGuides;