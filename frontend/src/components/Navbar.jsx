import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles }) => {
    return (
        <nav className={`${containerStyles}`}>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Acceuil</NavLink>
            <NavLink to="/Eventslist" className={({ isActive }) => isActive ? "active-link" : ""}>Evenements</NavLink>
            <NavLink to="/listTicket" className={({ isActive }) => isActive ? "active-link" : ""}>Tickets</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contacts</NavLink>
        </nav>
    );
};

export default Navbar;
