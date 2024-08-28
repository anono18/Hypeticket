// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';

// const EventDetails = ({ events = [] }) => {
//     const fieldTypes = {
//         name: 'text',
//         category: 'text',
//         description: 'text',
//         ticket_Price: 'number',
//         date_event: 'date',
//         timeEvent: 'text',
//         lieu: 'text',
//         ticket_Availability: 'number',
//         organizer: 'text',
//         supportContact: 'number',
//         eventWebsite: 'url',
//     };
//     const { id } = useParams();
//     const event = events.find(event => event.id === parseInt(id));

//     const [ticketDetails, setTicketDetails] = useState({});

//     // useEffect(() => {
//     //     if (event) {
//     //       fetch(`/event/${event.id}/tickets`)
//     //             .then(response => response.json())
//     //             .then(data => {
//     //                 setTicketDetails(data);
//     //                 console.log("Ticket Details Fetched:", data);
//     //                 console.log("Ticket Details Fetched 1:", ticketDetails);
                    
//     //             })
//     //             .catch(error => console.error('Error fetching ticket details:', error));
//     //         // console.log("tic",tic)
//     //         // setTicketDetails(tic)
//     //         console.log("tic_det",ticketDetails)
//     //     }
//     // }, [event]);

//     useEffect(() => {
//         if (event) {
//             fetch(`/event/${event.id}/tickets`)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     setTicketDetails(data);
//                     console.log("Détails des tickets récupérés :", data);
//                 })
//                 .catch(error => console.error('Erreur lors de la récupération des détails des tickets :', error));
//         }
//     }, [event]);
    

//     const handleReserve = async (ticketId, quantity) => {
//         try {
//             const response = await axios.post('/reserve', { ticketId, quantity });
//             if (response.status === 200) {
//                 const updatedAvailability = response.data.updatedAvailability;
//                 setTicketDetails(prevDetails => ({
//                     ...prevDetails,
//                     [ticketId]: updatedAvailability
//                 }));
//             }
//         } catch (error) {
//             console.error('Erreur lors de la réservation:', error);
//         }
//     };



//     if (!event) {
//         return <p>Événement non trouvé</p>;
//     }

//     return (
//         <section>
//             <br /><br />

//             <div className='p-4 bg-white border text-dark shadow-xl rounded-xl'>
//                 <h3 className='font-semibold mb-2'>Détails des Tickets</h3>
//                 {Object.entries(ticketDetails).length > 0 ? (
//                     Object.entries(ticketDetails).map(([type, availability]) => (
//                         <div key={type} className='bg-gray-100 border border-gray-300 p-4 rounded-lg mb-2'>
//                             <p className='font-semibold'>{type}</p>
//                             <p>Nombre de tickets restants: {availability}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Aucun ticket disponible</p>
//                 )}
//             </div>
//             <br />
//             <div className='p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto'>
//                 <img src={event.image} alt={event.name} className='rounded-lg drop-shadow-xl h-64 w-full object-cover mb-4' />
//                 <h2 className='text-2xl font-bold mb-4'>{event.name}</h2>

//                 {Object.keys(fieldTypes).map((field) => (
//                     <div className='flex items-center mb-2' key={field}>
//                         <p className='font-semibold'>
//                             {field === 'ticket_Price' && 'Prix du Ticket: '}
//                             {field === 'ticket_Availability' && 'Disponibilité des Tickets: '}
//                             {field === 'eventWebsite' && 'Site Web de l\'Événement: '}
//                             {field === 'date_event' && 'Date de l\'Événement: '}
//                             {field === 'timeEvent' && 'Heure de l\'Événement: '}
//                             {field === 'lieu' && 'Lieu: '}
//                             {field === 'organizer' && 'Organisateur: '}
//                             {field === 'supportContact' && 'Contact Support: '}
//                             {event[field] || ''}
//                         </p>
//                     </div>
//                 ))}


//                 <br /><br />
//                 <Link to={`/addevent`}>
//                     <div className='bg-blue-950 text-center text-white py-2 px-4 rounded-lg flex justify-center items-center'>
//                         Modifier
//                     </div>
//                 </Link>
//             </div>
//         </section>
//     );
// };

// export default EventDetails;



// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';

