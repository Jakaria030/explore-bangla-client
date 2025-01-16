import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = (searchKey, filterKey, page, limit) => {
    const axiosSecure = useAxiosSecure();

    const {data: users = [], isLoading} = useQuery({
        queryKey: ["users", searchKey, filterKey, page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${searchKey}&filter=${filterKey}&page=${page}&limit=${limit}`);
            return res.data;
        }
    })

    return {users, isLoading};
};

export default useUsers;