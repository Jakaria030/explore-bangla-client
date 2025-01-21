import { useState } from "react";
import useGetBookingInfo from "../../../hooks/useGetBookingInfo";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import HeaderTitle from "../../components/HeaderTitle";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { errorAlert } from "../../../toastify/toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TouristMyBookings = () => {
    const { user, loading } = useAuth();
    const [page, setPage] = useState(1);
    const { bookingDetails, isBookingDetailsLoading, refetch } = useGetBookingInfo(page, 10);
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


    const handleCancel = (bookingID) => {
        // console.log(bookingID);
        try {

            Swal.fire({
                title: "Are you sure?",
                text: "You want to delete this booking.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const res = await axiosSecure.delete(`/bookings/delete-booking?email=${user?.email}&bookingID=${bookingID}`);
                    if (res.data.acknowledged) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your booking has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    }
                }
            });

        } catch (error) {
            errorAlert("Booking is not cancel!");
        }

    };

    return (
        <section>
            <HeaderTitle title={"My Bookings"}></HeaderTitle>
            {/* booking table */}
            <div className="max-w-8xl mx-auto px-5 mt-8 md:mt-16">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-lg text-black/80 bg-teal/40">
                                <th>#</th>
                                <th>Package Name</th>
                                <th>Tour Guide</th>
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
                                        <td>{bookingDetail.tourGuideName}</td>
                                        <td>{formattedDate}</td>
                                        <td>${bookingDetail.tourPrice}</td>
                                        <td>
                                            <div className={`badge badge-outline ${bookingDetail.status === 'in-review' && 'bg-blue-500 text-white'} ${bookingDetail.status === 'rejected' && 'bg-red-500 text-white'} ${bookingDetail.status === 'accepted' && 'bg-green-500 text-white'} capitalize`}>{bookingDetail.status}</div>
                                        </td>

                                        <td className="flex flex-col gap-2">
                                            <Link to={`/dashboard/tourist-payment/${bookingDetail._id}`} className="inline-block">
                                                <button disabled={bookingDetail.status !== 'pending'} className={`${bookingDetail.status !== 'pending' && 'opacity-50 cursor-not-allowed'} w-full px-2 py-2 bg-green-500 rounded-sm text-white text-nowrap`}>Pay Now</button>
                                            </Link>
                                            <button disabled={bookingDetail.status !== 'pending'} onClick={() => handleCancel(bookingDetail._id)} className={`${bookingDetail.status !== 'pending' && 'opacity-50 cursor-not-allowed'} w-full px-2 py-2 bg-red-500 rounded-sm text-white text-nowrap`}>Cancel</button>
                                        </td>
                                    </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                    {
                        (!isBookingDetailsLoading && bookingDetails.length === 0) && <h1 className="flex items-center justify-center text-2xl text-white py-5 bg-red-400">Booking Not Found</h1>
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

export default TouristMyBookings;