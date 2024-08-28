import React from 'react';
import { Link } from 'react-router-dom';
import ticket_hero from "../assets/ticket_hero.png";
import perfomance from "../assets/performance.gif";
import classroom from "../assets/classroom.gif";
import movie from "../assets/movie-ticket.png";
import pallette from "../assets/paint-palette.gif";
import defilé from "../assets/mannequins.gif";

const Hero = () => {
    return (
        <section>
            <div className='relative h-[744px] w-full'>
                <div className='absolute inset-0 bg-black opacity-50'></div>
                <div className='max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-full w-full'>
                    <div className='flex flex-col items-center h-full text-center z-10 relative'>
                        <h4 className='uppercase mt-40 medium-20 tracking-wider text-white'>POUR CHAQUE ÉVÉNEMENT</h4>
                        <h2 className='h1 capitalize max-w-[40rem] text-white'>Reserver Vos <span className='text-amber-600'>TICKETS</span> Ici!</h2>
                        <p className='my-3 max-w-[48rem] text-white text-lg'>Parcourez notre sélection d'événements, réservez vos places en quelques clics, et profitez de moments inoubliables. Avec Hype Ticket, vivez l'émotion des événements en direct, simplement et rapidement.</p>
                        <div className='inline-flex items-center justify-center gap-4 p-2 bg-white rounded-xl'>
                            <div className='text-center regular-16 leading-tight pl-4'>
                                <p className='regular-16'>Pour les Evenements futurs</p>
                            </div>
                            <Link to='/eventslist' className='btn-dark rounded-xl flexCenter p-2'>
                                <p className='mr-2'>Payer vos Tickets maintenant</p>
                                <img src={ticket_hero} alt="Ticket Hero" className='w-10 h-10' />
                            </Link>
                        </div>
                        <br /><br /><br />
                        <span></span>
                        <div className="flex justify-center mt-8 space-x-10">
                        <div className="w-1 bg-slate-100 h-full mr-3"></div>

                            <div className="p-4 flex items-center justify-center bg-white rounded-xl shadow-xl ">
                                <p className='text-xl text-dark'>CONCERT</p>
                                <img src={perfomance} alt="Performance" className="w-16 h-16 rounded-lg" />
                            </div>
                            <div className="p-4 flex items-center justify-center bg-white rounded-xl shadow-xl mr-">
                            <p className='text-xl text-dark'>CONFERENCE</p>
                                <img src={classroom} alt="Classroom" className="w-16 h-16 rounded-lg" />
                            </div>
                            <div className="p-4 flex items-center justify-center bg-white rounded-xl shadow-xl mr-6">
                                <img src={movie} alt="Movie" className="w-16 h-16 rounded-lg" />
                            </div>
                            <div className="p-4 flex items-center justify-center bg-white rounded-xl shadow-xl mr-6">
                            <p className='text-xl text-dark'>EXPOSITION</p>
                                <img src={pallette} alt="Palette" className="w-16 h-16 rounded-lg" />
                            </div>
                            <div className="p-4 pr-4 flex items-center justify-center bg-white rounded-xl shadow-xl mr-6">
                               <p className='text-xl text-dark'>DEFILE</p>
                                <img src={defilé} alt="Défilé" className="w-16 h-16 rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
