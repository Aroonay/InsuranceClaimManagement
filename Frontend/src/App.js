import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Provider } from "react-redux";
import store from "./redux/store";

import "./input.css";

import Navbar from "./NavbarComponent/Navbar";
import HomePage from "./PageComponent/Home";
import Login from "./UserComponent/Login";
import Signup from "./UserComponent/Signup";
import AdminLogin from "./UserComponent/AdminLogin";
import AdminRegister from "./UserComponent/RegisterAdmin";
import AdminAccount from "./UserComponent/AdminAccount";
import Forgot from "./UserComponent/ForgotPassword";
import ForgotAdmin from "./UserComponent/ForgotPasswordAdmin";
import UserAccount from "./UserComponent/UserAccount";
import ViewPolicies from "./PolicyComponent/ViewPolicies";
import PolicyDetails from "./PolicyComponent/PolicyDetails";


const AppLayout=()=>{
    return (
       
        <React.StrictMode>
            <Provider store={store}>
                <Router>
                    {/* Always render Navbar */}
                    <Navbar />
                
                    {/* Define routes for other pages */}
                    <Routes>
                        <Route path="/" element={<HomePage />} /> {/* Home page at root path */}
                        <Route path="/login" element={<Login />} /> {/* Login page */}
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/admin-login" element={<AdminLogin />}/>
                        <Route path="/admin-register" element={<AdminRegister />}/>
                        <Route path="/admin-acc/*" element={<AdminAccount />}/>
                        <Route path="/forgot" element={<Forgot />}/>
                        <Route path="/forgot-admin" element={<ForgotAdmin />}/>
                        <Route path="/user-acc/*" element={<UserAccount />}/>
                        <Route path="/policies" element={<ViewPolicies />}/>
                        <Route path="/policy-details/:id" element={<PolicyDetails />} /> 
                        
                    </Routes>
                    
                </Router>
            </Provider>
        </React.StrictMode>
  
        
    );
}


const root=ReactDOM.createRoot(document.getElementById("root"));


root.render(<AppLayout/>);