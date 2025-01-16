import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTourGuide = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: isTourGuide, isLoading: isTourGuideLoading} = useQuery({
        queryKey: ["tour-guide", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/tour-guide/${user.email}`);
            return res.data?.tourGuide;
        }
    });

    return {isTourGuide, isTourGuideLoading};
};

export default useTourGuide;