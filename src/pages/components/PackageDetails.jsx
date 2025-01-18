import { Link, useNavigate, useParams } from "react-router-dom";
import useSinglePackage from "../../hooks/useSinglePackage";
import SectionTitle from "./SectionTitle";
import { FaArrowDown } from "react-icons/fa";
import useGetAllTourGuide from "../../hooks/useGetAllTourGuide";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { errorAlert } from "../../toastify/toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const PackageDetails = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();
    const { singlePackage, isSinglePackageLoading } = useSinglePackage(id);

    const images = singlePackage.images;
    const inclusions = singlePackage.inclusions;
    const tourPlan = singlePackage.tourPlan;

    const { tourGuides, isTourGuideLoading } = useGetAllTourGuide();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [journeyDate, setJourneyDate] = useState(new Date());

    const axiosSecure = useAxiosSecure();

    const handleBooking = async (data) => {
        // console.log(data);
        try {
            setIsLoading(true);

            if (user && user?.email) {
                const newBooking = {
                    email: user.email,
                    packageID: singlePackage._id,
                    tourGuideID: data.tourGuideID,
                    status: "pending",
                    date: journeyDate
                };

                const res = await axiosSecure.post(`/bookings?email=${user?.email}`, newBooking);
                if (res.data.acknowledged) {
                    Swal.fire({
                        title: "<h3>Confirm Your Booking</h3>",
                        html: `<a href='http://localhost:5173/dashboard/tourist-my-bookings' style="color: blue; text-decoration: underline;">Go To My Booking Page</a>`,
                    });
                }

            } else {
                errorAlert("Please login to booked this package.");
                navigate("/login", { state: `/package-details/${id}` });
            }
        } catch (error) {
            errorAlert("Package is not Booked! Try Again");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {
                !isSinglePackageLoading && <section className="space-y-8 md:space-y-16 mb-8 md:mb-16">
                    {/* gallary section */}
                    <section className="max-w-8xl mx-auto px-5">
                        <div className="my-8">
                            <SectionTitle title={"Photo Gallery"}></SectionTitle>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px] gap-5 border-2 border-slate-500 rounded-md p-2">
                            {images.map((image, indx) => (
                                <div key={indx} className={`relative rounded-md ${indx % 2 === 0 ? "row-span-2" : ""}`}>
                                    <figure className="h-full">
                                        <img className="w-full h-full object-cover rounded-md" src={image} />
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* about the tour */}
                    <section className="bg-teal/30 py-8">

                        <section className="max-w-8xl mx-auto px-5">
                            <div className="my-8">
                                <SectionTitle title={"About the tour"}></SectionTitle>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between gap-5">
                                <div className="overflow-x-auto ">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th>Place Name</th>
                                                <td>: {singlePackage.placeName}</td>
                                            </tr>
                                            <tr>
                                                <th>Trip Title</th>
                                                <td>: {singlePackage.tripTitle}</td>
                                            </tr>
                                            <tr>
                                                <th>Tour Type</th>
                                                <td>: {singlePackage.tourType}</td>
                                            </tr>
                                            <tr>
                                                <th>Members</th>
                                                <td>: {singlePackage.members} person</td>
                                            </tr>
                                            <tr>
                                                <th>Durations</th>
                                                <td>: {singlePackage.duration}</td>
                                            </tr>
                                            <tr>
                                                <th>Package Price</th>
                                                <td>: ${singlePackage.price}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                                {/* inclusions */}
                                <div>
                                    <h2 className="text-xl font-semibold">Inclusions</h2>
                                    {
                                        inclusions.map((inclusion, indx) => <ul key={indx} className="list-disc ml-5 space-y-1">
                                            <li>{inclusion}</li>
                                        </ul>)
                                    }
                                </div>
                            </div>
                        </section>
                    </section>

                    {/* tour plan */}
                    <section className="max-w-8xl mx-auto px-5">
                        {/* section title */}
                        <div className="my-8">
                            <SectionTitle title={"Our Tour Plan"}></SectionTitle>
                        </div>

                        {
                            tourPlan.map((plan, indx) => <div key={indx}>
                                {indx !== 0 && <FaArrowDown className="text-2xl text-center mx-auto text-teal" />}
                                <div className="bg-teal/30 py-5 rounded-sm space-y-2">
                                    <div className="bg-teal text-white inline-block px-4 py-2 shadow-xl text-lg font-bold">Day : {indx + 1}</div>
                                    <div className="px-5">{plan}</div>
                                </div>
                            </div>)
                        }

                    </section>

                    {/* all tour guid list */}
                    <section className="max-w-8xl mx-auto px-5">
                        {/* section title */}
                        <div className="my-8">
                            <SectionTitle title={"Our Tour Guides"}></SectionTitle>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
                            {!isTourGuideLoading && tourGuides.map(tourGuide => {
                                return <Link to={`/tour-guide-details/${tourGuide._id}`} key={tourGuide._id} className="flex items-center gap-3 bg-teal/10 p-5 rounded-md hover:bg-teal/20">
                                    <div className="mask rounded-md h-12 w-12">
                                        <img className="rounded-md"
                                            src={tourGuide.image} />
                                    </div>
                                    <div>
                                        <div className="font-bold">{tourGuide.name}</div>
                                        <div className="text-sm opacity-80">{tourGuide.email}</div>
                                    </div>
                                </Link>
                            })}
                        </div>

                    </section>

                    {/* booking form */}
                    <section className="max-w-8xl mx-auto px-5">
                        {/* section title */}
                        <div className="my-8">
                            <SectionTitle title={"Booking Form"}></SectionTitle>
                        </div>

                        <form onSubmit={handleSubmit(handleBooking)} className="border border-slate-500 grid grid-cols-1 md:grid-cols-2 p-5 gap-5">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Name</span>
                                    </div>
                                    <input type="text" readOnly={user && user?.email} defaultValue={user && user?.email && user.displayName} {...register("name")} placeholder="Your Name" className="input input-bordered w-full" />
                                </label>
                            </div>

                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Email</span>
                                    </div>
                                    <input type="email" readOnly={user && user?.email} defaultValue={user && user?.email && user.email} {...register("email")} placeholder="Your Email" className="input input-bordered w-full" />
                                </label>
                            </div>

                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Photo URL</span>
                                    </div>
                                    <input type="url" readOnly={user && user?.email} defaultValue={user && user?.email && user.photoURL} {...register("photoURL")} placeholder="Your Photo URL" className="input input-bordered w-full" />
                                </label>
                            </div>

                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Price (USD)</span>
                                    </div>
                                    <input type="number" readOnly={user && user?.email} defaultValue={user && user?.email && singlePackage && singlePackage.price} {...register("price")} placeholder="Package Price" className="input input-bordered w-full" />
                                </label>
                            </div>

                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Date</span>
                                    </div>
                                    <DatePicker selected={journeyDate} onChange={(date) => setJourneyDate(date)} className="input input-bordered w-full" />
                                </label>
                            </div>

                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Select Tour Guide</span>
                                    </div>
                                    <select {...register("tourGuideID", { required: "Tour guide is required." })} className="select select-bordered w-full" >
                                        {!isTourGuideLoading &&
                                            tourGuides.map((guide, indx) => {
                                                return <option key={guide._id} value={guide._id}>{guide.name}</option>
                                            })
                                        }
                                    </select>
                                </label>
                                <p className="text-red-500">{errors.tourGuideID?.message}</p>
                            </div>

                            <div className="w-full md:col-span-2">
                                <button type="submit" className="px-4 h-12 rounded-md text-white bg-teal/80 w-full">{isLoading ? <Spinner></Spinner> : "Book Now"}</button>
                            </div>
                        </form>
                    </section>

                </section>
            }
        </>
    );
};

export default PackageDetails;