import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useTouristGetStory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: touristStories = [], isLoading: isTouristStoriesLoading, refetch} = useQuery({
        queryKey: ["tourist-story"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/tourist-stories?email=${user?.email}`);
            return res.data;
        }
    });

    return {touristStories, isTouristStoriesLoading, refetch};
};

export default useTouristGetStory;