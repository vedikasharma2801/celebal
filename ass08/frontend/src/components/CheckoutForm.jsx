// frontend/src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast'; // Use toast for errors

// Accept the new handler as a prop
const CheckoutForm = ({ onSuccessfulPayment }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) { return; }
        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.href }, // Return to the current page
            redirect: 'if_required'
        });

        if (error) {
            toast.error(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Call the handler passed from OrderPage
            onSuccessfulPayment({
                id: paymentIntent.id,
                status: paymentIntent.status,
                update_time: new Date().toISOString(), // Use current time
                email_address: 'not_available' // Payer email is not easily available here
            });
        } else {
            toast.error('An unexpected error occurred.');
        }
        setIsLoading(false);
    };
    
    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <Button disabled={isLoading || !stripe || !elements} type="submit" className="w-100 mt-3">
                {isLoading ? "Processing..." : "Pay now"}
            </Button>
        </form>
    );
};

export default CheckoutForm;