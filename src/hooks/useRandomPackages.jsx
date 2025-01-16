import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useRandomPackages = () => {
    const axiosPublic = useAxiosPublic();

    const {data: randomPackages = [], isLoading: isRandomPackagesLoading} = useQuery({
        queryKey: ["random-packages"],
        queryFn: async () => {
            const res = await axiosPublic.get("/packages/random");
            return res.data;
        }
    });
    
    return {randomPackages, isRandomPackagesLoading};
};

export default useRandomPackages;