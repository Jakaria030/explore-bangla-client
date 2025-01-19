import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetBookingInfo = (page, limit) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const {data: bookingDetails, isLoading: isBookingDetailsLoading, refetch} = useQuery({
        queryKey: ["booking-info", page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/booking-details?touristEmail=${user?.email}&page=${page}&limit=${limit}`);
            return res?.data;
        }
    });

    return {bookingDetails, isBookingDetailsLoading, refetch};
};

export default useGetBookingInfo;