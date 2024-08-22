import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetails = ({ events = [] }) => {
    const fieldTypes = {
        name: 'text',
        category: 'text',
        description: 'text',
        ticket_Price: 'number',
        date_event: 'date',
        timeEvent: 'text',
        lieu: 'text',
        ticket_Availability: 'number',
        organizer: 'text',
        supportContact: 'number',
        eventWebsite: 'url',
    };
    const { id } = useParams();
    const event = events.find(event => event.id === parseInt(id)); 

    const [ticketDetails, setTicketDetails] = useState({});

    useEffect(() => {
        if (event) {
            fetch(`/api/event/${event.id}/tickets`)
                .then(response => response.json())
                .then(data => setTicketDetails(data))
                .catch(error => console.error('Error fetching ticket details:', error));
        }
    }, [event]);

    if (!event) {
        return <p>Événement non trouvé</p>;
    }

    return (
        <section>
            <br /><br />

            <div className=' p-4 bg-white border text-dark shadow-xl rounded-xl'>
                <h3 className='font-semibold mb-2'>Détails des Tickets</h3>
                {Object.entries(ticketDetails).length > 0 ? (
                    Object.entries(ticketDetails).map(([type, availability]) => (
                        <div key={type} className='bg-gray-100 border border-gray-300 p-4 rounded-lg mb-2'>
                            <p className='font-semibold'>{type}</p>
                            <p>Nombre de tickets restants: {availability}</p>
                        </div>
                    ))
                ) : (
                    <p>Aucun ticket disponible</p>
                )}
            </div>
            <br />
            <div className='p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto'>
                <img src={event.image} alt={event.name} className='rounded-lg drop-shadow-xl h-64 w-full object-cover mb-4' />
                <h2 className='text-2xl font-bold mb-4'>{event.name}</h2>

                {Object.keys(fieldTypes).map((field) => (
                    <div className='flex items-center mb-2' key={field}>
                        <p className='font-semibold'>
                            {field === 'ticket_Price' && 'Prix du Ticket: '}
                            {field === 'ticket_Availability' && 'Disponibilité des Tickets: '}
                            {field === 'eventWebsite' && 'Site Web de l\'Événement: '}
                            {field === 'date_event' && 'Date de l\'Événement: '}
                            {field === 'timeEvent' && 'Heure de l\'Événement: '}
                            {field === 'lieu' && 'Lieu: '}
                            {field === 'organizer' && 'Organisateur: '}
                            {field === 'supportContact' && 'Contact Support: '}
                            {event[field] || ''}
                        </p>
                    </div>
                ))}


                <br /><br />
                <Link to={`/addevent`}>
                    <div className='bg-blue-950 text-center text-white py-2 px-4 rounded-lg flex justify-center items-center'>
                        Modifier
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default EventDetails;

