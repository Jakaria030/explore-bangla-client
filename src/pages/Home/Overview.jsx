import overview from "../../assets/overvidew.mp4";


const Overview = () => {
    return (
        <section className="max-w-8xl mx-auto px-5 mt-8 md:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                <div className="">
                    <video src={overview} controls className="w-full h-auto rounded-sm shadow-lg">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="space-y-2 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Overview</h2>
                    <p >The Perfect Place to Explore</p>
                    <p>Discover the beauty of Bangladesh with Explore Bangla. From peaceful beaches to green hills, enjoy every step of your journey and create memories that last forever.</p>
                </div>
            </div>
        </section>
    );
};

export default Overview;