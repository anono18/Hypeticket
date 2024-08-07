// import React from 'react';

// const EventDescription = (props) => {
//     const { event } = props;

//     return (
//         <div className='max-padd-container mt-20 flex gap-8'>
//             {/* Div à gauche */}
//             <div className='w-1/2 bg-white rounded-lg shadow-lg p-6'>
//                 <div className='flex justify-center items-center mb-4'>
//                     <button className='btn-dark rounded-sm  !text-xs !py-[6px] w-36'>
//                         Description
//                     </button>
//                 </div>
//                 <div className='mb-6'>
//                     <p className='text-sm text-gray-600'>{event.description}</p>
//                 </div>
//                 <div className='space-y-3'>
//                     <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
//                         <p className='text-lg font-semibold text-gray-700'>{event.ticket_Price} FCFA</p>
//                     </div>
//                     <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
//                         <p className='text-sm text-gray-600'>Le {event.date_event} à {event.timeEvent}</p>
//                     </div>
//                     <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
//                         <p className='text-sm text-gray-600'>{event.lieu}</p>
//                     </div>
//                     <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
//                         <p className='text-sm text-gray-600'>{event.organizer}</p>
//                     </div>
//                     <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
//                         <p className='text-sm text-gray-600'>{event.supportContact}</p>
//                     </div>
//                 </div>
//             </div>
//             {/* Div à droite */}
//             <div className='w-1/2'>
//                 {/* Contenu futur */}
//             </div>
//         </div>
//     );
// }

// export default EventDescription;


import React, { useState, useEffect } from 'react';
import flooz from '../assets/flooz.jpg'
import tmoney from '../assets/tmoney.jpg'
import axios from 'axios';

const EventDescription = (props) => {
    const { event } = props;
    const [tickets, setTickets] = useState([]);
    const [selectedTickets, setSelectedTickets] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get('http://localhost:4000/tickets'); // Remplacez par l'URL de votre API
                setTickets(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des billets:', error);
            }
        };
        fetchTickets();
    }, []);

    const handleTicketChange = (ticketId, value) => {
        setSelectedTickets((prevSelectedTickets) => ({
            ...prevSelectedTickets,
            [ticketId]: Math.max(0, value), // Empêche les valeurs négatives
        }));
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    return (
        <div className='max-padd-container mt-20 flex gap-8'>
            {/* Div à gauche */}
            <div className='w-1/2 bg-white rounded-lg shadow-lg p-6'>
                <div className='flex justify-between items-center mb-4'>
                    <button className='btn-dark rounded-sm !text-xs !py-[6px] w-36'>
                        Description
                    </button>
                </div>
                <div className='mb-6'>
                    <p className='text-sm text-gray-600'>{event.description}</p>
                </div>
                <div className='space-y-3'>
                    <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
                        <p className='text-lg font-semibold text-gray-700'>{event.ticket_Price} FCFA</p>
                    </div>
                    <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
                        <p className='text-sm text-gray-600'>Le {event.date_event} à {event.timeEvent}</p>
                    </div>
                    <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
                        <p className='text-sm text-gray-600'>{event.lieu}</p>
                    </div>
                    <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
                        <p className='text-sm text-gray-600'>{event.organizer}</p>
                    </div>
                    <div className='bg-gray-100 p-4 rounded-md border border-gray-200'>
                        <p className='text-sm text-gray-600'>{event.supportContact}</p>
                    </div>
                </div>
            </div>
            {/* Div à droite */}
            <div className='w-1/2 bg-white rounded-lg shadow-lg p-6'>
                <div className='flex justify-between items-center mb-4'>
                    <button className='btn-dark rounded-sm !text-xs !py-[6px] w-36'>
                        Achat de Ticket
                    </button>
                </div>
                <div className='space-y-4'>
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className='bg-gray-100 p-4 rounded-md border border-gray-200 flex items-center justify-between'>
                            <div className='text-gray-700'>
                                <p className='text-lg font-semibold'>{ticket.name}</p>
                                <p className='text-sm'>{ticket.price} FCFA</p>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type='number'
                                    min='0'
                                    value={selectedTickets[ticket.id] || 0}
                                    onChange={(e) => handleTicketChange(ticket.id, parseInt(e.target.value))}
                                    className='w-16 text-center border border-gray-300 rounded-md'
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-6'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-2'>Payer par</h3>
                    <div className='flex gap-4 bottom-0'>
                        <div onChange={() => handlePaymentMethodChange('tmoney')} checked={paymentMethod === 'tmoney'}>
                            <img src={flooz} alt="" />
                        </div>
                        <div onChange={() => handlePaymentMethodChange('tmoney')} checked={paymentMethod === 'tmoney'}>
                            <img src={tmoney} alt="" />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDescription;

