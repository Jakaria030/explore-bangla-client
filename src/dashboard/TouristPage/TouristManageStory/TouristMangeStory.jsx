import useAuth from "../../../hooks/useAuth";
import useTouristGetStory from "../../../hooks/useTouristGetStory";
import HeaderTitle from "../../components/HeaderTitle";
import StoryCard from "../../components/StoryCard";

const TouristMangeStory = () => {

    const { touristStories, isTouristStoriesLoading, refetch } = useTouristGetStory();

    return (
        <section>
            <HeaderTitle title={"Tourist Manage Story"}></HeaderTitle>

            {
                !isTouristStoriesLoading && <section className="max-w-8xl mx-auto px-5 my-8 md:my-16">
                    { touristStories.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 md:gap-10">
                        {
                            touristStories.map(touristStory => <StoryCard
                                key={touristStory._id}
                                story={touristStory}
                                userRole={'tourist'}
                                refetch={refetch}
                            ></StoryCard>)
                        }
                    </div> : <div className="bg-teal/80 max-w-8xl mx-auto px-5 py-5 text-white text-center text-3xl">
                        No Story Found!
                    </div>}
                </section>
            }
        </section>
    );
};

export default TouristMangeStory;