import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useApplications = (page=1, limit=10) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: applicants = [], isLoading: isApplicantsLoading} = useQuery({
        queryKey: ["applicants", page],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applications?email=${user?.email}&page=${page}&limit=${limit}`);
            return res.data;
        }
    });

    return {applicants, isApplicantsLoading};
};

export default useApplications;