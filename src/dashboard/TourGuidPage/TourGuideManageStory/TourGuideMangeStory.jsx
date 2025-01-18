import useTourGuideGetStory from "../../../hooks/useTourGuideGetStory";
import HeaderTitle from "../../components/HeaderTitle";
import StoryCard from "../../components/StoryCard";

const TourGuideMangeStory = () => {
    
    const {tourGuideStories, isTourGuideStoriesLoading, refetch} = useTourGuideGetStory();

    return (
        <section>
            <HeaderTitle title={"Tour Guide Manage Story"}></HeaderTitle>

            {
                !isTourGuideStoriesLoading && <section className="max-w-8xl mx-auto px-5 my-8 md:my-16">
                {tourGuideStories.length>0 ?<div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 md:gap-10">
                    {
                        tourGuideStories.map(tourGuideStory => <StoryCard 
                            key={tourGuideStory._id}
                            story={tourGuideStory}
                            userRole={'tour-guide'}
                            refetch={refetch}
                        ></StoryCard>)
                    }
                </div>:<div className="bg-teal/80 max-w-8xl mx-auto px-5 py-5 text-white text-center text-3xl">
                        No Story Found!
                    </div>}
            </section>
            }
        </section>
    );
};

export default TourGuideMangeStory;