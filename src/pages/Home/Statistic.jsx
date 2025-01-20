import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Statistic = () => {
    const axiosPublic = useAxiosPublic();
    const { data: statistics, isLoading } = useQuery({
        queryKey: ["stat"],
        queryFn: async () => {
            const res = await axiosPublic.get('/users/get-statistics');
            return res.data;
        }
    });

    return (
        <section className="bg-banner-2 bg-cover py-8 md:py-16 relative">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="max-w-8xl mx-auto px-5 relative">
                {!isLoading && statistics && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
                        {/* Total Tourist */}
                        <div className="bg-teal p-5 text-white rounded-md space-y-2 text-center">
                            <h2 className="text-2xl font-bold">{statistics.totalTourist}+</h2>
                            <p>Total Tourist</p>
                        </div>

                        {/* Total Tour Guide */}
                        <div className="bg-teal p-5 text-white rounded-md space-y-2 text-center">
                            <h2 className="text-2xl font-bold">{statistics.totalTourGuide}+</h2>
                            <p>Total Tour Guide</p>
                        </div>

                        {/* Total Packages */}
                        <div className="bg-teal p-5 text-white rounded-md space-y-2 text-center">
                            <h2 className="text-2xl font-bold">{statistics.totalPackages}+</h2>
                            <p>Total Packages</p>
                        </div>

                        {/* Total Stories */}
                        <div className="bg-teal p-5 text-white rounded-md space-y-2 text-center">
                            <h2 className="text-2xl font-bold">{statistics.totalStory}+</h2>
                            <p>Total Stories</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Statistic;
