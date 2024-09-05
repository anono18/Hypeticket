// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { TbSearch, TbX } from 'react-icons/tb';


// const ReservationTable = () => {
//   const [reservations, setReservations] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch reservations from the API
//     const fetchReservations = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/reservations');
//         setReservations(response.data.reservations);  
//       } catch (err) {
//         setError(<div className='message'>Aucune réservation disponible.</div>);
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReservations();
//   }, []);



//   const handleSearch = async (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     if (term) {
//         const res = await axios.post('http://localhost:4000/searchevents', { searchTerm: term });
//         setFilteredevents(res.data);
//     } else {
//         setFilteredevents(events); // Réinitialise la liste filtrée à tous les événements si le champ de recherche est vide
//     }
// };

// const clearSearch = () => {
//     setSearchTerm('');
//     setFilteredevents(events); // Réinitialise la liste filtrée à tous les événements
// };


//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>; 
//   }

//   if (!reservations.length) {
//     return <div className='message'>Aucune réservation disponible.</div>; 
//   }

//   return (
//     <div className=" p-2 ml-2">  {/* Add left margin and padding */}
//     <div className='flex justify-center mb-4'>
//                 <div className='relative w-full max-w-lg'>
//                     <input
//                         type="text"
//                         value={searchTerm}
//                         onChange={handleSearch}
//                         placeholder="Rechercher un événement"
//                         className='p-3 pl-10 w-full border border-gray-300 rounded-full'
//                     />
//                     <TbSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
//                     {searchTerm && (
//                         <button onClick={clearSearch} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
//                             <TbX size={20} />
//                         </button>
//                     )}
//                 </div>
//             </div>
//       <h2 className="text-2xl ml-72 font-semibold mb-4">Liste des réservations</h2>
//       <table className="table-auto w-full border-collapse">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Nom Utilisateur</th>
//             <th className="border px-4 py-2">Événement</th>
//             <th className="border px-4 py-2">Quantité</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reservations.map((reservation, index) => (
//             <tr key={index}>
//               <td className="border px-4 py-2">{reservation.userName}</td> {/* User's full name */}
//               <td className="border px-4 py-2">{reservation.eventName}</td> {/* Event name */}
//               <td className="border px-4 py-2">{reservation.quantity}</td> {/* Quantity of tickets */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReservationTable;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TbSearch, TbX } from 'react-icons/tb';

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/reservations');
        setReservations(response.data.reservations);
        setFilteredReservations(response.data.reservations); // Initialize filteredReservations with all reservations
      } catch (err) {
        setError('Aucune réservation disponible.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      try {
        const res = await axios.post('http://localhost:4000/searchevent', { searchTerm: term });
        setFilteredReservations(res.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setFilteredReservations(reservations); // Réinitialise la liste filtrée à toutes les réservations si le champ de recherche est vide
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredReservations(reservations); // Réinitialise la liste filtrée à toutes les réservations
  };

  if (loading) {
    return <div className="overlay">
    <div className="loader"></div>
  </div>;
  }

  if (error) {
    return <div className='message'>{error}</div>;
  }

//   if (!filteredReservations.length) {
//     return <div className='message'>Aucune réservation disponible.</div>;
//   }

  return (
    <div className="p-2 ml-2">
      <div className='flex justify-center mb-4'>
        <div className='relative w-full max-w-lg'>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Rechercher une réservation"
            className='p-3 pl-10 w-full border border-gray-300 rounded-full'
          />
          <TbSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />
          {searchTerm && (
            <button onClick={clearSearch} className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
              <TbX size={20} />
            </button>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Liste des réservations</h2>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nom Utilisateur</th>
            <th className="border px-4 py-2">Événement</th>
            <th className="border px-4 py-2">Quantité</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{reservation.userName}</td>
              <td className="border px-4 py-2">{reservation.eventName}</td>
              <td className="border px-4 py-2">{reservation.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
