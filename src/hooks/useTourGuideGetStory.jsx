import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useTourGuideGetStory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: tourGuideStories = [], isLoading: isTourGuideStoriesLoading, refetch} = useQuery({
        queryKey: ["tour-guide-story"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/tour-guide-stories?email=${user?.email}`);
            return res.data;
        }
    });

    return {tourGuideStories, isTourGuideStoriesLoading, refetch};
};

export default useTourGuideGetStory;