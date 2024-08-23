// import React, { useState, useEffect } from 'react';
// import flooz from '../assets/flooz.jpg';
// import tmoney from '../assets/tmoney.jpg';
// import axios from 'axios';

// const EventDescription = (props) => {
//     const { event } = props;
//     const [tickets, setTickets] = useState([]);
//     const [selectedTicket, setSelectedTicket] = useState('');
//     const [quantity, setQuantity] = useState(1);
//     const [showDialog, setShowDialog] = useState(false);
//     const [dialogMessage, setDialogMessage] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [amount, setAmount] = useState('');
//     const [securityCode, setSecurityCode] = useState('');
//     const [step, setStep] = useState(1);

//     const handleNextStep = () => {
//         if (step === 1 && phoneNumber) {
//             setStep(2);
//         } else if (step === 2 && amount) {
//             setStep(3);
//         } else if (step === 3 && securityCode) {
//             handlePayment();
//         }
//     };


//     useEffect(() => {
//         if (event._id) {
//             const fetchTickets = async () => {
//                 try {
//                     const response = await axios.get('http://localhost:4000/tickets');
//                     const allTickets = response.data;
//                     const filteredTickets = allTickets.filter(ticket => ticket.event === event._id);
//                     setTickets(filteredTickets);
//                 } catch (error) {
//                     console.error('Erreur lors de la récupération des billets:', error);
//                 }
//             };
//             fetchTickets();
//         }
//     }, [event._id]);

//     const handleTicketChange = (event) => {
//         setSelectedTicket(event.target.value);
//     };

//     const handleQuantityChange = (event) => {
//         setQuantity(Math.max(1, parseInt(event.target.value, 10)));
//     };

//     const handleReserve = async () => {
//         const token = localStorage.getItem('auth-token');
//         if (!token) {
//             setDialogMessage('Veuillez vous connecter pour réserver un ticket.');
//             setShowDialog(true);
//             return;
//         }

//         if (!selectedTicket) {
//             setDialogMessage('Veuillez sélectionner un ticket.');
//             setShowDialog(true);
//             return;
//         }

//         try {
//             await axios.post(
//                 'http://localhost:4000/reserve',
//                 { ticketId: selectedTicket, quantity },
//                 { headers: { 'auth-token': token } }
//             );

//             setDialogMessage('Ticket réservé avec succès !');
//             setShowDialog(true);
//         } catch (error) {
//             console.error('Erreur lors de la réservation:', error);
//             setDialogMessage('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
//             setShowDialog(true);
//         }
//     };

//     const handlePaymentMethodSelect = (method) => {
//         setPaymentMethod(method);
//     };

//     const handlePayment = async () => {
//         const token = localStorage.getItem('auth-token');
//         if (!token) {
//             setDialogMessage('Veuillez vous connecter pour effectuer le paiement.');
//             setShowDialog(true);
//             return;
//         }

//         try {
//             await axios.post(
//                 'http://localhost:4000/simulate-payment',
//                 {
//                     eventId: event._id,
//                     ticketDetails: [{ ticketId: selectedTicket, quantity }],
//                     securityCode,
//                     paymentMethod,
//                     phoneNumber,
//                     amount: parseFloat(amount),
//                 },
//                 { headers: { 'auth-token': token } }
//             );

//             setDialogMessage('Paiement effectué avec succès ! QR code envoyé.');
//             setShowDialog(true);
//         } catch (error) {
//             console.error('Erreur lors du paiement:', error);
//             setDialogMessage('Une erreur est survenue lors du paiement. Veuillez réessayer.');
//             setShowDialog(true);
//         }
//     };

//     const totalPrice = selectedTicket && tickets.length
//         ? tickets.find(ticket => ticket._id === selectedTicket).price * quantity
//         : 0;

