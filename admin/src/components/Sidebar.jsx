import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const addEvent = () => {
    localStorage.setItem('event', JSON.stringify(null));
    navigate('/addevent'); // Navigation vers la route /addevent
  };
  return (
    <div className="h-screen bg-black-to-darkblue text-white w-1/4 fixed">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="mt-10">
          <ul>
            <li className="mb-4">
              <Link to="/allevent">Tous les événements</Link>
            </li>
            <li className="mb-4">
              <button onClick={addEvent} className="text-left">
                Ajouter un événement
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
