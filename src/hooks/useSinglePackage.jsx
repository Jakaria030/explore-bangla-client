import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSinglePackage = (id) => {
    const axiosPublic = useAxiosPublic();
    
    const {data: singlePackage = [], isLoading: isSinglePackageLoading} = useQuery({
        queryKey: ["single-package", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/packages/single-package/${id}`);
            return res.data;
        }
    });

    return {singlePackage, isSinglePackageLoading};
};

export default useSinglePackage;