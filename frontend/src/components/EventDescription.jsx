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
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

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
        setQuantity(Math.max(1, parseInt(event.target.value)));
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    const handleReserve = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setDialogMessage('Veuillez vous connecter pour réserver un ticket.');
            setShowDialog(true);
            return;
        }
    
        if (!selectedTicket) {
            setDialogMessage('Veuillez sélectionner un ticket.');
            setShowDialog(true);
            return;
        }
    
        try {
            const response = await axios.post(
                'http://localhost:4000/reserve',
                { ticketId: selectedTicket, quantity },  
                { headers: { 'auth-token': token } }
            );
    
            setDialogMessage('Ticket réservé avec succès ! ');
            setShowDialog(true);
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
            setDialogMessage('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
            setShowDialog(true);
        }
    };
    

    const totalPrice = selectedTicket && tickets.length
        ? tickets.find(ticket => ticket._id === selectedTicket).price * quantity
        : 0;

    return (
        <div className='max-padd-container mt-20 grid lg:flex lg:gap-8 sm:grid-cols-1 lg:grid-cols-2'>
            {/* Div à gauche */}
            <div className='w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-6'>
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
            <div className='w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-6 flex flex-col'>
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
                        className='p-2 ml-5 border border-gray-300 rounded mt-2 shadow-sm'
                        min='1'
                    />
                </div>
                <div className='mt-4 w-full'>
                    <p className='text-xl font-semibold text-center'>Total: {totalPrice} FCFA</p>
                </div>

                <h3 className='font-semibold text-gray-800 mb-2 btn-dark rounded-sm !text-xs !py-[6px] w-36 mt-6'>
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
                        onClick={handleReserve}
                        disabled={!selectedTicket}
                    >
                        RESERVER
                    </button>
                    <button className='btn-secondary rounded-lg w-full'>
                        PAYER
                    </button>
                </div>
            </div>
            {showDialog && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <p className='mb-4 text-2xl text-black'>{dialogMessage} <br />vous avez réservé {quantity} tickets</p>
                        <button
                            className='btn bg-green-600 p-3 text-white text-xl rounded-lg w-full'
                            onClick={() => setShowDialog(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDescription;
