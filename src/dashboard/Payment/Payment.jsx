import { useParams } from "react-router-dom";
import HeaderTitle from "../components/HeaderTitle";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useGetSingleBooking from "../../hooks/useGetSingleBooking";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { booking_id } = useParams();
    const {booking, isBookingLoading} = useGetSingleBooking(booking_id);

    if(isBookingLoading) return;

    return (
        <section>
            <HeaderTitle title={"Checkout Form"}></HeaderTitle>

            <div className="max-w-8xl mx-auto px-5">
                <div className="max-w-2xl mx-auto my-16 border border-slate-500">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm booking_id={booking_id} price={booking.price}></CheckoutForm>
                    </Elements>
                </div>
            </div>
        </section>
    );
};

export default Payment;