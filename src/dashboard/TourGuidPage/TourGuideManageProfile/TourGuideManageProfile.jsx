import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import userUserRole from "../../../hooks/userUserRole";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utilities/imageUpload";
import { errorAlert, successAlert } from "../../../toastify/toastify";
import Spinner from "../../../components/Spinner";
import HeaderTitle from "../../components/HeaderTitle";


const TourGuideManageProfile = () => {
    const { user, setUser, updateUserProfile, loading } = useAuth();
    const { userRole, isUserRoleLoading } = userUserRole();
    const [isLoading, setIsLoading] = useState(false);


    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    
    const handleUpdateForm = async (data) => {
        // console.log(data);

        try {
            setIsLoading(true);
            const updatedData = {
                displayName: data.name
            };

            if (data.image[0]) {
                const imageFile = { image: data.image[0] };
                const imgbbRes = await imageUpload(imageFile);

                if (imgbbRes.data.success) {
                    updatedData.photoURL = imgbbRes.data.data?.display_url;
                }
            }

            await updateUserProfile(updatedData);
            setUser((prev) => {return {...prev, displayName:updatedData.displayName, photoURL:updatedData.photoURL}});

            const updateUser = {
                name: updatedData.displayName,
                image: updatedData.photoURL
            };

            await axiosSecure.patch(`/users/tour-guide/profile-update?email=${user?.email}`, updateUser);

            successAlert("Profile updated.")

            reset();
        } catch (error) {
            console.log(error);
            errorAlert("Profile is not updated.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section>
            <HeaderTitle title={`Welcome ${user.displayName}`}></HeaderTitle>

            {
                (!loading && !isUserRoleLoading) && (<div className="max-w-8xl mx-auto px-5">
                    <div className="bg-teal/50 p-10 rounded-lg text-center mt-8 md:mt-16">
                        <figure className="w-52 h-52 rounded-full mx-auto ring-4 ring-teal">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src={user?.photoURL}
                                alt="User Profile"
                            />
                        </figure>
                        <div>
                            <h2 className="text-xl font-bold mt-5">{user?.displayName}</h2>
                            <p className="text-lg text-charcoal capitalize">{userRole}</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-5">
                                <button onClick={() => document.getElementById('edit').showModal()} className="px-6 py-2 bg-teal rounded-sm text-white">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="edit" className="modal">
                <div className="modal-box rounded-md">
                     <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form> 
                    <form onSubmit={handleSubmit(handleUpdateForm)} className="space-y-2">
                        <h2 className="text-xl font-semibold">Update Profile</h2>
                        <input type="text" {...register("name")} placeholder="Name" defaultValue={user?.displayName} className="input input-bordered w-full" />
                        <input type="email" readOnly {...register("email")} placeholder="Email" defaultValue={user?.email} className="input input-bordered w-full" />
                        <input type="text" readOnly {...register("role")} placeholder="Role" defaultValue={userRole} className="input input-bordered w-full capitalize" />
                        <input type="file" {...register("image")} className="border border-slate-300 rounded-md py-2 w-full" />
                        <button className="w-20 h-10 bg-teal text-white rounded-sm cursor-pointer">{isLoading ? <Spinner></Spinner> : "Update"}</button>
                    </form>
                </div>
            </dialog>
        </section>
    );
};

export default TourGuideManageProfile;