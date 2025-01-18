import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useGetTourGuideStory = (email) => {;
    const axiosPublic = useAxiosPublic();

    const {data: tourGuideStories = [], isLoading: isTourGuideStoriesLoading} = useQuery({
        queryKey: ["tour-guide-stories", email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/stories/get-tour-guide-stories/${email}`);
            return res.data;
        }
    });

    return {tourGuideStories, isTourGuideStoriesLoading,};
};

export default useGetTourGuideStory;