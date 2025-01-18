import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useGetAllTourGuide = () => {
    const axiosPublic = useAxiosPublic();

    const {data: tourGuides, isLoading: isTourGuideLoading} = useQuery({
        queryKey: ["all-tour-guide"],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/all-tour-guide');
            return res.data;
        }
    });

    return {tourGuides, isTourGuideLoading};
};

export default useGetAllTourGuide;