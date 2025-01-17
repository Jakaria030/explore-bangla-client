import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import HeaderTitle from "../../components/HeaderTitle";
import { useState } from "react";
import { errorAlert, successAlert } from "../../../toastify/toastify";
import Spinner from "../../../components/Spinner";
import { imageUpload } from "../../../utilities/imageUpload";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const TouristAddStory = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleAddStory = async (data) => {
        // console.log(data);

        try {
            setIsLoading(true);

            // upload images
            let images = [];
            for (let image of data.images) {
                const imgbbRes = await imageUpload({ image });

                if (imgbbRes.data.success) {
                    images.push(imgbbRes.data.data?.display_url);
                }
            }

            const newStory = {
                authEmail: user.email,
                title: data.title,
                story: data.story,
                images
            }
            
            // console.log(newStory);

            // upload in database
            const res = await axiosSecure.post(`/stories/tourist-story?email=${user.email}`, newStory);

            if(res.data.acknowledged){
                successAlert("Your story has been uploaded.");
                navigate("/dashboard/tourist-manage-stories");
                reset();
            }
        } catch (error) {
            errorAlert("Story is not uploaded.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <section>
            {/* Heading title */}
            <HeaderTitle title={"Add story"}></HeaderTitle>

            {/* form */}
            {user && <div className="max-w-5xl mx-auto px-5 my-8 md:my-16">
                <form onSubmit={handleSubmit(handleAddStory)} className="border border-slate-500 space-y-2 p-5">
                    <div className="w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Story Title</span>
                            </div>
                            <input type="text" {...register("title", { required: "Title is required." })} placeholder="e.g, My Journey to Saint Martin's Island" className="input input-bordered w-full" />
                        </label>
                        <p className="text-red-500 mt-2">{errors.title?.message}</p>
                    </div>

                    <div className="w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Story</span>
                            </div>
                            <textarea {...register("story", { required: "Story is required." })} className="textarea textarea-bordered" placeholder="Write your story."></textarea>
                        </label>
                        <p className="text-red-500 mt-2">{errors.story?.message}</p>
                    </div>

                    <div className="w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text capitalize">Upload multiple image that you want to share</span>
                            </div>
                            <input type="file" {...register("images", { required: "At least one image is required." })} multiple className="border border-base-300 py-2 w-full" />
                        </label>
                        <p className="text-red-500 mt-2">{errors.images?.message}</p>
                    </div>

                    <div className="flex flex-row pt-5">
                        <button type="submit" className="px-4 h-12 rounded-md text-white bg-teal/80 w-full">{isLoading ? <Spinner></Spinner> : "Upload"}</button>
                    </div>
                </form>
            </div>}
        </section>
    );
};

export default TouristAddStory;