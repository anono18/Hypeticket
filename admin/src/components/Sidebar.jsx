import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
              <Link to="/addevent">Ajouter un événement</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
