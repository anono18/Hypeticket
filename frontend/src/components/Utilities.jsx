import React from 'react';
import choose from '../assets/choose.jpg';
import ticket from '../assets/ticket.jpg'

const Utilities = () => {
    return (
        <section className='bg-blue-950 py-16'>
            <div><h1 className='text-white text-3xl py-1 px-20  font-bold'>How it work</h1></div> <br />
            <div className='flex items-center justify-center border-none rounded-xl max-w-6xl mx-auto'>
                {/* Image à gauche */}
                <div className='flex-shrink-0 w-1/2 p-2'>
                    <img src={choose} alt="Choose Event" className='w-full h-full object-cover rounded-lg shadow-lg' />
                </div>
                {/* Texte à droite */}
                <div className='text-white w-1/2 p-2'>
                    <h1 className='text-3xl font-bold mb-4'>Choose an event you want to be a part of</h1>
                    <p className='text-xl text-white'>
                        Browse the list below to find the events that interest you. Click "Get Ticket" to reserve your spot and join the event of your choice. Don't miss out on this opportunity!
                    </p>
                    <p className='text-xl mt-2 text-white'>
                        Each event offers a unique experience, so take your time to explore. We look forward to seeing you at the event!
                    </p>
                </div>
            </div> <br /><br />
            <div className='flex items-center justify-center border-none rounded-xl max-w-6xl mx-auto'>
                {/* Image à gauche */}
                <div className='text-white w-1/2 p-2'>
                    <h1 className='text-3xl font-bold mb-4'>Book Your Tickets Now!</h1>
                    <p className='text-xl text-white'>
                        Don't miss the opportunity to attend incredible events! Our platform allows you to easily and quickly book your tickets for a variety of events. Whether you're passionate about music, sports, theater, or exhibitions, we have something for everyone.
                    </p>
                    <p className='text-xl mt-2 text-white'>
                        Enjoy seamless transactions and instant confirmations. Join our community of event enthusiasts and never miss out on the excitement!                    </p>
                </div>
                {/* Texte à droite */}

                <div className='flex-shrink-0 w-1/2 p-2'>
                    <img src={ticket} alt="Choose Event" className='w-full h-full object-cover rounded-lg shadow-lg' />
                </div>

            </div>
        </section>
    );
};

export default Utilities;
