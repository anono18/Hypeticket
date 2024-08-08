import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { faCalendarDays, faClock, faLocationDot, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../components/Modal';

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

const EventDetails = ({ events, onUpdate }) => {
    const { id } = useParams();
    const event = events.find(event => event.id === parseInt(id)); // Utilisez parseInt pour la comparaison

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [valueToEdit, setValueToEdit] = useState('');

    localStorage.setItem('event', JSON.stringify(event));

    if (!event) {
        return <p>Événement non trouvé</p>;
    }

    const handleUpdateEvent = async (eventId, fieldToEdit, newValue) => {
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    [fieldToEdit]: newValue,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text(); // Obtenez le texte brut de la réponse en cas d'erreur
                throw new Error(`Failed to update event: ${errorText}`);
            }

            const updatedEvent = await response.json();
            onUpdate(eventId, fieldToEdit, newValue);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };


    const handleEdit = (field, currentValue) => {
        setFieldToEdit(field);
        setValueToEdit(currentValue);
        setIsModalOpen(true);
    };

    const handleSave = (newValue) => {
        handleUpdateEvent(event.id, fieldToEdit, newValue);
        setIsModalOpen(false);
    };

    return (
        <div className='p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto'>
            <img src={event.image} alt={event.name} className='rounded-lg drop-shadow-xl h-64 w-full object-cover mb-4' />
            <h2 className='text-2xl font-bold mb-4'>{event.name}</h2>

            {Object.keys(fieldTypes).map((field) => (
                <div className='flex items-center mb-2' key={field}>
                    <p className='font-semibold'>
                        {field === 'ticket_Price' && 'Prix du Ticket: '}
                        {field === 'ticket_Availability' && 'Disponibilité des Tickets: '}
                        {field === 'eventWebsite' && 'Site Web de l\'Événement: '}
                        {event[field] || ''}
                    </p>
                </div>
            ))}

            <Link  to={`/addevent`} >
                <div>
                    Modifier
                </div>
            </Link>
            
            {isModalOpen && (
                <Modal
                    fieldToEdit={fieldToEdit}
                    currentValue={valueToEdit}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                    fieldType={fieldTypes[fieldToEdit]} // Passe le type de champ à la modal
                />
            )}

        </div>
    );
};

export default EventDetails;
