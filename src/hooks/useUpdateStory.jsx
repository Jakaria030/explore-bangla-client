import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUpdateStory = (id, userRole) => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: story, isLoading: isStoryLoading, refetch} = useQuery({
        queryKey: ["update-story", userRole],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/${userRole}/${id}?email=${user.email}`);
            return res.data;
        }
    });

    return {story, isStoryLoading, refetch};
};

export default useUpdateStory;