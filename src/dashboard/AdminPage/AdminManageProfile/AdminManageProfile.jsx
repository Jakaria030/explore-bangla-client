import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import userUserRole from "../../../hooks/userUserRole";
import HeaderTitle from "../../components/HeaderTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner";

import totalPayment from "../../../assets/coin.png";
import totalTourGuides from "../../../assets/tour-guide.png";
import totalPackages from "../../../assets/sustainable.png";
import totalClients from "../../../assets/tourist.png";
import totalStories from "../../../assets/storytelling.png";
import { useQuery } from "@tanstack/react-query";


const AdminManageProfile = () => {
    const { user, setUser, updateUserProfile, loading } = useAuth();
    const { userRole, isUserRoleLoading } = userUserRole();
    const [isLoading, setIsLoading] = useState(false);


    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();


    const { data: counts, isLoading: isCountLoading } = useQuery({
        queryKey: ['total-count'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/dashboard/count-all?email=${user?.email}`);
            return res?.data;
        }
    })


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
            setUser((prev) => { return { ...prev, displayName: updatedData.displayName, photoURL: updatedData.photoURL } });

            const updateUser = {
                name: updatedData.displayName,
                image: updatedData.photoURL
            };

            await axiosSecure.patch(`/users/admin/profile-update?email=${user?.email}`, updateUser);

            successAlert("Profile updated.")

            reset();
        } catch (error) {
            errorAlert("Profile is not updated.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section>
            <HeaderTitle title={`Welcome ${user?.displayName}`}></HeaderTitle>

            <div className="space-y-8 md:space-y-16 mb-8 md:mb-16">
                {/* statistic overview */}
                <section className="max-w-8xl mx-auto px-5 mt-8 md:mt-16">
                    {(!isCountLoading && counts) && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="border rounded-lg p-5 space-y-1 text-center">
                            <img className="size-20 mx-auto" src={totalPayment} />
                            <h1 className="text-2xl font-black pt-5">${counts.totalPayment}</h1>
                            <h2 className="text-xl font-semibold">Total Payment</h2>
                        </div>
                        <div className="border rounded-lg p-5 space-y-1 text-center">
                            <img className="size-20 mx-auto" src={totalTourGuides} />
                            <h1 className="text-2xl font-black pt-5">{counts.totalTourGuides}</h1>
                            <h2 className="text-xl font-semibold">Total Tour Guides</h2>
                        </div>
                        <div className="border rounded-lg p-5 space-y-1 text-center">
                            <img className="size-20 mx-auto" src={totalPackages} />
                            <h1 className="text-2xl font-black pt-5">{counts.totalPackages}</h1>
                            <h2 className="text-xl font-semibold">Total Packages</h2>
                        </div>
                        <div className="border rounded-lg p-5 space-y-1 text-center">
                            <img className="size-20 mx-auto" src={totalClients} />
                            <h1 className="text-2xl font-black pt-5">{counts.totalClients}</h1>
                            <h2 className="text-xl font-semibold">Total Clients</h2>
                        </div>
                        <div className="border rounded-lg p-5 space-y-1 text-center">
                            <img className="size-20 mx-auto" src={totalStories} />
                            <h1 className="text-2xl font-black pt-5">{counts.totalStories}</h1>
                            <h2 className="text-xl font-semibold">Total Stories</h2>
                        </div>

                    </div>}
                </section>

                {
                    (!loading && !isUserRoleLoading) && (<div className="max-w-8xl mx-auto px-5">
                        <div className="bg-teal/50 p-10 rounded-lg text-center">
                            <figure className="w-52 h-52 rounded-full mx-auto ring-4 ring-teal">
                                <img
                                    className="w-full h-full object-cover rounded-full"
                                    src={user?.photoURL}
                                    alt="User Profile"
                                />
                            </figure>
                            <div>
                                <h2 className="text-xl font-bold mt-5">Name: {user?.displayName}</h2>
                                <p className="text-charcoal">Email: {user?.email}</p>
                                <p className="text-lg text-charcoal capitalize">Role: {userRole}</p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-5">
                                    <button onClick={() => document.getElementById('edit').showModal()} className="px-6 py-2 bg-teal rounded-sm text-white">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>

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

export default AdminManageProfile;