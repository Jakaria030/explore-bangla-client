import { useLocation, useParams } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";
import useUpdateStory from "../../hooks/useUpdateStory";
import SectionTitle from "../../pages/components/SectionTitle";
import { errorAlert } from "../../toastify/toastify";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const StoryUpdates = () => {
    const { id } = useParams();
    const {user} = useAuth();

    const location = useLocation();
    const userRole = location.pathname.split('/')[3];
    const [isLoading, setIsLoading] = useState(false);


    const { story, isStoryLoading, refetch } = useUpdateStory(id, userRole);
    const axiosSecure = useAxiosSecure();


    const handlePhotoDelete = (storyID, imageURL) => {
        // console.log(storyID, imageURL);

        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this image?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/stories/${userRole}?email=${user.email}`, {storyID, imageURL});
                    if (res.data.acknowledged) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Image has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                }
            });
        } catch (error) {
            errorAlert("Image is not deleted!");
        }
    };

    return (
        <section>
            <HeaderTitle title={"Update Story"}></HeaderTitle>

            {
                !isStoryLoading && <section className="max-w-8xl mx-auto px-5 my-8 md:my-16">
                    {/* image gallery */}
                    <SectionTitle title={"Your Photo Gallery"}></SectionTitle>
                    <div className="border border-slate-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                        {
                            story.images.map((img, indx) => <div key={indx} className="relative">
                                <img className="w-full h-52 object-center" src={img} />
                                <button onClick={() => handlePhotoDelete(story._id, img)} className="size-8 m-2 rounded-full text-white  bg-red-500 hover:bg-red-700 transition-colors duration-150 absolute top-0 right-0">x</button>
                            </div>)
                        }
                    </div>
                </section>
            }
        </section>
    );
};

export default StoryUpdates;