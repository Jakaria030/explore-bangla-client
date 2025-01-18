import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllStory = () => {
    const axiosPublic = useAxiosPublic();
    const {data: stories=[], isLoading: isStoriesLoading} = useQuery({
        queryKey: ["all-story"],
        queryFn: async () => {
            const res = await axiosPublic.get("/stories/get-all-story");
            return res.data;
        }
    });

    return {stories, isStoriesLoading};
};

export default useGetAllStory;