import React, { useState, useEffect } from 'react';
import flooz from '../assets/flooz.jpg';
import tmoney from '../assets/tmoney.jpg';
import axios from 'axios';

const EventDescription = (props) => {
    const { event } = props;
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        if (event._id) {
            const fetchTickets = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/tickets');
                    const allTickets = response.data;
                    const filteredTickets = allTickets.filter(ticket => ticket.event === event._id);
                    setTickets(filteredTickets);
                } catch (error) {
                    console.error('Erreur lors de la récupération des billets:', error);
                }
            };
            fetchTickets();
        }
    }, [event._id]);

    const handleTicketChange = (event) => {
        setSelectedTicket(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(Math.max(1, event.target.value)); // Empêche les quantités inférieures à 1
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleReserve = async (ticketId, quantity) => {
        try {
            const token = localStorage.getItem('auth-token'); // Récupérer le token depuis localStorage
    
            const response = await axios.post(
                'http://localhost:4000/addTicketToCart',
                {
                    ticketId,
                    quantity
                },
                {
                    headers: {
                        'auth-token': token
                    }
                }
            );
    
            console.log('Ticket réservé avec succès:', response.data);
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
        }
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
            <div className='w-1/2 bg-white rounded-lg shadow-lg p-6 flex flex-col'>
                <div className='space-y-4 mb-6'>
                    <select
                        value={selectedTicket}
                        onChange={handleTicketChange}
                        className='p-2 border border-gray-300 rounded'
                    >
                        <option value="">Sélectionnez un type de ticket</option>
                        {tickets.map((ticket) => (
                            <option key={ticket._id} value={ticket._id}>
                                {ticket.type} - {ticket.price} FCFA
                            </option>
                        ))}
                    </select>
                    <input
                        type='number'
                        value={quantity}
                        onChange={handleQuantityChange}
                        className='p-2 border border-gray-300 rounded mt-2'
                        min='1'
                    />
                </div>
                <h3 className='font-semibold text-gray-800 mb-2 btn-dark rounded-sm !text-xs !py-[6px] w-36'>
                    Payer par
                </h3>
                <div className='flex gap-4 mb-4'>
                    <div
                        onClick={() => handlePaymentMethodChange('flooz')}
                        className={`flex-1 cursor-pointer ${paymentMethod === 'flooz' ? 'border border-blue-500' : ''}`}
                    >
                        <img src={flooz} alt="Flooz" className='w-full h-auto object-contain' />
                    </div>
                    <div
                        onClick={() => handlePaymentMethodChange('tmoney')}
                        className={`flex-1 cursor-pointer ${paymentMethod === 'tmoney' ? 'border border-blue-500' : ''}`}
                    >
                        <img src={tmoney} alt="Tmoney" className='w-full h-auto object-contain' />
                    </div>
                </div>
                <div className='flex gap-4'>
                    <button
                        className='btn-secondary rounded-lg w-full'
                        onClick={() => handleReserve(selectedTicket, quantity)}
                        disabled={!selectedTicket}
                    >
                        RESERVER
                    </button>
                    <button className='btn-secondary rounded-lg w-full'>
                        PAYER
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDescription;
