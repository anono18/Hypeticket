import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ListeTicket = ({ id }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/myreservations', {
          headers: { 'auth-token': token },
        });

        const data = response.data;
        const formattedTickets = data.map((reservation) => {
          if (!reservation.ticket || !reservation.ticket.event) {
            return null;
          }

          return {
            id: reservation._id,
            eventImage: reservation.ticket.event.image || 'default_image_url', 
            eventName: reservation.ticket.event.name || 'Événement inconnu',
            ticketType: reservation.ticket.type || 'Type inconnu',
            quantity: reservation.quantity || 0,
            price: reservation.ticket.price || 0,
            total: (reservation.quantity || 0) * (reservation.ticket.price || 0), 
          };
        }).filter(ticket => ticket !== null);

        setTickets(formattedTickets);
      } catch (error) {
        console.error('Erreur lors de la récupération des tickets :', error);
        setError('Erreur lors de la récupération des tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handlePay = (id) => {
    navigate(`/evenpay`); 
  };

  const onCancel = async (ticketId) => {
    if (window.confirm(`Voulez-vous vraiment annuler le ticket ${ticketId} ?`)) {
      try {
        const token = localStorage.getItem('auth-token');
        await axios.delete(`http://localhost:4000/reservations/${ticketId}`, {
          headers: { 'auth-token': token },
        });
        setTickets(tickets.filter(ticket => ticket.id !== ticketId));
        console.log(`Annulation du ticket ${ticketId}`);
      } catch (error) {
        console.error('Erreur lors de la suppression du ticket :', error);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="message">
        <p>Veuillez vous connecter pour voir la liste de vos réservations.</p>
      </div>
    );
  }
  if(tickets.length === 0){
    return(
      <div className="message">
        <p>Vous n'avez pas de réservation.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="overlay">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {tickets.length === 0 ? (
        <span className=''>Vous n'avez pas de réservation</span>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Image de l'événement</th>
              <th>Nom de l'événement</th>
              <th>Type de ticket</th>
              <th>Nombre de tickets</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='te'>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>
                  <img
                    src={ticket.eventImage}
                    alt={ticket.eventName}
                    className="event-image"
                  />
                </td >
                <td className="text-center">{ticket.eventName}</td>
                <td className="text-center">{ticket.ticketType}</td>
                <td className="text-center">{ticket.quantity}</td>
                <td className="text-center">
                  {ticket.total} FCFA
                </td>
                <td className="flex">
                  <button
                    onClick={() => onCancel(ticket.id)}
                    className="cancel-button"
                  >
                    ❌
                  </button>
                  {/* <button
                    onClick={() => handlePay(id)}
                    className="pay-button"
                  >
                    ✔️
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}
    </div>
  );
};

export default ListeTicket;



