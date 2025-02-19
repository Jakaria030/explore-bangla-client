import { PiWaveSawtooth } from "react-icons/pi";
import { HiMiniUsers } from "react-icons/hi2";
import { MdPriceCheck } from "react-icons/md";
import cloud from "../../assets/cloud.jpg";

const ChooseUs = () => {
    return (
        <section className="max-w-8xl mx-auto px-5">
            <div className="flex flex-col lg:flex-row gap-5 md:gap-10">
                <figure className="basis-1/2 lg:basis-full flex items-center justify-">
                    <img className="mx-auto" src={cloud}/>
                </figure>
                <div className="basis-1/2 lg:basis-full bg-teal">
                    <div className="space-y-5 p-5">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">Why Choose Us</h2>
                            <p className="text-white">Future memories are booked here</p>
                        </div>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3">
                                <figure className="p-3 inline-block rounded-full shadow-md">
                                    <PiWaveSawtooth className="text-3xl text-white" />
                                </figure>
                                <div>
                                    <h4 className="text-lg font-bold text-white">Best Destinations</h4>
                                    <p className="text-white">Discover breathtaking landscapes, rich culture, and hidden gems across Bangladesh with Explore Bangla! Your next adventure awaits.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <figure className="p-3 inline-block rounded-full shadow-md">
                                    <HiMiniUsers className="text-3xl text-white" />
                                </figure>
                                <div>
                                    <h4 className="text-lg font-bold text-white">Professional Guides</h4>
                                    <p className="text-white">Our experienced guides ensure a seamless and enriching travel experience, providing expert insights and personalized assistance every step of the way.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <figure className="p-3 inline-block rounded-full shadow-md">
                                    <MdPriceCheck className="text-3xl text-white" />
                                </figure>
                                <div>
                                    <h4 className="text-lg font-bold text-white">Affordable Price</h4>
                                    <p className="text-white">Enjoy exceptional travel experiences at budget-friendly prices, ensuring great value without compromising on quality and comfort.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChooseUs;