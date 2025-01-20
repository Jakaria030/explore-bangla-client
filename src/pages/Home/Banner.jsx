import { Link } from "react-router-dom";

const Banner = () => {

    return (
        <section className="relative bg-banner bg-center h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px]">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="relative flex flex-col items-center px-5 justify-center h-full space-y-2 text-center">
                <h1 className="text-3xl md:text-7xl font-bold text-white">Explore Bangla</h1>
                <h6 className="text-xl text-white pb-5">Your dream destination is just one click away!</h6>
                <Link to="/trips">
                    <button className="px-4 py-2 bg-orange hover:bg-orange-600 text-white font-medium rounded-sm">See Package</button>
                </Link>
            </div>
        </section>
    );

};

export default Banner;