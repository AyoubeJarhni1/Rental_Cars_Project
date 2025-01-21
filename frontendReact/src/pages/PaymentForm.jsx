import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState('');
   
    const idUser = localStorage.getItem("idUser");
            console.log("user",idUser);
    const location = useLocation();
    const { reservationId, car, totalPrice } = location.state || {};
    console.log("price Total",totalPrice);
    console.log("CAR Id",car.id);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) return;
    
        setIsProcessing(true);
    
        try {
            const token = localStorage.getItem('token');
    
            if (!token) {
                alert('Vous devez être connecté pour effectuer un paiement.');
                return;
            }
    
          
            const paymentIntentResponse = await fetch("http://localhost:8080/payment/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ amount: totalPrice }),
            });
    
            if (!paymentIntentResponse.ok) {
                throw new Error(`Erreur du serveur, statut: ${paymentIntentResponse.status}`);
            }
    
            const { clientSecret } = await paymentIntentResponse.json();
            console.log("client secret",clientSecret);
    
      
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
    
            if (error) {
                setPaymentMessage(`Erreur: ${error.message}`);
                return;
            }
    
            if (paymentIntent.status === 'succeeded') {
                setPaymentMessage('Paiement réussi!');
    
                const reservationId = localStorage.getItem("reservationId");
                if (!reservationId) {
                    throw new Error("L'ID de la réservation est introuvable.");
                }
    
                
                const statusUpdateResponse = await fetch(`http://localhost:8080/reservation/status/${reservationId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({ newStatus: 'CONFIRMÉ' }),
                });
    
                if (!statusUpdateResponse.ok) {
                    throw new Error(`Erreur de mise à jour du statut de la réservation: ${await statusUpdateResponse.text()}`);
                }
    
                alert("Réservation confirmée avec succès");
    
               
                const ticketResponse = await fetch("http://localhost:8080/api/tickets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        reservationId,
                        priceTotal: totalPrice,
                    }),
                });
    
                if (!ticketResponse.ok) {
                    throw new Error(`Erreur lors de la génération du ticket: ${await ticketResponse.text()}`);
                }
    
               
                const pdfBlob = await ticketResponse.blob();
                const url = window.URL.createObjectURL(pdfBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ticket_${reservationId}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
    
                alert("Ticket généré et téléchargé avec succès !");
            } else {
                setPaymentMessage("Le paiement a échoué ou n'a pas été confirmé.");
            }
    
        } catch (err) {
            console.error("Erreur lors de la requête:", err);
            setPaymentMessage("Erreur du serveur, veuillez réessayer.");
        } finally {
            setIsProcessing(false);
        }
    };
    
    
    

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
            <div className="w-full  max-w-2/3 bg-white shadow-lg rounded-lg p-6">
            <img src="/logo1.jpg" alt="Logo" className="h-16 w-20 rounded-lg mx-auto" />
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
        </div>
    );
}

export default Payment;
