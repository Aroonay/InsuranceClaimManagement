import React, {useState} from "react";
import {Link} from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

import AdminInfo from "./admin-info";
import AdminViewPolicy from "./AdminViewPolicy";
import AddPolicy from "../PolicyComponent/AddPolicies";
import ViewCustomers from "./ViewCustomers";
import PendingClaims from "../ClaimComponent/PendingClaims";

const AdminAccount=()=>{
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
                <li><Link to="/admin-acc/ad-policies">View Policies</Link></li>
                <li><Link to="/admin-acc/add">Add Policy</Link></li>
                <li><Link to="/admin-acc/customers">View Customers</Link></li>
                <li><Link to="/admin-acc/pending">Pending Claims</Link></li>
                <li><Link to="/admin-acc/personal-info">Personal Information</Link></li>
                <li><Link to="/admin-login">Logout</Link></li>
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
              <Route path="personal-info" element={<AdminInfo isSidebarOpen={isOpen}/>} />
              <Route path="ad-policies" element={<AdminViewPolicy isSidebarOpen={isOpen}/>}/>
              <Route path="add" element={<AddPolicy isSidebarOpen={isOpen} />} />
              <Route path="customers" element={<ViewCustomers isSidebarOpen={isOpen} />} />
              <Route path="pending" element={<PendingClaims isSidebarOpen={isOpen}/>} />
              
              {/* Default Route */}
              <Route path="/" element={<Navigate to="personal-info"/>} />              
            </Routes>
          </div>
        </div>
    )
  };
    
export default AdminAccount;


