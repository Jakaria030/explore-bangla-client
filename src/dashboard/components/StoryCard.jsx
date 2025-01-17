import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { errorAlert } from '../../toastify/toastify';
import Spinner from '../../components/Spinner';

const StoryCard = ({ story, userRole, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(false);


    const handleDeleteStory = (id) => {
        // console.log(id);
        try {
            setIsLoading(true);

            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this story?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/stories/tourist-stories/${id}?email=${user.email}`);
                    if (res.data.acknowledged) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your story has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                }
            });

        } catch (error) {
            errorAlert("Story is not deleted!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="border-2 border-slate-500 flex flex-col h-full">
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
                            <img className="w-full h-full" src={image} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </figure>
            <div className="p-2 space-y-2 flex-1 flex flex-col">
                <h2 className="text-xl font-semibold">{story.title}</h2>
                <p>{story.story}</p>
                <div className="flex justify-between items-center mt-auto">
                    <button onClick={() => handleDeleteStory(story._id)} className="px-4 py-2 rounded-sm text-white bg-red-500">{isLoading ? <Spinner></Spinner> : "Delete"}</button>
                    <Link to={`/dashboard/story-edit/${userRole}/${story._id}`}><button className="px-4 py-2 rounded-sm text-white bg-blue-500">Edit</button></Link>
                </div>
            </div>
        </div>

    );
};

export default StoryCard;