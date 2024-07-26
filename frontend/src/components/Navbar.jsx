import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ containerStyles }) => {
    return (
        <nav className={`${containerStyles}`}>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
            <NavLink to="/Events" className={({ isActive }) => isActive ? "active-link" : ""}>Events</NavLink>
            <NavLink to="/listTicket" className={({ isActive }) => isActive ? "active-link" : ""}>Tickets</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contacts</NavLink>
        </nav>
    );
};

export default Navbar;
