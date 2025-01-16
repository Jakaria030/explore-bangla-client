import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPackages = () => {
    const axiosPublic = useAxiosPublic();

    const {data: packages = [], isLoading: isAllPackagesLoading} = useQuery({
        queryKey: ["all-packages"],
        queryFn: async () => {
            const res = await axiosPublic.get("/packages");
            return res.data;
        }
    })

    
    return {packages, isAllPackagesLoading};
};

export default useAllPackages;