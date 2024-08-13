import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const addEvent = () => {
    localStorage.setItem('event', JSON.stringify(null));
    navigate('/addevent'); // Navigation vers la route /addevent
  };

  return (
    <div className="h-screen bg-black-to-darkblue text-white w-1/5 fixed"> {/* Réduit la largeur */}
      <div className="p-4">
        <div className='mx-auto max-w-[1440px] px-6 lg:px-20 flex items-center justify-center'> {/* Ajuste le conteneur */}
          <span className="bold-24 hidden xs:flex">
            <span className="text-secondary text-xl">HYPE</span>-{/* Diminue la taille du texte */}
            <span className="text-secondary text-xl">TICKETS</span>
          </span>
        </div>
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
