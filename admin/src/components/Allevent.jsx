import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Item from './Item';
import axios from 'axios';

const Allevent = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('http://localhost:4000/allevent');
            setEvents(response.data);
        };
        fetchEvents();
    }, []);

    localStorage.setItem('event', JSON.stringify(null));

    const handleAddEvent = () => {
        navigate('/addevent'); 
    };

    const handleDelete = async (id) => {
        await axios.post('http://localhost:4000/removeevent', { id });
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold'>Tous les événements</h2>
                <button 
                    className='bg-blue-500 text-white text-2xl py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400'
                    onClick={handleAddEvent}>
                    +
                </button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7'>
                {events.map(event => (
                    <Item key={event.id} {...event} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default Allevent;


