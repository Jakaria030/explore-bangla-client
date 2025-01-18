import { useParams } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import useGetTourGuideStory from "../../hooks/useGetTourGuideStory";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const TourGuideDetailsPage = () => {
    const { id } = useParams();
    const { singleUser, isSingleUserLoading } = useGetSingleUser(id);
    const { tourGuideStories, isTourGuideStoriesLoading } = useGetTourGuideStory(singleUser?.email);

    return (
        <section className="max-w-8xl mx-auto px-5">
            {/* profile details */}
            {!isSingleUserLoading && <section className="mb-8 md:mb-16">
                <div className="mt-8">
                    <SectionTitle title={"Tour Guide Profile"}></SectionTitle>
                </div>

                <div className="bg-teal/50 p-10 rounded-sm">
                    <div className="flex flex-col justify-center items-center space-y-5">
                        <figure className="w-72 h-72 rounded-full ring-4 ring-teal">
                            <img className="w-full h-full rounded-full" src={singleUser.image} />
                        </figure>
                        <div className="text-center">
                            <h2 className="text-xl font-bold">Name: {singleUser.name}</h2>
                            <p>Email: {singleUser.email}</p>
                            <p className="capitalize">Role: {singleUser.role}</p>
                        </div>
                    </div>
                </div>
            </section>}

            {/* story section */}
            <section className="mb-8 md:mb-16">
                <SectionTitle title={"Tour Guide Story"}></SectionTitle>
                {!isTourGuideStoriesLoading && <div className="space-y-8 md:spy-16">
                    {
                        tourGuideStories.map(story => <div className="border-2 border-slate-500 grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-10">
                            <figure className="col-span-2">
                                <Swiper
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {story.images.map((image, indx) => (
                                        <SwiperSlide key={indx}>
                                            <img className="w-full h-96" src={image} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </figure>
                            <div className="col-span-3 p-2 space-y-2 my-auto">
                                <h2 className="text-xl font-semibold">Title: {story.title}</h2>
                                <p className='text-justify'>{story.story}</p>
                            </div>
                        </div>)}
                </div>}
            </section>
        </section>
    );
};

export default TourGuideDetailsPage;