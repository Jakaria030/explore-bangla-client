import { useState } from "react";
import useApplications from "../../../hooks/useApplications";
import HeaderTitle from "../../components/HeaderTitle";
import { MdDelete, MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { errorAlert } from "../../../toastify/toastify";

const ManageCandidates = () => {
    const [page, setPage] = useState(1);
    const { applicants, isApplicantsLoading, refetch } = useApplications(page, 10);


    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handlPrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        setPage(page + 1);
    };


    const handleAccepted = (applicantEmail, applicantId) => {
        // console.log(applicantEmail);

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Accept this application!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Accept it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/users/${applicantEmail}?email=${user?.email}`);
                if (res.data.acknowledged) {
                    await axiosSecure.delete(`/applications/${applicantId}?email=${user?.email}`);
                    Swal.fire({
                        title: "Accepted!",
                        text: "Application has been Accepted.",
                        icon: "success"
                    });
                    refetch();
                } else {
                    errorAlert("Application is not Accepted.");
                }
            }
        });
    };


    const handleRejected = (id) => {
        // console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Reject this application!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/applications/${id}?email=${user?.email}`);
                if (res.data.acknowledged) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Application has been Rejected.",
                        icon: "success"
                    });
                    refetch();
                } else {
                    errorAlert("Application is not Rejected.");
                }
            }
        });
    };


    return (
        <section>
            {/* heading title */}
            <HeaderTitle title={"Manage Candidates"}></HeaderTitle>

            {/* user table */}
            <div className="max-w-8xl mx-auto px-5 my-8 md:my-16">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-lg text-black/80 bg-teal/40">
                                <th>#</th>
                                <th>Applicants</th>
                                <th>Role</th>
                                <th>Application Title</th>
                                <th className="min-w-96">Reason</th>
                                <th className="text-center">CV</th>
                                <th className="text-center">Accep/Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isApplicantsLoading &&
                                applicants.map((applicant, indx) => <tr key={indx} className="hover:bg-teal/20">
                                    <td>{(indx + 1) + 10 * (page - 1)}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="rounded-lg h-12 w-12">
                                                    <img src={applicant.image} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{applicant.name}</div>
                                                <div className="text-sm opacity-50">{applicant.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="capitalize">{applicant.role}</td>
                                    <td>{applicant.title}</td>
                                    <td>{applicant.reason}</td>
                                    <td><a className="px-4 py-2 bg-teal text-white rounded-sm" href={applicant.cvLink}>Show</a></td>
                                    <td className="flex flex-col items-center space-y-2">
                                        <button onClick={() => handleAccepted(applicant.email, applicant._id)} className="px-4 py-2 bg-green-500 rounded-sm"><IoMdCheckmarkCircleOutline className="text-xl text-white font-medium" /></button>
                                        <button onClick={() => handleRejected(applicant._id)} className="px-4 py-2 bg-red-500 rounded-sm"><MdDelete className="text-xl text-white font-medium" /></button>
                                    </td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {
                        (!isApplicantsLoading && applicants.length === 0) && <h1 className="flex items-center justify-center text-2xl text-white py-5 bg-red-400">No Applicant Found</h1>
                    }
                </div>
            </div>

            {/* pagination */}
            <div className="max-w-8xl mx-auto px-5 py-10">
                <div className="flex justify-between items-center">
                    <button onClick={handlPrev} disabled={page === 1} className={` ${page === 1 && "cursor-not-allowed opacity-50"} flex items-center bg-slate-900 px-4 py-2 text-white`}><MdKeyboardArrowLeft className="text-2xl" />Prev</button>
                    <button onClick={handleNext} disabled={applicants.length < 10} className={`${applicants.length < 10 && "cursor-not-allowed opacity-50"} flex items-center bg-slate-900 px-4 py-2 text-white`}>Next<MdOutlineKeyboardArrowRight className="text-2xl" /></button>
                </div>
            </div>
        </section>
    );
};

export default ManageCandidates;