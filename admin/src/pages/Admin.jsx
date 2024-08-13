import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Allevent from '../components/Allevent';
import Addevent from '../components/Addevent';
import Sidebar from '../components/Sidebar';
import EventDetails from '../pages/EventDetails';
import axios from 'axios';
import AddTickets from '../components/AddTickets ';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les événements depuis l'API
  const fetchEvents = async () => {
    const response = await fetch('http://localhost:4000/allevent');
    const data = await response.json();
    setEvents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fonction pour mettre à jour un événement
  const handleUpdate = (eventId, field, newValue) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, [field]: newValue } : event
      )
    );
  };

  const handleCreateEvent = async (data) => {
    await axios.post('http://localhost:4000/addevent', data);
    alert('Événement ajouté!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          Chargement des événements...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-64">
        <div className='mx-auto max-w-[1440px] px-6 lg:px-20 flex flex-col items-center bg-white py-2 ring-1 rounded-lg'>
          <h2 className="text-xl font-bold text-center">Admin Dashboard</h2>
        </div>

        <Routes>
          <Route path="/allevent" element={<Allevent events={events} />} />
          <Route path="/addevent" element={<Addevent />} />
          <Route path="/add-tickets/:eventId" element={<AddTickets />} />
          <Route path="/" element={<h2 className="text-2xl font-bold mb-4">Bienvenue dans le tableau de bord de l'admin</h2>} />
          <Route path="/event/:id" element={<EventDetails events={events} onUpdate={handleUpdate} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
