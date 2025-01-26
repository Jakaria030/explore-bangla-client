import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { successAlert } from '../../toastify/toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const CheckoutForm = ({booking_id, price}) => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if(price > 0)
        axiosSecure.post(`/create-payment-intent`, {price: price})
        .then(res => {
            setClientSecret(res.data.clientSecret);
        })
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError('');
        setIsLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            setIsLoading(false);
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if(error){
            setError(error.message);
            setIsLoading(false);
        } else{
            setError('');
        }

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });


        if(confirmError){
            setError(confirmError.message);
            setIsLoading(false);
        }else{
            setError('');
            if(paymentIntent.status === 'succeeded'){
                // console.log(paymentIntent.id);

                // update booking status and add transection id
                axiosSecure.patch(`/bookings/update-booking/${booking_id}`, {transectionID: paymentIntent.id, status: 'in-review'})
                .then(res => {
                    navigate('/dashboard/tourist-my-bookings');
                    successAlert('Payment successfull');
                    setIsLoading(false);
                })
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Secure Payment</h2>
            <p className="text-gray-500 text-sm mb-6 text-center">Enter your card details below to proceed with the payment.</p>

            <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                fontFamily: "Inter, sans-serif",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
            </div>

            {error && <p className='text-red-500'>{error}</p>}

            <button
                type="submit"
                disabled={!stripe || !clientSecret}
                className="w-full mt-3 px-6 h-12 bg-teal text-white rounded-md disabled:bg-opacity-40 disabled:cursor-not-allowed"
            >
                {isLoading ? <Spinner></Spinner> : "Pay Now"}
            </button>
        </form>

    );
};

export default CheckoutForm;