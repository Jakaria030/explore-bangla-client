import useGetAllStory from "../../hooks/useGetAllStory";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import useAuth from "../../hooks/useAuth";
import { FacebookShareButton } from "react-share";
import { FaShareSquare } from "react-icons/fa";
import SectionTitle from "../components/SectionTitle";
import { useNavigate } from "react-router-dom";
import { errorAlert } from "../../toastify/toastify";

const Community = () => {
    const { stories, isStoriesLoading } = useGetAllStory();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleLoginToShare = () => {
        if (!(user && user?.email)) {
            errorAlert("Please login to share story.");
            navigate("/login", { state: "/community" });
        }
    }

    return (
        <section className="max-w-8xl mx-auto px-5 mb-8 md:mb-16">
            <div className="my-8">
                <SectionTitle title={"All Story"}></SectionTitle>
            </div>
            {!isStoriesLoading && stories.length > 0 ?
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
                    {
                        stories.map(story => <div key={story._id} className="border-2 border-slate-500 flex flex-col">
                            <figure>
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
                                            <img className="w-full h-60" src={image} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </figure>
                            <div className="p-2 space-y-2 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold text-teal">{story.title}</h2>
                                <p className='flex-grow text-justify line-clamp-4'>{story.story}</p>
                                {
                                    (user && user?.email) ? (<FacebookShareButton url={'https://explore-bangla-9f392.web.app/'} quote={`${story.title}\n${story.story}`}>
                                        <div className="flex bg-orange text-white items-center justify-center gap-2 py-2"><FaShareSquare className="text-xl" /><span>Share Story</span></div>
                                    </FacebookShareButton>) : (<button onClick={handleLoginToShare} className="flex items-center justify-center gap-2 bg-orange text-white py-2">
                                        <div className="flex items-center justify-center gap-2"><FaShareSquare className="text-xl" /><span>Share Story</span></div>
                                    </button>)
                                }
                            </div>
                        </div>)
                    }
                </div>
                : <div className="py-4 text-lg font-bold text-black bg-teal/50 text-center">No Story Found!</div>}
        </section>
    );
};

export default Community;