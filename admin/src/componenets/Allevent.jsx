import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from './Item';



const Allevent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:4000/allevent');
      setEvents(response.data);
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    await axios.post('http://localhost:4000/removeevent', { id });
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Tous les événements</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {events.map(event => (
          <Item key={event.id} {...event} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Allevent;
