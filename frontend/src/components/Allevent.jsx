import React, { useState, useEffect } from 'react';
import Item from './Item';
import axios from 'axios';

const Allevent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:4000/allevent');
                setEvents(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des événements:', error);
            }
        };
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.post('http://localhost:4000/removeevent', { id });
            setEvents(events.filter(event => event.id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement:', error);
        }
    };

    return (
        <div className='p-4'>
            <h2 className='text-2xl font-bold mb-4'>Tous les événements</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
                {events.map(event => (
                    <div key={event.id} className='bg-white p-1 rounded-lg shadow-lg'>
                        <Item {...event} onDelete={handleDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Allevent;
