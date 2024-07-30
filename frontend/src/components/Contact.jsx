import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:4000/send-email', formData);
            alert('Message sent successfully!');
        } catch (error) {
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <section className='bg-blue-950 py-14'>
            <div className='container mx-auto'>
                <h2 className='text-3xl font-bold text-white mb-6'>Contact Us</h2>
                <form onSubmit={handleSubmit} className='bg-white p-8 rounded-lg shadow-lg'>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            id='name' 
                            value={formData.name} 
                            onChange={handleChange} 
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            required 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            name='email' 
                            id='email' 
                            value={formData.email} 
                            onChange={handleChange} 
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            required 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='subject'>Subject</label>
                        <input 
                            type='text' 
                            name='subject' 
                            id='subject' 
                            value={formData.subject} 
                            onChange={handleChange} 
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            required 
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='message'>Message</label>
                        <textarea 
                            name='message' 
                            id='message' 
                            rows='5' 
                            value={formData.message} 
                            onChange={handleChange} 
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                            required 
                        ></textarea>
                    </div>
                    <div className='flex items-center justify-between'>
                        <button 
                            type='submit' 
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
