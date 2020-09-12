import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css';
const Navbar = (props) => {
    return (
        <div {...props} className="navbar" >
            <h2 className="brand" >The Proving Grounds</h2>
        </div>
    );
}

export default Navbar;