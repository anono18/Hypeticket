import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Events from './pages/Events';
import ListTicket from './pages/listTicket';
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/listTicket" element={<ListTicket />} />
        <Route path="/" element={<ListTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
