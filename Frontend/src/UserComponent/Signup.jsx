import React, {useState} from "react";
import {Link} from "react-router";
import loginBackground from "../images/login-background.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myAxios from "../services/helper";

function Signup(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
   
    const [isLoading, setIsLoading] = useState(false); // For loading state

    const handleSignup = async (e) => {
        e.preventDefault();
        // Handle signup logic
        setIsLoading(true);
        const userData = { name, email, phone, password };

        try {
            const response = await myAxios.post("/api/users", userData); // Endpoint relative to baseURL
            if (response.data && response.data.message) {
                toast.success(response.data.message, { position: "top-center" }); // Show success toast
            }
            
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, { position: "top-center" }); // Show error toast
            } else {
                toast.error("An unexpected error occurred. Please try again.", {
                    position: "top-center",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div className="login-container">
                    <img src={loginBackground} alt="background" className="login-img"/>
                    <form  onSubmit={handleSignup} className="login-form">
                        <h2 className="text-center text-xl font-semibold text-white">Signup</h2>
                        <br></br>
                        <div className="form-group">
                            <label className="name">Name</label>
                            <input
                                type="text"
                                id="text"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                placeholder="Enter your full name"
                                required
        
                                className="signup-box"
                            />
                        </div>
                        <div className="form-group">
                            <label className="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
        
                                className="signup-box"
                            />
                        </div>
                        <div className="form-group">
                            <label className="phone">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e)=>setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                                required
        
                                className="signup-box"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="password">Set Password</label>
                            <input
                                type="password"
                                id="password"
                                maxLength="20"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Set your password for a maximum of 20 characters"
                                required
        
                                className="signup-box"
                            />
                            <button type="submit" className="btn-login" disabled={isLoading}>
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </div>
                        <div className="login-options">
                            
                            <p className="login">
                                Already have an account?{" "}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
    )
}

export default Signup;