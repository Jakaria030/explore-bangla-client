import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetSingleBooking = (booking_id) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data: booking, isLoading: isBookingLoading} = useQuery({
        queryKey: ["single-booking", booking_id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/get-single-booking/${booking_id}?email=${user?.email}`);
            return res?.data;
        }
    });

    return {booking, isBookingLoading};
};

export default useGetSingleBooking;