import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Allevent from '../components/Allevent';
import Addevent from '../components/Addevent';
import Sidebar from '../components/Sidebar';
import EventDetails from '../pages/EventDetails';
import axios from 'axios';


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
    alert('Evenement a été ajouté!');
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
    <div className="flex">
      <Sidebar />
      <div className="ml-[25%] w-[75%] p-4">
        <Routes>
          <Route path="/allevent" element={<Allevent events={events} />} />
          <Route path="/addevent" element={<Addevent/>} />
          <Route path="/" element={<h2 className="text-2xl font-bold mb-4">Bienvenue dans le tableau de bord de l'admin</h2>} />
          <Route path="/event/:id" element={<EventDetails events={events} onUpdate={handleUpdate} />} />
        </Routes>
      </div>
    </div>
  );
};
 
export default Admin;