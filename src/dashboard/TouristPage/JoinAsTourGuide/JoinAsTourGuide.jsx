import { useForm } from "react-hook-form";
import HeaderTitle from "../../components/HeaderTitle";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { errorAlert } from "../../../toastify/toastify";
import Spinner from "../../../components/Spinner";
import Swal from "sweetalert2";

const JoinAsTourGuide = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleApplication = async (data) => {
        // console.log(data);
        try{
            setIsLoading(true);

            const application = {
                ...data,
                email: user.email
            };

            const res = await axiosSecure.post(`/applications?email=${user?.email}`, application);

            if(res.data.acknowledged){
                Swal.fire({
                    icon: "success",
                    title: "Application is sent successfully.",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
            reset();

        } catch(error){
            errorAlert("Application is not sent.");
        }finally{
            setIsLoading(false);
        }
    };

    return (
        <section>
            {/* Heading title */}
            <HeaderTitle title={"Join As Tour Guide"}></HeaderTitle>

            {/* form */}
            {user && <div className="max-w-8xl mx-auto px-5 my-8 md:my-16">
                <form onSubmit={handleSubmit(handleApplication)} className="border border-slate-500 space-y-2 p-5">
                    <div className="w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Application Title</span>
                            </div>
                            <input type="text" {...register("title", { required: "Title is required." })} placeholder="e.g, Join as tour guide" className="input input-bordered w-full" />
                        </label>
                        <p className="text-red-500">{errors.title?.message}</p>
                    </div>

                    <div className="w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Reason</span>
                            </div>
                            <input type="text" {...register("reason", { required: "Reason is required." })} className="input input-bordered w-full" placeholder="Why wants to be a tour guide?" />
                        </label>
                        <p className="text-red-500">{errors.reason?.message}</p>
                    </div>

                    <div className="w-full">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">CV Link</span>
                            </div>
                            <input type="url" {...register("cvLink", { required: "CV link is required." })} placeholder="e.g, http://..." className="input input-bordered w-full" />
                        </label>
                        <p className="text-red-500">{errors.cvLink?.message}</p>
                    </div>

                    <div className="flex flex-row pt-5">
                        <button type="submit" className="px-4 h-12 rounded-md text-white bg-teal/80 w-full">{isLoading ? <Spinner></Spinner> : "Submit"}</button>
                    </div>
                </form>
            </div>}
        </section>
    );
};

export default JoinAsTourGuide;