import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Allevent from '../components/Allevent';
import Addevent from '../components/Addevent';
import Sidebar from '../components/Sidebar';

const Admin = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="ml-[25%] w-[75%] p-4">
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