// const EventDetails = ({ events = [] }) => {
//     const fieldTypes = {
//         name: 'text',
//         category: 'text',
//         description: 'text',
//         ticket_Price: 'number',
//         date_event: 'date',
//         timeEvent: 'text',
//         lieu: 'text',
//         ticket_Availability: 'number',
//         organizer: 'text',
//         supportContact: 'number',
//         eventWebsite: 'url',
//     };
//     const { id } = useParams();
//     const event = events.find(event => event.id === parseInt(id));

//     const [ticketDetails, setTicketDetails] = useState({});
//     const [reservedTickets, setReservedTickets] = useState({});

//     useEffect(() => {
//         if (event) {
//             // Fetch ticket details
//             fetch(`/event/${event.id}/tickets`)
//                 .then(response => response.json())
//                 .then(data => setTicketDetails(data))
//                 .catch(error => console.error('Error fetching ticket details:', error));

//             // Fetch reserved tickets
//             fetch(`/reservations/${event.id}`)
//                 .then(response => response.json())
//                 .then(data => setReservedTickets(data))
//                 .catch(error => console.error('Error fetching reserved tickets:', error));
//         }
//     }, [event]);

//     const handleReserve = async (ticketId, quantity) => {
//         try {
//             const response = await axios.post('/reserve-tickets', { eventId: event.id, ticketType: ticketId, quantity });
//             if (response.status === 200) {
//                 const updatedAvailability = response.data.updatedAvailability;
//                 setTicketDetails(prevDetails => ({
//                     ...prevDetails,
//                     [ticketId]: updatedAvailability
//                 }));
//             }
//         } catch (error) {
//             console.error('Erreur lors de la réservation:', error);
//         }
//     };

//     if (!event) {
//         return <p>Événement non trouvé</p>;
//     }

//     return (
//         <section>
//             <br /><br />
//             <div className='p-4 bg-white border text-dark shadow-xl rounded-xl'>
//                 <h3 className='font-semibold mb-2'>Tickets Réservés</h3>
//                 {Object.entries(reservedTickets).length > 0 ? (
//                     Object.entries(reservedTickets).map(([type, quantity]) => (
//                         <div key={type} className='bg-gray-100 border border-gray-300 p-4 rounded-lg mb-2'>
//                             <p className='font-semibold'>{type}</p>
//                             <p>Nombre de tickets réservés: {quantity}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Aucune réservation trouvée</p>
//                 )}
//             </div>

//             <br />
//             <div className='p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto'>
//                 <img src={event.image} alt={event.name} className='rounded-lg drop-shadow-xl h-64 w-full object-cover mb-4' />
//                 <h2 className='text-2xl font-bold mb-4'>{event.name}</h2>

                // {Object.keys(fieldTypes).map((field) => (
                //     <div className='flex items-center mb-2' key={field}>
                //         <p className='font-semibold'>
                //             {field === 'ticket_Price' && 'Prix du Ticket: '}
                //             {field === 'ticket_Availability' && 'Disponibilité des Tickets: '}
                //             {field === 'eventWebsite' && 'Site Web de l\'Événement: '}
                //             {field === 'date_event' && 'Date de l\'Événement: '}
                //             {field === 'timeEvent' && 'Heure de l\'Événement: '}
                //             {field === 'lieu' && 'Lieu: '}
                //             {field === 'organizer' && 'Organisateur: '}
                //             {field === 'supportContact' && 'Contact Support: '}
                //             {event[field] || ''}
                //         </p>
                //     </div>
                // ))}

//                 <br /><br />
                // <Link to={`/addevent`}>
                //     <div className='bg-blue-950 text-center text-white py-2 px-4 rounded-lg flex justify-center items-center'>
                //         Modifier
                //     </div>
                // </Link>
//             </div>
//         </section>
//     );
// };

// export default EventDetails;




// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EventDetails = ({ events = [] }) => {
//     const { id } = useParams();
//     const event = events.find(event => event.id === parseInt(id));
//     const navigate = useNavigate();

//     const [ticketDetails, setTicketDetails] = useState({});

//     useEffect(() => {
//         if (event) {
//             axios.get(`/event/${event.id}/tickets`)
//                 .then(response => setTicketDetails(response.data))
//                 .catch(error => console.error('Error fetching ticket details:', error));
//         }
//     }, [event]);

