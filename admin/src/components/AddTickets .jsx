import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTickets = () => {
  const { eventId } = useParams(); // Récupérer l'ID de l'événement depuis l'URL
  const [tickets, setTickets] = useState([{ type: '', price: '', availability: '' }]);
  const navigate = useNavigate();

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const newTickets = [...tickets];
    newTickets[index][name] = value;
    setTickets(newTickets);
  };

  const addTicket = () => {
    setTickets([...tickets, { type: '', price: '', availability: '' }]);
  };

  const removeTicket = (index) => {
    const newTickets = tickets.filter((_, i) => i !== index);
    setTickets(newTickets);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     await axios.post(`http://localhost:4000/add-tickets/${eventId}`, { tickets });
  //     alert('Tickets ajoutés avec succès!');
  //     navigate('/'); // Redirection vers la page d'accueil ou une autre page souhaitée
  //   } catch (error) {
  //     console.error('Erreur lors de l\'ajout des tickets:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Sending data:', { tickets });

    try {
        await axios.post(`http://localhost:4000/add-tickets/${eventId}`, { tickets });
        alert('Tickets ajoutés avec succès!');
        navigate('/'); // Redirection vers la page d'accueil ou une autre page souhaitée
    } catch (error) {
        console.error('Erreur lors de l\'ajout des tickets:', error);
    }
};



  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">Add Tickets</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {tickets.map((ticket, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <input
              type="text"
              name="type"
              placeholder="Ticket Type"
              value={ticket.type}
              onChange={(e) => handleTicketChange(index, e)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              name="price"
              placeholder="Ticket Price"
              value={ticket.price}
              onChange={(e) => handleTicketChange(index, e)}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="number"
              name="availability"
              placeholder="Ticket Availability"
              value={ticket.availability}
              onChange={(e) => handleTicketChange(index, e)}
              className="border border-gray-300 rounded-lg p-2"
            />
            {tickets.length > 1 && (
              <button
                type="button"
                onClick={() => removeTicket(index)}
                className="text-red-500"
              >
                Remove Ticket
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addTicket}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg"
        >
          Add Another Ticket
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Save Tickets
        </button>
      </form>
    </div>
  );
};

export default AddTickets;
