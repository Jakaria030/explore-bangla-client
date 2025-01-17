import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeetTourGuides = () => {
    const axiosPublic = useAxiosPublic();

    const {data: tourGuides = [], isTourGuideLoading} = useQuery({
        queryKey: ["random-tour-guide"],
        queryFn: async () => {
            const res = await axiosPublic.get("/users/randome-tour-guide");
            return res.data;
        }
    });

    return {tourGuides, isTourGuideLoading};
};

export default useMeetTourGuides;