//     return (
//         <div className='max-padd-container mt-20 grid lg:flex lg:gap-8 sm:grid-cols-1 lg:grid-cols-2'>
//             {/* Div à gauche */}
//             <div className='w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-6'>
//                 <div className='flex justify-between items-center mb-4'>
//                     <button className='btn-dark rounded-sm !text-xs !py-[6px] w-36'>
//                         Description
//                     </button>
//                 </div>
//                 <div className='mb-6'>
//                     <p className='text-sm text-gray-600'>{event.description}</p>
//                 </div>
//                 <div className='space-y-3'>
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
//             <div className='w-full lg:w-1/2 bg-white rounded-lg shadow-lg p-6 flex flex-col'>
//                 <div className='space-y-4 mb-6'>
//                     <select
//                         value={selectedTicket}
//                         onChange={handleTicketChange}
//                         className='p-2 border border-gray-300 rounded'
//                     >
//                         <option value="">Sélectionnez un type de ticket</option>
//                         {tickets.map((ticket) => (
//                             <option key={ticket._id} value={ticket._id}>
//                                 {ticket.type} - {ticket.price} FCFA
//                             </option>
//                         ))}
//                     </select>
//                     <input
//                         type='number'
//                         value={quantity}
//                         onChange={handleQuantityChange}
//                         className='p-2 ml-5 border border-gray-300 rounded mt-2 shadow-sm'
//                         min='1'
//                     />
//                 </div>
//                 <div className='mt-4 w-full'>
//                     <p className='text-xl font-semibold text-center'>Total: {totalPrice} FCFA</p>
//                 </div>
//                 <div className='flex gap-4 mb-4'>
//                     <div
//                         className={`flex-1 cursor-pointer ${paymentMethod === 'Flooz' ? 'ring-2 ring-blue-500' : ''}`}
//                         onClick={() => handlePaymentMethodSelect('Flooz')}
//                     >
//                         <img src={flooz} alt="Flooz" className='w-full h-auto object-contain' />
//                     </div>
//                     <div
//                         className={`flex-1 cursor-pointer ${paymentMethod === 'TMoney' ? 'ring-2 ring-blue-500' : ''}`}
//                         onClick={() => handlePaymentMethodSelect('TMoney')}
//                     >
//                         <img src={tmoney} alt="Tmoney" className='w-full h-auto object-contain' />
//                     </div>
//                 </div>
//                 <div className='flex gap-4'>
//                     <button
//                         className='btn-secondary rounded-lg w-full'
//                         onClick={handleReserve}
//                         disabled={!selectedTicket}
//                     >
//                         RESERVER
//                     </button>
//                     <button
//                         className='btn-secondary rounded-lg w-full'
//                         onClick={() => setShowDialog(true)}
//                         disabled={!selectedTicket || !paymentMethod}
//                     >
//                         PAYER
//                     </button>
//                 </div>
//             </div>
//             {showDialog && (
//                 <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
//                     <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
//                         {step === 1 && (
//                             <div>
//                                 <label className='text-xl text-black'>Numéro de téléphone:</label>
//                                 <input
//                                     type='text'
//                                     className='w-full p-2 border border-gray-300 rounded mt-2'
//                                     value={phoneNumber}
//                                     onChange={(e) => setPhoneNumber(e.target.value)}
//                                     placeholder='Entrez votre numéro'
//                                 />
//                                 <div className='mt-4 flex justify-end'>
//                                     <button
//                                         className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
//                                         onClick={handleNextStep}
//                                         disabled={!phoneNumber}
//                                     >
//                                         Suivant
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                         {step === 2 && (
//                             <div>
//                                 <label className='text-xl text-black'>Montant à payer:</label>
//                                 <input
//                                     type='number'
//                                     className='w-full p-2 border border-gray-300 rounded mt-2'
//                                     value={amount}
//                                     onChange={(e) => setAmount(e.target.value)}
//                                     min='0'
//                                     placeholder='Entrez le montant'
//                                 />
//                                 <div className='mt-4 flex justify-end'>
//                                     <button
//                                         className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700'
//                                         onClick={handleNextStep}
//                                         disabled={!amount}
//                                     >
//                                         Suivant
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                         {step === 3 && (
//                             <div>
//                                 <label className='text-xl text-black'>Code de sécurité:</label>
//                                 <input
//                                     type='password'
//                                     className='w-full p-2 border border-gray-300 rounded mt-2'
//                                     value={securityCode}
//                                     onChange={(e) => setSecurityCode(e.target.value)}
//                                     placeholder='Entrez le code de sécurité'
//                                 />
//                                 <div className='mt-4 flex justify-end gap-2'>
//                                     <button
//                                         className='bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700'
//                                         onClick={handleNextStep}
//                                         disabled={!securityCode}
//                                     >
//                                         Valider
//                                     </button>
//                                     <button
//                                         className='bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-500'
//                                         onClick={() => setShowDialog(false)}
//                                     >
//                                         Annuler
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EventDescription;

import React, { useState, useEffect } from 'react';
import flooz from '../assets/flooz.jpg';
import tmoney from '../assets/tmoney.jpg';
import axios from 'axios';

const EventDescription = (props) => {
    const { event } = props;
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [step, setStep] = useState(1);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleNextStep = () => {
        if (step === 1 && phoneNumber) {
            setStep(2);
        } else if (step === 2 && amount) {
            setStep(3);
        } else if (step === 3 && securityCode) {
            handlePayment();
        }
    };

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
        setQuantity(Math.max(1, parseInt(event.target.value, 10)));
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
            await axios.post(
                'http://localhost:4000/reserve',
                { ticketId: selectedTicket, quantity },
                { headers: { 'auth-token': token } }
            );

            setDialogMessage('Ticket réservé avec succès !');
            setShowDialog(true);
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
            setDialogMessage('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
            setShowDialog(true);
        }
    };

    const handlePaymentMethodSelect = (method) => {
        setPaymentMethod(method);
    };

    const handlePayment = async () => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            setDialogMessage('Veuillez vous connecter pour effectuer le paiement.');
            setShowDialog(true);
            return;
        }

        try {
            await axios.post(
                'http://localhost:4000/simulate-payment',
                {
                    eventId: event._id,
                    ticketDetails: [{ ticketId: selectedTicket, quantity }],
                    securityCode,
                    paymentMethod,
                    phoneNumber,
                    amount: parseFloat(amount),
                },
                { headers: { 'auth-token': token } }
            );

            setDialogMessage('Paiement effectué avec succès ! QR code envoyé.');
            setShowConfirmation(true);
            setShowDialog(false); // Fermer la boîte de dialogue actuelle
        } catch (error) {
            console.error('Erreur lors du paiement:', error);
            setDialogMessage('Une erreur est survenue lors du paiement. Veuillez réessayer.');
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
                <div className='flex gap-4 mb-4'>
                    <div
                        className={`flex-1 cursor-pointer ${paymentMethod === 'Flooz' ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => handlePaymentMethodSelect('Flooz')}
                    >
                        <img src={flooz} alt="Flooz" className='w-full h-auto object-contain' />
                    </div>
                    <div
                        className={`flex-1 cursor-pointer ${paymentMethod === 'TMoney' ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={() => handlePaymentMethodSelect('TMoney')}
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
                    <button
                        className='btn-secondary rounded-lg w-full'
                        onClick={() => setShowDialog(true)}
                        disabled={!selectedTicket || !paymentMethod}
                    >
                        PAYER
                    </button>
                </div>
            </div>
            {showDialog && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
                        {step === 1 && (
                            <div>
                                <label className='text-xl text-black'>Numéro de téléphone:</label><br />
                                <p>vous payez {quantity} tickets</p>
                                <p>Total: {totalPrice} FCFA</p>
                                <input
                                    type='text'
                                    className='w-full p-2 border border-gray-300 rounded mt-2'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder='Entrez votre numéro'
                                />
                                <button className='bg-green-500  mt-4 ml-auto rounded-md p-4' onClick={handleNextStep}>
                                    Suivant
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <label className='text-xl text-black'>Montant:</label>
                                <p>vous payez {quantity} tickets</p>
                                <p>Total: {totalPrice} FCFA</p>
                                <input
                                    type='number'
                                    className='w-full p-2 border border-gray-300 rounded mt-2'
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder='Entrez le montant'
                                    min='0'
                                />
                                <button className='bg-green-500  mt-4 mr-auto rounded-md p-4' onClick={handleNextStep}>
                                    Suivant
                                </button>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <label className='text-xl text-black'>Code de sécurité:</label>
                                <p>vous payez {quantity} tickets</p>
                                <p>Total: {totalPrice} FCFA</p>
                                <input
                                    type='text'
                                    className='w-full p-2 border border-gray-300 rounded mt-2'
                                    value={securityCode}
                                    onChange={(e) => setSecurityCode(e.target.value)}
                                    placeholder='Entrez le code de sécurité'
                                />
                                <button className='bg-green-500 mt-4 ml-auto' onClick={handleNextStep}>
                                    Payer
                                </button>
                            </div>
                        )}
                        <button className='btn-primary p-2 rounded-lg hover:bg-red-300 mt-4' onClick={() => setShowDialog(false)}>
                            Annuler
                        </button>
                    </div>
                </div>
            )}
            {showConfirmation && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
                        <p className='text-xl text-black mb-4'>Votre paiement a été effectué avec succès !</p>
                        <p className='text-sm text-gray-600 mb-4'>Votre ticket sera envoyé à votre adresse e-mail.</p>
                        <button className='bg-green-500 ml-auto' onClick={() => setShowConfirmation(false)}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventDescription;

