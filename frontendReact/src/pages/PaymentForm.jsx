import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';

function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        try {
            const token = localStorage.getItem('token');  // Retrieve the token from localStorage

            if (!token) {
                alert('Vous devez être connecté pour effectuer un paiement.');
                return;
            }

            // Create the payment intent
            const response = await fetch("http://localhost:8080/payment/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,  // Send the token as authorization header
                },
                body: JSON.stringify({ amount: 1000 })  // Example amount of 1000 units (e.g., cents)
            });

            if (!response.ok) {
                throw new Error(`Erreur du serveur, statut: ${response.status}`);
            }

            const text = await response.text();
            console.log(text);

            const { clientSecret } = JSON.parse(text);
            console.log(clientSecret); 

            // Confirm the payment with the client secret
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
alert("paiement effectué avec succés");
alert ("réservation confirmée  avec succés");

            if (error) {
                setPaymentMessage(`Erreur: ${error.message}`);
            } else if (paymentIntent.status === 'succeeded') {
                setPaymentMessage('Paiement réussi!');
            }

        } catch (err) {
            console.error("Erreur lors de la requête:", err);
            setPaymentMessage("Erreur du serveur, veuillez réessayer");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Paiement</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isProcessing || !stripe}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        color: '#fff',
                        backgroundColor: '#007BFF',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        opacity: isProcessing ? '0.6' : '1',
                    }}
                >
                    {isProcessing ? 'Traitement...' : 'Payer'}
                </button>
            </form>

            
            {paymentMessage && (
                <div style={{ marginTop: '20px', color: paymentMessage.includes('réussi') ? 'green' : 'red' }}>
                    {paymentMessage}
                </div>
            )}
        </div>
    );
}

export default Payment;
