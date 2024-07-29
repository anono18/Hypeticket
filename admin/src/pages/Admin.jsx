import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Allevent from '../components/Allevent';
import Addevent from '../components/Addevent';


const Admin = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="ml-1/4 w-3/4 p-4">
          <Routes>
            <Route path="/allevent" element={<Allevent />} /> 
            <Route path="/addevent" element={<Addevent />} /> 
            <Route path="/" element={<h2 className="text-2xl font-bold mb-4">Bienvenue dans le tableau de bord de l'admin</h2>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default Admin;
