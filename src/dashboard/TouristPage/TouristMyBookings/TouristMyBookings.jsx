import { useState } from "react";
import useGetBookingInfo from "../../../hooks/useGetBookingInfo";
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import HeaderTitle from "../../components/HeaderTitle";
import { format } from "date-fns";

const TouristMyBookings = () => {
    const [page, setPage] = useState(1);
    const { bookingDetails, isBookingDetailsLoading } = useGetBookingInfo(page, 10);

    if (isBookingDetailsLoading) return;

    const handlPrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    const handlePayMent = () => {
        console.log('hello');
    };

    const handleCancel = () => {
        console.log('cencel');
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
                                        <td>{bookingDetail.tourPrice}</td>
                                        <td>
                                            <div className={`badge badge-outline ${bookingDetail.status === 'in-review' && 'bg-blue-500 text-white'} ${bookingDetail.status === 'rejected' && 'bg-red-500 text-white'} ${bookingDetail.status === 'accepted' && 'bg-green-500 text-white'}`}>{bookingDetail.status}</div>
                                        </td>

                                        <td className="flex flex-col gap-2">
                                            <button disabled={bookingDetail.status !== 'pending'} onClick={() => handlePayMent(bookingDetail._id)} className={`${bookingDetail.status !== 'pending' && 'opacity-50 cursor-not-allowed'} w-20 h-8 bg-green-500 rounded-sm text-white`}>Pay Now</button>
                                            <button disabled={bookingDetail.status !== 'pending'} onClick={() => handleCancel(bookingDetail._id)} className={`${bookingDetail.status !== 'pending' && 'opacity-50 cursor-not-allowed'} w-20 h-8 bg-red-500 rounded-sm text-white`}>Cancel</button>
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