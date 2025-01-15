import { useFieldArray, useForm } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utilities/imageUpload";
import { useState } from "react";
import { errorAlert, successAlert } from "../../../toastify/toastify";
import Spinner from "../../../components/Spinner";


const AddPackage = () => {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tourPlan",
    });

    const axiosSecure = useAxiosSecure();
    const [isLoading, setIsLoading] = useState(false);

    const handlePackage = async (data) => {
        // console.log(data);
        try {
            setIsLoading(true);

            const inclusion = data.inclusion.split(",").map(item => item.trim());

            const imageFile = { image: data.image[0] };
            const imgbbRes = await imageUpload(imageFile);

            if (imgbbRes.data.success) {
                const newPackage = {
                    name: data.name,
                    duration: data.duration,
                    price: parseFloat(data.price),
                    member: parseInt(data.member),
                    image: imgbbRes.data.data?.display_url,
                    inclusion,
                    tourPlan: data.tourPlan
                };

                // package upload in database
                await axiosSecure.post("/packages", newPackage);

                reset();
                successAlert("Package is saved!");
            }
        } catch (error) {
            errorAlert("Package is not saved!");
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <section>
            <section className="bg-orange/90 py-5">
                <h2 className="text-2xl text-center text-teal uppercase font-bold">Add Package Form</h2>
            </section>

            {/* form */}
            <div className="max-w-5xl mx-auto py-10">
                <form onSubmit={handleSubmit(handlePackage)} className="border border-orange space-y-2 p-5">
                    <div className="flex flex-col md:flex-row md:gap-5">
                        <div className="w-full">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Tour Name</span>
                                </div>
                                <input type="text" {...register("name", { required: "Name is required." })} placeholder="e.g, Cox's Bazar Beach Escape" className="input input-bordered w-full" />
                            </label>
                            <p className="text-red-500">{errors.name?.message}</p>
                        </div>
                        <div className="w-full">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Duration</span>
                                </div>
                                <input type="text" {...register("duration", { required: "Duration is required." })} placeholder="e.g, 2 Days/ 3 Nights" className="input input-bordered w-full" />
                            </label>
                            <p className="text-red-500">{errors.duration?.message}</p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:gap-5">
                        <div className="w-full">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Price</span>
                                </div>
                                <input type="number" {...register("price", { required: "Price is required.", min: { value: 1, message: "Price must be greater than or equal to one." } })} placeholder="e.g, 150" className="input input-bordered w-full" />
                            </label>
                            <p className="text-red-500">{errors.price?.message}</p>
                        </div>
                        <div className="w-full">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Member</span>
                                </div>
                                <input type="number" {...register("member", { required: "Member is required.", min: { value: 1, message: "Minimum one member required" } })} placeholder="e.g, 3" className="input input-bordered w-full" />
                            </label>
                            <p className="text-red-500">{errors.member?.message}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Image</span>
                            </div>
                            <input type="file" {...register("image", { required: "Image is required." })} className="border border-base-300 py-2 w-full" />
                        </label>
                        <p className="text-red-500">{errors.image?.message}</p>
                    </div>
                    <div className="w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Inclusions</span>
                            </div>
                            <input type="text" {...register("inclusion", { required: "Inclusion is required." })} className="input input-bordered w-full" placeholder="Write each inclusion separated by a comma." />
                        </label>
                        <p className="text-red-500">{errors.inclusion?.message}</p>
                    </div>

                    <div className="w-full space-y-2">
                        <h2 className="label label-text">Add Tour Plan</h2>
                        {fields.map((field, indx) => (
                            <label key={field.id} className="form-control w-full">
                                <div className="label shrink-0">
                                    <span className="label-text">Day {indx + 1}</span>
                                </div>
                                <div className="flex items-center justify-between gap-5">
                                    <input type="text" {...register(`tourPlan[${indx}]`, { required: "Activities is required." })} className="input input-bordered w-full" placeholder="Write tour plan." />

                                    <button type="button" onClick={() => remove(indx)} className="px-4 py-2 bg-red-500 text-white text-center shrink-0 rounded-md">
                                        <IoMdCloseCircle className="text-2xl" />
                                    </button>

                                </div>
                                {errors.tourPlan?.[indx] && (
                                    <p className="text-red-500 text-sm">{errors.tourPlan[indx]?.message}</p>
                                )}
                            </label>
                        ))}
                    </div>
                    <div className="">
                        <button type="button" onClick={() => append("Write tour plan.")} className="px-4 py-2 rounded-md text-white bg-orange">Add Day</button>
                    </div>
                    <div className="flex flex-row pt-5">
                        <button type="submit" className="px-4 h-12 rounded-md text-white bg-teal w-full">{isLoading ? <Spinner></Spinner> : "Save Package"}</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddPackage;
