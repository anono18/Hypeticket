import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const result = await response.json();
            if (response.ok) {
                setStatus('Email envoyé avec succès');
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                setStatus(result.error || 'Erreur lors de l\'envoi de l\'email');
            }
        } catch (error) {
            setStatus('Erreur lors de l\'envoi de l\'email');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center min-h-screen p-6 bg-blue-950 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-4 text-white'>Contactez-nous</h2>
            <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nom'
                className='w-full p-2 border rounded-lg mb-4 shadow-md focus:shadow-lg focus:outline-none transition-shadow duration-300'
                required
            />
            <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                className='w-full p-2 border rounded-lg mb-4 shadow-md focus:shadow-lg focus:outline-none transition-shadow duration-300'
                required
            />
            <input
                type='text'
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder='Sujet'
                className='w-full p-2 border rounded-lg mb-4 shadow-md focus:shadow-lg focus:outline-none transition-shadow duration-300'
                required
            />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Message'
                className='w-full p-2 border rounded-lg mb-4 shadow-md focus:shadow-lg focus:outline-none transition-shadow duration-300'
                rows='6'
                required
            />
            <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300'>
                Envoyer
            </button>
            {status && <p className='mt-4'>{status}</p>}
        </form>


    );
};

export default Contact;
