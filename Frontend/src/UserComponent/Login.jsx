import React, {useState} from "react";
import { useNavigate } from "react-router";
import loginBackground from "../images/login-background.avif";
import {Link} from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myAxios from "../services/helper";
import { useDispatch } from "react-redux";
import { setUserId } from "../redux/userSlice";

function Login(){

    const[email, setEmail]=useState('');
    const[password, setPassword]=useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleLogin=async(e)=>{
        
        e.preventDefault();
        

        try {
            const response = await myAxios.post("/api/users/login", {email, password}); 
            console.log("Login Response:", response);
            if (response.status === 200) {

                const userId = response.data.cusId; // Assuming backend sends userId in response
                dispatch(setUserId(response.data.cusId));
                
                toast.success("Login successful!", { position: "top-center" });
                    
              navigate("/user-acc/personal-info");
            } else {
              toast.error("Invalid credentials. Please try again.", { position: "top-center" });
            }
          } catch (error) {
            if (error.response && error.response.data) {
              
              toast.error(error.response.data.message || "An unexpected error occurred.", { position: "top-center" });
            } else {
              toast.error("An unexpected error occurred. Please try again.", { position: "top-center" });
            }
          }
    };
    return(
        <div className="login-container">
            <img src={loginBackground} alt="background" className="login-img"/>
            <form  onSubmit={handleLogin} className="login-form">
                <h2 className="text-center text-xl font-semibold text-white">Login here</h2>
                <br></br>
                <div className="form-group">
                    <label className="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required

                        className="login-box"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required

                        className="login-box"
                    />
                    <button type="submit" className="btn-login">Login</button>
                </div>
                <div className="login-options">
                    <button type="button" className="btn-forgot-password">
                        <Link to="/forgot">
                            Forgot Password?
                        </Link>                      
                    </button>
                    <p className="signup">
                        New User?{" "}
                        <Link to="/signup">
                            Signup
                        </Link>
                    </p>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default Login;