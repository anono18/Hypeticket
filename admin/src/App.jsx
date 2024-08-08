import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';

export default function App() {
  return (
    <BrowserRouter>
      <main className="bg-primary text-tertiary">
        <div className="mx-auto max-w-[1500px]">
          <Navbar />
          <Admin />
        </div>
      </main>
    </BrowserRouter>
  );
}
