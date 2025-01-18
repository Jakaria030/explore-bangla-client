import useFourRandomStory from "../../hooks/useFourRandomStory";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import SectionTitle from "../components/SectionTitle";
import { FaShareSquare } from "react-icons/fa";
import { MdAddBox, MdCollections } from "react-icons/md";
import { FacebookShareButton } from "react-share";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { errorAlert } from "../../toastify/toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TouristStory = () => {
    const { stories, isStoriesLoading } = useFourRandomStory();
    const { user } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    const handleLoginToShare = () => {
        if (!(user && user?.email)) {
            errorAlert("Please login to share story.");
            navigate("/login");
        }
    }

    const handleAddstory = () => {
        if (user && user?.email) {
            axiosSecure.get(`/users/role?email=${user.email}`)
                .then(res => {
                    if (res.data.role === 'tourist') {
                        navigate('/dashboard/tourist-add-stories');
                    } else if (res.data.role === 'tour-guide') {
                        navigate('/dashboard/tour-guide-add-stories');
                    } else {
                        errorAlert('You are admin. So You have not any add story route.');
                        navigate('/');
                    }

                })
        } else {
            errorAlert("Please login to add story.");
            navigate("/login");
        }
    }

    return (
        <section className="max-w-8xl mx-auto px-5">
            <div className="md:pb-8">
            <SectionTitle title={"Story of Our Tourist"}></SectionTitle>
            </div>
        {
            (!isStoriesLoading && stories.length > 0) ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
            {stories.map(story => <div key={story._id} className="border-2 border-slate-500 flex flex-col">
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

                    <Link to="/community" className="flex items-center justify-center bg-orange text-white py-2">
                        <button className="flex items-center justify-center gap-2 bg-orange text-white"><MdCollections className="text-xl" />All Story</button>
                    </Link>
                    <button onClick={handleAddstory} className="flex items-center justify-center bg-orange text-white py-2"><MdAddBox className="text-xl" />Add Story</button>
                    {
                        (user && user?.email) ? (<FacebookShareButton url={'http://localhost:5173/'} quote={`${story.title}\n${story.story}`}>
                            <div className="flex bg-orange text-white items-center justify-center gap-2 py-2"><FaShareSquare className="text-xl" /><span>Share Story</span></div>
                        </FacebookShareButton>) : (<button onClick={handleLoginToShare} className="flex items-center justify-center gap-2 bg-orange text-white py-2">
                            <div className="flex items-center justify-center gap-2"><FaShareSquare className="text-xl" /><span>Share Story</span></div>
                        </button>)
                    }
                </div>
            </div>)}
        </div> : <div className="py-4 bg-teal/50 text-lg font-bold text-center text-black">No Story Found!</div>
        }
            
        </section>
    );
};

export default TouristStory;