//     const handleReserve = async (ticketId, quantity) => {
//         try {
//             const response = await axios.post('/reserve', { ticketId, quantity });
//             if (response.status === 200) {
//                 const updatedAvailability = response.data.updatedAvailability;
//                 setTicketDetails(prevDetails => ({
//                     ...prevDetails,
//                     [ticketId]: updatedAvailability
//                 }));
//             }
//         } catch (error) {
//             console.error('Erreur lors de la réservation:', error);
//         }
//     };

//     if (!event) {
//         return <p>Événement non trouvé</p>;
//     }

//     const handleEditEvent = () => {
//         navigate(`/addevent`, { state: { event } });
//     };

//     const fieldLabels = {
//         // ticket_Price: 'Prix du Ticket',
//         // ticket_Availability: 'Disponibilité des Tickets',
//         // eventWebsite: 'Site Web de l\'Événement',
//         // dateEvent: 'Date de l\'Événement',
//         // timeEvent: 'Heure de l\'Événement',
//         // lieu: 'Lieu',
//         // organizer: 'Organisateur',
//         // supportContact: 'Contact Support'
//     };

//     return (
//         <section>
//             <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mx-auto">
//                 <img 
//                     src={event.image} 
//                     alt={event.name} 
//                     className="rounded-lg drop-shadow-xl h-64 w-full object-cover mb-4" 
//                 />
//                 <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
                
//                 {Object.keys(fieldLabels).map((field) => (
//                     <div className='flex items-center mb-2' key={field}>
//                         <p className='font-semibold'>
//                             {fieldLabels[field]}: {event[field] || 'N/A'}
//                         </p>
//                     </div>
//                 ))}

//                 <button
//                     onClick={handleEditEvent}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
//                 >
//                    VOIR TOUS LES DETAILS / Modifier l'événement
//                 </button>
//             </div>
//         </section>
//     );
// };

// export default EventDetails;



// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EventDetails = ({ events = [] }) => {
//     const { id } = useParams();
//     const event = events.find(event => event.id === parseInt(id));
//     const navigate = useNavigate();

//     const [ticketDetails, setTicketDetails] = useState({});

//     useEffect(() => {
//         if (event) {
//             axios.get(`/event/${event.id}/tickets`)
//                 .then(response => setTicketDetails(response.data))
//                 .catch(error => console.error('Error fetching ticket details:', error));
//         }
//     }, [event]);

//     const handleReserve = async (ticketId, quantity) => {
//         try {
//             const response = await axios.post('/reserve', { ticketId, quantity });
//             if (response.status === 200) {
//                 const updatedAvailability = response.data.updatedAvailability;
//                 setTicketDetails(prevDetails => ({
//                     ...prevDetails,
//                     [ticketId]: updatedAvailability
//                 }));
//             }
//         } catch (error) {
//             console.error('Erreur lors de la réservation:', error);
//         }
//     };

//     if (!event) {
//         return <p>Événement non trouvé</p>;
//     }

//     const handleEditEvent = () => {
//         navigate(`/addevent`, { state: { event } });
//     };

//     const fieldLabels = {
//         // ticket_Price: 'Prix du Ticket',
//         // ticket_Availability: 'Disponibilité des Tickets',
//         // eventWebsite: 'Site Web de l\'Événement',
//         // dateEvent: 'Date de l\'Événement',
//         // timeEvent: 'Heure de l\'Événement',
//         // lieu: 'Lieu',
//         // organizer: 'Organisateur',
//         // supportContact: 'Contact Support'
//     };

//     return (
//         <section>
//             <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mt-6 mx-auto">
//                 <img 
//                     src={event.image} 
//                     alt={event.name} 
//                     className="rounded-lg drop-shadow-xl h-64 w-full object-cover mb-4" 
//                 />
//                 <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
                
//                 {Object.keys(fieldLabels).map((field) => (
//                     <div className='flex items-center mb-2' key={field}>
//                         <p className='font-semibold'>
//                             {fieldLabels[field]}: {event[field] || 'N/A'}
//                         </p>
//                     </div>
//                 ))}

