import { useCreateOrderMutation } from "@/redux/feature/orders/ordersApi";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {
    setOpen: any;
    data: any;
};

const CheckOutForm = ({ data, setOpen }: Props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isPaymentElementComplete, setIsPaymentElementComplete] = useState(false);
    const [createOrder] = useCreateOrderMutation();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const handleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message as string);
            toast.error(error.message)
            setIsLoading(false);
            setOpen(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            const orderData = await createOrder({ courseId: data?.data?.course?._id, payment_info: paymentIntent });
            console.log(orderData);
            router.push('/profile/my-courses')
            setIsLoading(false); // Ensure loading is set to false after successful order creation
            toast.success(orderData?.data?.message);
            setOpen(false);
        }
    };

    const handlePaymentElementChange = (event: any) => {
        setIsPaymentElementComplete(event.complete);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" onChange={handlePaymentElementChange} />
            <Button
                disabled={isLoading || !stripe || !elements || !isPaymentElementComplete}
                id="submit"
                className="mt-3"
            >
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner">Loading...</div> : "Pay now"}
                </span>
            </Button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
};

export default CheckOutForm;
