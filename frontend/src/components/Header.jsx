import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
// Importation des images / svg
import Navbar from "./Navbar"
import { MdMenu, MdClose } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.png"
import profile from "../assets/profile.gif"
import inport from "../assets/import.gif"
import esport from "../assets/export.gif"

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = () => setMenuOpened(!menuOpened);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                //close the menu if open scrolling
                if (menuOpened) {
                    setMenuOpened(false);
                }
            }
        };
        window.addEventListener("scroll", handleScroll);

        //clean up the event listener when menuopen
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [menuOpened]);

    return (
        <header className="max-padd-container w-full z-50 bg-blue-950 ">
            <div className="flexBetween py-2">
                <Link to="/" className="flex items-center gap-x-2">
                    {/* <span className="logo-text">
                        <span className="text-secondary">Hype</span>
                        <span className="text-secondary">-</span>
                        <span className="text-secondary">ticket</span>
                    </span> */}
                    <img src={logo} alt="logo" className="w-48 h-auto m-2 rounded-lg shadow-xl mx-auto object-cover" />
                    {/* <span className="bold-24  xs:flex "><span className="text-secondary text-2xl">HYPE</span><span className="text-white">-</span><span className="text-secondary text-2xl">TICKETS</span></span> */}
                </Link>
                {/** Navbar et bouton */}
                <div className="flexCenter gap-x-4 ">
                    <div>
                        <Navbar containerStyles="hidden xl:flex gap-x-5 xl:gap-x-10 medium-15 rounded-full px-2 py-1 text-white" />
                    </div>
                    <div>
                        <Navbar containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50" : "flex items-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300 z-50 -right-[100%]"}`} />
                    </div>
                    {/** Navbar et bouton */}
                    <div className="flexBetween gap-x-3 se:gap-x-2 bold-16">
                        {!menuOpened ? (
                            <MdMenu className='xl:hidden cursor-pointer text-3xl text-white hover:text-secondary' onClick={toggleMenu} />
                        ) : (
                            <MdClose className='xl:hidden cursor-pointer text-3xl text-white hover:text-secondary' onClick={toggleMenu} />
                        )}
                        <div className="flexBetween sm:gap-x-0 ">
                            {localStorage.getItem('auth-token') ?
                                <NavLink onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }} to={'/login'} className={'btn-white text-black flexCenter gap-x-2 medium-16 rounded-xl'}>
                                    Logout   <img src={esport} alt="" className='w-7 h-7 ' />

                                    {/* <FaArrowRight /> */}
                                </NavLink> :
                                <NavLink to={'/login'} className={'btn-white text-black flexCenter gap-x-2 medium-16 rounded-xl'}>
                                    Login <img src={inport} alt="" className='w-7 h-7 ' />
                                </NavLink>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header
