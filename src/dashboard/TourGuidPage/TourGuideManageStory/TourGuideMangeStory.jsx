import useTourGuideGetStory from "../../../hooks/useTourGuideGetStory";
import useTouristGetStory from "../../../hooks/useTouristGetStory";
import HeaderTitle from "../../components/HeaderTitle";
import StoryCard from "../../components/StoryCard";

const TourGuideMangeStory = () => {
    
    const {tourGuideStories, isTourGuideStoriesLoading, refetch} = useTourGuideGetStory();

    return (
        <section>
            <HeaderTitle title={"Tour Guide Manage Story"}></HeaderTitle>

            {
                !isTourGuideStoriesLoading && <section className="max-w-8xl mx-auto px-5 my-8 md:my-16">
                <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 md:gap-10">
                    {
                        tourGuideStories.map(tourGuideStory => <StoryCard 
                            key={tourGuideStory._id}
                            story={tourGuideStory}
                            userRole={'tour-guide'}
                            refetch={refetch}
                        ></StoryCard>)
                    }
                </div>
            </section>
            }
        </section>
    );
};

export default TourGuideMangeStory;