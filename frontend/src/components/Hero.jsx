import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section>
            <div className='relative h-[744px] w-full'>
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-full w-full'>
                    <div className='flex flex-col items-center justify-center h-full text-center z-10 relative top-1'>
                        <h4 className='uppercase medium-20 tracking-wider text-white'>POUR CHAQUE ÉVÉNEMENT</h4>
                        <h2 className='h1 capitalize max-w-[40rem] text-white'>Reserver Vos <span className='text-amber-600'>TICKETs</span> Ici!</h2>
                        <p className='my-3 max-w-[33rem] text-white text-lg'>Parcourez notre sélection d'événements, réservez vos places en quelques clics, et profitez de moments inoubliables. Avec Hype Ticket, vivez l'émotion des événements en direct, simplement et rapidement.</p>
                        <div className='inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl'>
                            <div className='text-center regular-16 leading-tight pl-5'>
                                {/* <h5 className='uppercase font-bold'>Events</h5> */}
                                <p className='regular-16'>Pour les Evenements futurs</p>
                            </div>
                            <Link to='/events' className='btn-dark rounded-xl flexCenter !py-5 hover:text-secondary !border-black hover:bg-white'>Payer vos Tickets maintenant</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
