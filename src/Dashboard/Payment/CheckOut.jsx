import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import useSingleCart from "../../Hooks/useSingleCart";

const CheckOut = () => {
    const stripe = useStripe()
    const { user } = useAuth()
    const elements = useElements()
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const [cart] = useSingleCart()
    const axiousSecure = useAxios()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiousSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiousSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error payment', error);
            setError(error.message)
        }
        else {
            console.log('payment method', paymentMethod);
            setError('');
        }
        //confirm
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymus',
                    name: user?.displayName || 'anonymus'
                }
            }
        })

        if (confirmError) {
            console.log('Confirm Error');
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4'
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            ></CardElement>
            <button className="btn btn-info my-5" type="submit" disabled={!stripe || !clientSecret}>Payment</button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className='text-green-600'>Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckOut;