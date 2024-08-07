import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ListTicket from './pages/listTicket';
import Contact from './pages/Contact'
import Login from './pages/Login';
import Eventslist from './pages/Eventslist';
import Events from './pages/Events'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventslist" element={<Eventslist />} />
        <Route path="/listTicket" element={<ListTicket />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event" element={<Events />}>
            <Route path=":eventId" element={<Events />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
