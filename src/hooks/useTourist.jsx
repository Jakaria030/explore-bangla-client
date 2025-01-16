import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTourist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: isTourist, isLoading: isTouristLoading} = useQuery({
        queryKey: ["tourist", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tourist/${user.email}`);
            return res.data?.tourist;
        }
    });

    return {isTourist, isTouristLoading};
};

export default useTourist;