// import React, { useState, useEffect } from 'react';
// import Item from './Item';
// import axios from 'axios';
// import { TbSearch, TbX } from 'react-icons/tb';

// const Allevent = () => {
//     const [events, setEvents] = useState([]);
//     const [filteredevents, setFilteredevents] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         const fetchEvents = async () => {
//             const response = await axios.get('http://localhost:4000/allevent');
//             setEvents(response.data);
//             setFilteredevents(response.data); // Mise à jour de filteredevents avec les événements récupérés
//         };
//         fetchEvents();
//     }, []);

//     const handleDelete = async (id) => {
//         await axios.post('http://localhost:4000/removeevent', { id });
//         // Met à jour les événements et les événements filtrés après suppression
//         setEvents(events.filter(event => event.id !== id));
//         setFilteredevents(filteredevents.filter(event => event.id !== id));
//     };

//     const handleSearch = async (e) => {
//         const term = e.target.value;
//         setSearchTerm(term);
//         if (term) {
//             const res = await axios.post('http://localhost:4000/searchevents', { searchTerm: term });
//             setFilteredevents(res.data);
//         } else {
//             setFilteredevents(events);
//         }
//     };

//     const clearSearch = async () => {
//         setSearchTerm('');
//         setFilteredevents(events); // Réinitialise la liste filtrée à tous les événements
//     };

//     return (
//         <div className='p-4'>
//             {/* Rechercher */}
//             <div className='flex justify-center mb-4'>
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

//             <h2 className='text-2xl font-bold mb-4'>Tous les événements</h2>
//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
//                 {filteredevents.map(event => (
//                     <div key={event.id} className='bg-white p-1 rounded-lg shadow-lg'>
//                         <Item {...event} onDelete={handleDelete} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Allevent;


import React, { useState, useEffect } from 'react';
import Item from './Item';
import axios from 'axios';
import { TbSearch, TbX } from 'react-icons/tb';

const Allevent = () => {
    const [events, setEvents] = useState([]);
    const [filteredevents, setFilteredevents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await axios.get('http://localhost:4000/allevent');
            setEvents(response.data);
            setFilteredevents(response.data); // Mise à jour de filteredevents avec les événements récupérés
        };
        fetchEvents();
    }, []);

    // const handleDelete = async (id) => {
    //     await axios.post('http://localhost:4000/removeevent', { id });
    //     // Met à jour les événements et les événements filtrés après suppression
    //     setEvents(events.filter(event => event.id !== id));
    //     setFilteredevents(filteredevents.filter(event => event.id !== id));
    // };

    const handleSearch = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term) {
            const res = await axios.post('http://localhost:4000/searchevents', { searchTerm: term });
            setFilteredevents(res.data);
        } else {
            setFilteredevents(events); // Réinitialise la liste filtrée à tous les événements si le champ de recherche est vide
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setFilteredevents(events); // Réinitialise la liste filtrée à tous les événements
    };

    return (
        <div className='p-4'>
            {/* Rechercher */}
            <div className='flex justify-center mb-4'>
                <div className='relative w-full max-w-lg'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Rechercher un événement"
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

            <h2 className='text-2xl font-bold mb-4'>Tous les événements</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'>
                {filteredevents.map(event => (
                    <div key={event.id} className='bg-white p-1 rounded-lg shadow-lg'>
                        <Item {...event}  />{/* onDelete={handleDelete} */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Allevent;

