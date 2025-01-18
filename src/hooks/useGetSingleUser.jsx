import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetSingleUser = (id) => {
    const axiosPublic = useAxiosPublic();
    const {data: singleUser, isLoading: isSingleUserLoading} = useQuery({
        queryKey: ["single-user", id],
        queryFn: async() => {
            const res = await axiosPublic.get(`/users/single-user/${id}`);
            return res.data;
        }
    });

    return {singleUser, isSingleUserLoading};
};

export default useGetSingleUser;