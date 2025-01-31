import React from "react";
import navLogo from '../images/nav-logo.avif';
import {Link} from "react-router";

const Navbar=()=>{
    return(
        <div className="navbar p-2 h-20">
            <div className="nav-logo items-center">
                <img src={navLogo} alt="Insurance Management" className="h-14 w-auto ml-2 mt-1 object-cover rounded-full"/>
            </div>
            <ul className="navbar-links flex items-center space-x-6 ml-auto text-white text-base">
                <li>
                    <Link to="/login">User</Link>
                </li>
                <li>
                    <Link to="/admin-login">Admin</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>About</li>
            </ul>

        </div>
    )
}

export default Navbar;