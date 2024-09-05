import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"
import plus from "../assets/plus.png"
import liste from "../assets/liste.png"
import publicImage from "../assets/public.png";

const Sidebar = () => {
  const navigate = useNavigate(); 

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
            <li className="mb-4 flex items-center">
              <Link to="/allevent" className="flex items-center">
                <img src={liste} alt="" className='w-6 h-6 mr-2' /> 
                Tous les événements
              </Link>
              
            </li><br />
            <li className="mb-4 flex items-center">
              <button onClick={addEvent} className="flex items-center text-left">
                <img src={plus} alt="" className='w-6 h-6 mr-2' />
                Ajouter un événement
              </button>
            </li><br />
            <li className='mb-4 flex items-center'> 
            <Link to="/reservations" className="flex items-center text-left">
                <img src={publicImage} alt="public image" className='w-8 h-8 mr-2' /> 
                Résèrvations
              </Link>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  );
};

export default Sidebar;
