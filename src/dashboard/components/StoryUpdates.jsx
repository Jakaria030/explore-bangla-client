import { useLocation, useParams } from "react-router-dom";
import HeaderTitle from "./HeaderTitle";
import useUpdateStory from "../../hooks/useUpdateStory";
import SectionTitle from "../../pages/components/SectionTitle";
import { errorAlert, successAlert } from "../../toastify/toastify";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Spinner from "../../components/Spinner";
import { imageUpload } from "../../utilities/imageUpload";

const StoryUpdates = () => {
    const { id } = useParams();
    const { user } = useAuth();

    const location = useLocation();
    const userRole = location.pathname.split('/')[3];
    const [isPhotoLoading, setIsPhotoLoading] = useState(false);
    const [isUploadStoryLoading, setIsUploadStoryLoading] = useState(false);


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
                    const res = await axiosSecure.patch(`/stories/${userRole}/delete-image?email=${user.email}`, { storyID, imageURL });
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

    const { register: registerPhoto, handleSubmit: handlePhotoSubmit, reset:resetPhoto, formState: { errors: photoErr } } = useForm();
    const handlePhotoUpload = async (data) => {
        // console.log(data);

        try {
            setIsPhotoLoading(true);
            const imageFile = { image: data.image[0] };
            const imgbbRes = await imageUpload(imageFile);

            const image = imgbbRes.data.data?.display_url;

            const res = await axiosSecure.patch(`/stories/${userRole}/upload-image?email=${user.email}`, { id, image });
            if (res.data.acknowledged) {
                successAlert("Image uploaded.");
                resetPhoto();
                refetch();
            }

        } catch (error) {
            errorAlert("Image is not upload.");
        } finally {
            setIsPhotoLoading(false);
        }
    };

    const { register: registerStory, handleSubmit: handleStorySubmit, formState: { errors: storyErr } } = useForm();
    const handleUpdateStory = async (data, storyID) => {
        // console.log(data);

        try {
            setIsUploadStoryLoading(true);
            const res = await axiosSecure.patch(`/stories/${userRole}/update-story/${id}?email=${user.email}`, data);
            if (res.data.acknowledged) {
                Swal.fire({
                    icon: "success",
                    title: "Your story has been updated.",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }

        } catch (error) {
            errorAlert("Story is not updated!");
        } finally {
            setIsUploadStoryLoading(false);
        }
    };


    return (
        <section>
            <HeaderTitle title={"Update Story"}></HeaderTitle>

            {
                !isStoryLoading && <section className="max-w-8xl mx-auto px-5 my-8 md:my-16">
                    {/* image gallery */}
                    <SectionTitle title={"Your Uploaded Photo For This Story"}></SectionTitle>
                    <div className="border border-slate-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
                        {
                            story.images.map((img, indx) => <div key={indx} className="relative">
                                <img className="w-full h-52 object-center" src={img} />
                                <button onClick={() => handlePhotoDelete(story._id, img)} className="size-8 m-2 rounded-full text-white  bg-red-500 hover:bg-red-700 transition-colors duration-150 absolute top-0 right-0">x</button>
                            </div>)
                        }
                    </div>


                    {/* Single photo upload */}
                    <div className="mt-8 md:mt-16">
                        <SectionTitle title={"Upload a photo for this story"}></SectionTitle>
                    </div>

                    <form onSubmit={handlePhotoSubmit(handlePhotoUpload)} >
                        <div className="flex items-center justify-between gap-5">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <input type="file" {...registerPhoto("image", { required: "Image is required." })} className="border border-base-300 py-2 w-full" />
                                </label>
                            </div>
                            <div>
                                <button type="submit" className="px-4 h-12 rounded-md text-white bg-teal/80 w-full">{isPhotoLoading ? <Spinner></Spinner> : "Update"}</button>
                            </div>
                        </div>
                        <p className="text-red-500 mt-2">{photoErr.image?.message}</p>
                    </form>

                    {/* form section  */}
                    <div className="mt-8 md:mt-16">
                        <SectionTitle title={"Story Updated Form"}></SectionTitle>
                    </div>

                    <div className="max-w-8xl mx-auto mb-8 md:mb-16">
                        <form onSubmit={handleStorySubmit(handleUpdateStory)} className="border border-slate-500 space-y-2 p-5">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Story Title</span>
                                    </div>
                                    <input type="text" defaultValue={story?.title} {...registerStory("title", { required: "Title is required." })} placeholder="e.g, My Journey to Saint Martin's Island" className="input input-bordered w-full" />
                                </label>
                                <p className="text-red-500 mt-2">{storyErr.title?.message}</p>
                            </div>

                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Story</span>
                                    </div>
                                    <textarea defaultValue={story?.story} {...registerStory("story", { required: "Story is required." })} className="textarea textarea-bordered" placeholder="Write your story."></textarea>
                                </label>
                                <p className="text-red-500 mt-2">{storyErr.story?.message}</p>
                            </div>

                            <div className="flex flex-row pt-5">
                                <button type="submit" className="px-4 h-12 rounded-md text-white bg-teal/80 w-full">{isUploadStoryLoading ? <Spinner></Spinner> : "Update"}</button>
                            </div>
                        </form>
                    </div>
                </section>
            }
        </section>
    );
};

export default StoryUpdates;