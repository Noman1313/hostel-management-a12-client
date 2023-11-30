import { loadStripe } from "@stripe/stripe-js";
import Title from "../../Components/Title";
import { Elements } from "@stripe/react-stripe-js";
import CheckOut from "./CheckOut";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT)
const Payment = () => {
    return (
        <div>
            <Title heading={'PAYMENT NOW'}></Title>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOut></CheckOut>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;