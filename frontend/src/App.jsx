import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Events from './pages/Events';
import ListTicket from './pages/listTicket';
import Contact from './pages/Contact'
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/listTicket" element={<ListTicket />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