//                 <button
//                     onClick={handleEditEvent}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
//                 >
//                    VOIR TOUS LES DETAILS / Modifier l'événement
//                 </button>
//             </div>
//         </section>
//     );
// };

// export default EventDetails;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const EventDetails = ({ events = [] }) => {
//     const { id } = useParams();
//     const event = events.find(event => event.id === parseInt(id));
//     const navigate = useNavigate();

//     const [ticketDetails, setTicketDetails] = useState({});

//     useEffect(() => {
//         if (event) {
//             axios.get(`/event/${event.id}/tickets`)
//                 .then(response => setTicketDetails(response.data))
//                 .catch(error => console.error('Erreur lors de la récupération des détails des tickets :', error));
//         }
//     }, [event]);

//     const handleReserve = async (ticketId, quantity) => {
//         try {
//             const response = await axios.post('/reserve', { ticketId, quantity });
//             if (response.status === 200) {
//                 const updatedAvailability = response.data.updatedAvailability;
//                 setTicketDetails(prevDetails => ({
//                     ...prevDetails,
//                     [ticketId]: updatedAvailability
//                 }));
//             }
//         } catch (error) {
//             console.error('Erreur lors de la réservation :', error);
//         }
//     };

//     if (!event) {
//         return <p>Événement non trouvé</p>;
//     }

//     const handleEditEvent = () => {
//         navigate(`/addevent`, { state: { event } });
//     };

//     return (
//         <section>
//             <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mt-6 mx-auto">
//                 <img 
//                     src={event.image} 
//                     alt={event.name} 
//                     className="rounded-lg drop-shadow-xl h-64 w-full object-cover mb-4" 
//                 />
//                 <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
                
//                 {/* Afficher les détails des tickets */}
//                 {Object.keys(ticketDetails).length > 0 ? (
//                     Object.keys(ticketDetails).map(type => (
//                         <div key={type} className='mb-4'>
//                             <p className='font-semibold'>Type de Ticket : {type}</p>
//                             <p>Nombre disponible : {ticketDetails[type]}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p>Chargement des détails des tickets...</p>
//                 )}

//                 <button
//                     onClick={handleEditEvent}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
//                 >
//                    VOIR TOUS LES DETAILS / Modifier l'événement
//                 </button>
//             </div>
//         </section>
//     );
// };

// export default EventDetails;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = ({ events = [] }) => {
    const { eventId } = useParams();
    const { id } = useParams();
    const event = events.find(event => event.id === parseInt(id));
    const navigate = useNavigate();

    const [ticketDetails, setTicketDetails] = useState({});

    useEffect(() => {
        if (event) {
            axios.get(`/event/${eventId}/tickets`)
                .then(response => setTicketDetails(response.data))
                .catch(error => console.error('Erreur lors de la récupération des détails des tickets :', error));
                console.log('setticket :',setTicketDetails);
                console.log('ticket details:',ticketDetails);
        }
    }, [event]);

    const handleReserve = async (ticketId, quantity) => {
        try {
            const response = await axios.post('/reserve', { ticketId, quantity });
            if (response.status === 200) {
                const updatedAvailability = response.data.reservation.ticket.availability; // Modifiez ici pour récupérer la disponibilité mise à jour
                setTicketDetails(prevDetails => ({
                    ...prevDetails,
                    [ticketId]: updatedAvailability
                }));                console.log('setticket :',setTicketDetails);

            }
        } catch (error) {
            console.error('Erreur lors de la réservation :', error);
        }
    };

    if (!event) {
        return <p>Événement non trouvé</p>;
    }

    const handleEditEvent = () => {
        navigate(`/addevent`, { state: { event } });
    };

    return (
        <section>
            <div className="p-6 bg-white rounded-lg shadow-lg max-w-xl mt-6 mx-auto">
                <img 
                    src={event.image} 
                    alt={event.name} 
                    className="rounded-lg drop-shadow-xl h-64 w-full object-cover mb-4" 
                />
                <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
                
                {/* Afficher les détails des tickets */}

                <button
                    onClick={handleEditEvent}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4"
                >
                   VOIR TOUS LES DETAILS / Modifier l'événement
                </button>
            </div>
        </section>
    );
};

export default EventDetails;







