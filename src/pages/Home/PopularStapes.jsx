import { FaRegImage, FaRegUser } from "react-icons/fa";
import { TbBulb } from "react-icons/tb";

const PopularStapes = () => {
    return (
        <section className="max-w-8xl mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10">
                <div className="space-y-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-charcoal">Popular Stapes</h2>
                        <p>Share your experiences with your travel companion.</p>
                    </div>
                    <div className="space-y-10">
                        <div className="flex items-center gap-3">
                            <figure className="p-3 inline-block rounded-full shadow-md">
                                <FaRegUser className="text-3xl text-black" />
                            </figure>
                            <div>
                                <h4 className="text-lg font-bold">Sign Up</h4>
                                <p>Make an account and login to keep yourself updated into travelers platform.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <figure className="p-3 inline-block rounded-full shadow-md">
                                <TbBulb className="text-3xl text-black" />
                            </figure>
                            <div>
                                <h4 className="text-lg font-bold">Create Events</h4>
                                <p>Create an event to gather your fellow travelers and get to know them.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <figure className="p-3 inline-block rounded-full shadow-md">
                                <FaRegImage className="text-3xl text-black" />
                            </figure>
                            <div>
                                <h4 className="text-lg font-bold">Share Memories</h4>
                                <p>Upload and share stories with your fellow travelers anytime</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-map bg-no-repeat bg-cover bg-center shadow-lg">
                    <figure className="p-5 pb-0">
                        <img className="mx-auto hidden lg:flex" src="/src/assets/man-on-map-1.png" />
                        <img className="mx-auto lg:hidden" src="/src/assets/man-on-map-2.png" />
                    </figure>
                </div>
            </div>
        </section>
    );
};

export default PopularStapes;