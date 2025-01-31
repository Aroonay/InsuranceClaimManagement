import React, {useState} from "react";
import {Link} from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

import UserInfo from "./user-info";
import UserViewPolicy from "./UserViewPolicy";
import UserBoughtPolicies from "../ClaimComponent/UserBoughtPolicy";

const UserAccount=()=>{
    const [isOpen, setIsOpen] = useState(true);
    /*const [redirect, setRedirect] = useState(false);*/

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

   /* if (redirect) {
        return <Navigate to="/admin-info" />; // Redirect to personal info if set to true
    }*/
    

    return (
      
        <div className="admin-account">
          {/* Sidebar */}
          <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faTimes} />
                
            </button>
            <nav>
              <ul>
                <li><Link to="/user-acc/unbought-policies">View Policies</Link></li>
                <li><Link to="/user-acc/view-claims">View Claims</Link></li>
                <li><Link to="/user-acc/personal-info">Personal Information</Link></li>
                <li><Link to="/login">Logout</Link></li>
              </ul>
            </nav>
          </div>

          {/* Menu Button */}
            {!isOpen && (
                <button className="menu-btn" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} /> {/* Open button */}
                </button>
            )}

        {/* Main Content */}
           
        <div className="main-content">
          <Routes>
            {/* Pages */}
            <Route path="personal-info" element={<UserInfo isSidebarOpen={isOpen}/>} />
            <Route path="unbought-policies" element={<UserViewPolicy isSidebarOpen={isOpen}/>} />
            <Route path="view-claims" element={<UserBoughtPolicies/>} />
            {/* Default Route */}
            <Route path="/" element={<Navigate to="personal-info"/>} />
            
            
          </Routes>
        </div>
        </div>
      
        
    )
  };
    
export default UserAccount;