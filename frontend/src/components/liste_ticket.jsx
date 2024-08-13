import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListeTicket = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('/myReservations', {
          headers: {
            'auth-token': localStorage.getItem('token'), // Si vous utilisez un token pour l'authentification
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTickets(data.tickets); // Assurez-vous que la réponse du backend contient un champ 'tickets'
      } catch (error) {
        console.error('Erreur lors de la récupération des tickets :', error);
      }
    };

    fetchTickets();
  }, []);

  const handlePay = (ticketId) => {
    navigate(`/event/${ticketId}/pay`);
  };

  const onCancel = (ticketId) => {
    // Logique pour annuler un ticket (à implémenter)
    console.log(`Annulation du ticket ${ticketId}`);
  };

  const onDelete = (ticketId) => {
    // Logique pour supprimer un ticket (à implémenter)
    console.log(`Suppression du ticket ${ticketId}`);
  };

  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Image de l'événement</th>
          <th>Nom de l'événement</th>
          <th>Type de ticket</th>
          <th>Nombre de tickets</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td><img src={ticket.eventImage} alt={ticket.eventName} className="event-image" /></td>
            <td>{ticket.eventName}</td>
            <td>{ticket.ticketType}</td>
            <td>{ticket.quantity}</td>
            <td>
              {ticket.status === 'payé' ? (
                <button onClick={() => onDelete(ticket.id)} className="delete-button">🗑️</button>
              ) : (
                <div>
                  <button onClick={() => onCancel(ticket.id)} className="cancel-button">❌ Annuler</button>
                  <button onClick={() => handlePay(ticket.id)} className="pay-button">✔️ Payer</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListeTicket;
