import React from 'react';
import logo from '../../styles/logo.png'

const NavBar = () => {
    return (
        <nav className="navbar bg-white shadow-sm mb-5">
            <a className="navbar-brand" href="/">
                <img src={logo} alt='' width="100" />
            </a>
            <i className="far fa-user text-primary cursor-pointer" style={{fontSize: "25px"}}/>
        </nav>
    );
};

export default NavBar;