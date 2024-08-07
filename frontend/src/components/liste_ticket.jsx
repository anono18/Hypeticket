import React from 'react';
import { useHistory } from 'react-router-dom';

const liste_ticket = ({ tickets, onDelete, onPay, onCancel }) => {
  const history = useHistory();

  const handlePay = (ticketId) => {
    history.push(`/event/${ticketId}/pay`);
  };

  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Image de l'événement</th>
          <th>État</th>
          <th>Nombre de tickets</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td><img src={ticket.image} alt={ticket.eventName} /></td>
            <td>{ticket.status}</td>
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

export default liste_ticket;
