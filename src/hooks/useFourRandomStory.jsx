import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useFourRandomStory = () => {
    const axiosPublic = useAxiosPublic();
    const {data: stories = [], isLoading: isStoriesLoading} = useQuery({
        queryKey: ['four-random-story'],
        queryFn: async () => {
            const res = await axiosPublic.get("/stories/four-random-story");
            return res.data;
        }
    });

    return {stories, isStoriesLoading};
};

export default useFourRandomStory;