import React from 'react';
import choose from '../assets/choose.jpg';
import ticket from '../assets/ticket.jpg'

const Utilities = () => {
    return (
        <section className='bg-blue-950 py-16 bg-grid-pattern'>
            <div className='text-center'>
                <h1 className='text-white text-3xl md:text-4xl font-bold'>How It Works</h1>
            </div>
            <div className='max-w-6xl mx-auto my-8 grid xs:grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Image à gauche */}
                <div className='flex-shrink-0 w-full p-2'>
                    <img src={choose} alt="Choose Event" className='w-full h-auto object-cover rounded-lg shadow-lg' />
                </div>
                {/* Texte à droite */}
                <div className='text-white w-full p-2'>
                    <h2 className='text-medium font-bold mb-4'>
                        Choose an event you want to be a part of
                    </h2>
                    <p className='text-base md:text-xl mb-2'>
                        Browse the list below to find the events that interest you. Click "Get Ticket" to reserve your spot and join the event of your choice. Don't miss out on this opportunity!
                    </p>
                    <p className='text-base md:text-xl'>
                        Each event offers a unique experience, so take your time to explore. We look forward to seeing you at the event!
                    </p>
                </div>
            </div>
            <div className='max-w-6xl mx-auto my-8 grid xs:grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Texte à gauche */}
                <div className='text-white w-full p-2'>
                    <h2 className='text-medium font-bold mb-4'>
                        Book Your Tickets Now!
                    </h2>
                    <p className='text-base md:text-xl mb-2'>
                        Don't miss the opportunity to attend incredible events! Our platform allows you to easily and quickly book your tickets for a variety of events. Whether you're passionate about music, sports, theater, or exhibitions, we have something for everyone.
                    </p>
                    <p className='text-base md:text-xl'>
                        Enjoy seamless transactions and instant confirmations. Join our community of event enthusiasts and never miss out on the excitement!
                    </p>
                </div>
                {/* Image à droite */}
                <div className='flex-shrink-0 w-full p-2'>
                    <img src={ticket} alt="Book Tickets" className='w-full h-auto object-cover rounded-lg shadow-lg' />
                </div>
            </div>
        </section>
    );
};

export default Utilities;
