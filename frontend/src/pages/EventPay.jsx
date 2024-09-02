import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EventPay = () => {
  const [event, setEvent] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('TMoney');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de l'événement

  useEffect(() => {
    // Récupérer les détails de l'événement et des tickets
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/events/${id}`);
        setEvent(response.data);
        // Supposons que vous ayez un endpoint pour obtenir les détails des tickets
        const ticketResponse = await axios.get(`http://localhost:4000/tickets/${id}`);
        setTicketDetails(ticketResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'événement :', error);
        setMessage('Erreur lors de la récupération des détails de l\'événement.');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handlePayment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('auth-token');

    try {
      const response = await axios.post('http://localhost:4000/simulate-payment', {
        eventId: id,
        ticketDetails,
        securityCode,
        paymentMethod,
        phoneNumber,
        amount
      }, {
        headers: { 'auth-token': token }
      });

      setMessage(response.data.message);
      // Attendre 2 secondes avant de rediriger pour que l'utilisateur puisse voir le message
      setTimeout(() => {
        navigate('/liste-ticket'); // Redirige vers la page ListeTicket
      }, 2000);
    } catch (error) {
      console.error('Erreur lors du paiement :', error);
      setMessage(error.response ? error.response.data.message : 'Erreur lors du paiement.');
    }
  };

  if (loading) {
    return (
      <div className="overlay">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="event-pay">
      <h1>Paiement pour l'événement</h1>
      {event && (
        <div>
          <h2>{event.name}</h2>
          <img src={event.image} alt={event.name} />
        </div>
      )}
      <form onSubmit={handlePayment}>
        <label>
          Méthode de paiement:
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="TMoney">TMoney</option>
            <option value="Flooz">Flooz</option>
          </select>
        </label>
        <label>
          Numéro de téléphone:
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </label>
        <label>
          Montant:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Code de sécurité:
          <input
            type="text"
            value={securityCode}
            onChange={(e) => setSecurityCode(e.target.value)}
            required
          />
        </label>
        <button type="submit">Payer</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default EventPay;
