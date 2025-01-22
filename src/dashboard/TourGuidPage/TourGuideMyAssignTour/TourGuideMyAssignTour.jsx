import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import HeaderTitle from "../../components/HeaderTitle";
import useGetBookingInfoForTourGuide from "../../../hooks/useGetBookingInfoForTourGuide";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { format } from "date-fns";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { errorAlert, successAlert } from "../../../toastify/toastify";
import Swal from "sweetalert2";

const TourGuideMyAssignTour = () => {
    const { user, loading } = useAuth();
    const [page, setPage] = useState(1);
    const { bookingDetails, isBookingDetailsLoading, refetch } = useGetBookingInfoForTourGuide(page, 10);
    const axiosSecure = useAxiosSecure();

    if (isBookingDetailsLoading || loading) return;

    const handlPrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    const handleAccept = async (id) => {
        // console.log(id);
        try {
            await axiosSecure.patch(`/bookings/update-booking/${id}`, { status: 'accepted' });
            successAlert('Accepted');
            refetch();
        } catch (error) {
            errorAlert(error.message);
        }
    };

    const handleReject = (id) => {
        // console.log(id);
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to reject this booking!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, reject it!"
            }).then(async(result) => {
                if (result.isConfirmed) {
                    await axiosSecure.patch(`/bookings/update-booking/${id}`, { status: 'rejected' });
                    refetch();
                    Swal.fire({
                        title: "Rejected!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });

        } catch (error) {
            errorAlert(error.message);
        }
    };


    return (
        <section>
            <HeaderTitle title={"My Assigned Tours"}></HeaderTitle>
            {/* booking table */}
            <div className="max-w-8xl mx-auto px-5 mt-8 md:mt-16">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-lg text-black/80 bg-teal/40">
                                <th>#</th>
                                <th>Package Name</th>
                                <th>Tourist Name</th>
                                <th>Tour Date</th>
                                <th>Tour Price</th>
                                <th>Booking Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!isBookingDetailsLoading &&
                                bookingDetails.map((bookingDetail, indx) => {

                                    const formattedDate = format(new Date(bookingDetail.tourDate), "dd MMM yyyy");

                                    return (<tr key={indx} className="hover:bg-teal/20">
                                        <td>{(indx + 1) + 10 * (page - 1)}</td>
                                        <td>{bookingDetail.tourType}</td>
                                        <td>{bookingDetail.touristName}</td>
                                        <td>{formattedDate}</td>
                                        <td>${bookingDetail.tourPrice}</td>
                                        <td>
                                            <div className={`badge badge-outline ${bookingDetail.status === 'in-review' && 'bg-blue-500 text-white'} ${bookingDetail.status === 'rejected' && 'bg-red-500 text-white'} ${bookingDetail.status === 'accepted' && 'bg-green-500 text-white'} capitalize`}>{bookingDetail.status}</div>
                                        </td>

                                        <td className="flex flex-col gap-2">
                                            <button onClick={() => handleAccept(bookingDetail._id)} disabled={!(bookingDetail.status === 'in-review' || bookingDetail.status === 'rejected')} className={`${!(bookingDetail.status === 'in-review' || bookingDetail.status === 'rejected') && 'opacity-50 cursor-not-allowed'} w-20 h-8 bg-green-500 rounded-sm text-white`}>Accept</button>
                                            <button onClick={() => handleReject(bookingDetail._id)} disabled={!(bookingDetail.status === 'in-review' || bookingDetail.status === 'accepted')} className={`${!(bookingDetail.status === 'in-review' || bookingDetail.status === 'accepted') && 'opacity-50 cursor-not-allowed'} w-20 h-8 bg-red-500 rounded-sm text-white`}>Reject</button>
                                        </td>
                                    </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    {
                        (!isBookingDetailsLoading && bookingDetails.length === 0) && <h1 className="flex items-center justify-center text-2xl text-white py-5 bg-red-400">Your Assign Tour Not Found!</h1>
                    }
                </div>
            </div>

            {/* pagination */}
            <div className="max-w-8xl mx-auto px-5 my-8">
                <div className="flex justify-between items-center">
                    <button onClick={handlPrev} disabled={page === 1} className={` ${page === 1 && "cursor-not-allowed opacity-50"} flex items-center bg-slate-900 px-4 py-2 text-white`}><MdKeyboardArrowLeft className="text-2xl" />Prev</button>
                    <button onClick={handleNext} disabled={bookingDetails.length < 10} className={`${bookingDetails.length < 10 && "cursor-not-allowed opacity-50"} flex items-center bg-slate-900 px-4 py-2 text-white`}>Next<MdOutlineKeyboardArrowRight className="text-2xl" /></button>
                </div>
            </div>
        </section>
    );
};

export default TourGuideMyAssignTour;