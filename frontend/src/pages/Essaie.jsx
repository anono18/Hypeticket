import React from 'react';
import { } from "../assets/vendor/bootstrap/css/bootstrap.min.css";
import { } from "../assets/vendor/bootstrap-icons/bootstrap-icons.json";
import { } from "../assets/vendor/aos/aos.css";
import { } from "../assets/vendor/glightbox/css/glightbox.min.css";
import { } from "../assets/vendor/swiper/swiper-bundle.min.css";
import { } from "../assets/css/main.css";
import { } from "./essaie.css";
import heroBg2 from "../assets/img/hero-bg-2.jpg";
import heroBg from "../assets/img/hero-img.png";
import { Link } from "react-router-dom";

const Essaie = () => {
    return (
        <div className="index-page">
            <header id="header" className="header d-flex bg-blue-950 align-items-center fixed-top">
                <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                    <a href="/" className="logo d-flex align-items-center">
                        <h1 className="sitename">HYPE-TICKET</h1>
                    </a>
                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><a href="/" className="active">Acceuil</a></li>
                            <li><a href="/eventslist">Evenement</a></li>
                            <li><a href="/listTicket">Reservation</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                        <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                    </nav>
                </div>
            </header>

            <main className="main">
                {/* Hero Section */}
                <section id="hero" className="main-hero section dark-background bg-grid-pattern">
                    <img src={heroBg2} alt="" className="main-hero-bg" />
                    <div className="main-hero-container d-flex align-items-center justify-content-center">
                        <div className="row w-100 justify-content-center align-items-center">
                            <div className="col-md-6 d-flex flex-column justify-content-center text-center text-md-left z-10" style={{ padding: '60px 0' }}>
                                <h4 className='uppercase medium-20 tracking-wider text-white'>POUR CHAQUE ÉVÉNEMENT</h4>
                                <h2 className='h1 capitalize text-white'>Reserver Vos <span className='text-amber-600'>TICKETS</span> Ici!</h2>
                                <p className='my-3 text-white text-lg'>Parcourez notre sélection d'événements, réservez vos places en quelques clics, et profitez de moments inoubliables. Avec Hype Ticket, vivez l'émotion des événements en direct, simplement et rapidement.</p>
                                <div className="d-flex justify-content-center ml-48 justify-content-md-start">
                                    <Link to='/eventslist' className='start-btn '>Trouver des Evenements</Link>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2 d-flex justify-content-center">
                                <img src={heroBg} className="img-fluid animated-element hero-img max-h-[900px] object-fill" alt="Hero" />
                            </div>
                        </div>
                    </div>

                    <svg className="hero-waves-animation" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none">
                        <defs>
                            <path id="wave-path" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="wave-layer-1">
                            <use xlinkHref="#wave-path" x="50" y="3" />
                        </g>
                        <g className="wave-layer-2">
                            <use xlinkHref="#wave-path" x="50" y="0" />
                        </g>
                        <g className="wave-layer-3">
                            <use xlinkHref="#wave-path" x="50" y="9" />
                        </g>
                    </svg>
                </section>
            </main>

        </div>
    );
}

export default Essaie;


