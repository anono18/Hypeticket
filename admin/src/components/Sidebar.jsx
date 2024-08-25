import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"

const Sidebar = () => {
  const navigate = useNavigate(); // Initialisation du hook useNavigate

  const addEvent = () => {
    localStorage.setItem('event', JSON.stringify(null));
    navigate('/addevent'); // Navigation vers la route /addevent
  };

  return (
    <div className="h-screen bg-black-to-darkblue text-white w-1/5 fixed"> {/* Réduit la largeur */}
      <div className="p-4">
        {/* <div className='mx-auto max-w-[1440px] px-6 lg:px-20 flex items-center justify-center'> Ajuste le conteneur */}
          {/* <span className="bold-24 hidden xs:flex"> */}
          <img src={logo} alt="logo" className="-m-1.5 w-48 h-44 rounded-lg shadow-xl mx-auto object-cover" />
            {/* <span className="text-secondary xl:text-2xl sm:text-lg">HYPE</span>- */}
            {/* <span className="text-secondary xl:text-2xl sm:text-lg">TICKETS</span> */}
          {/* </span> */}
        {/* </div> */}
        
        <nav className="mt-10">
          <ul>
            <li className="mb-4">
              <Link to="/allevent">Tous les événements</Link>
            </li><br />
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
