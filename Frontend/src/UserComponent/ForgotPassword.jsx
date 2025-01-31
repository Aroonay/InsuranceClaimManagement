import React, {useState} from "react";
import loginBackground from "../images/login-background.avif";

function Forgot(){

    const[email, setEmail]=useState("");
    const [showVerifyForm, setShowVerifyForm] = useState(false);
    const [otp, setOtp] = useState("");

    const handleEmailChange=(e)=>{
        setEmail(e.target.value);
    }

    const handleSendOtp=()=>{
        if (email.trim() === "") {
            alert("Please enter your email!");
            return;
        }
       
        // Add logic to send OTP here (e.g., API call)
        console.log("OTP sent to:", email);
        setShowVerifyForm(true); 
    }

    const handleVerifyOtp = () => {
        if (otp=== "") {
            alert("Please enter otp!");
            return;
        }
        // Logic to verify OTP
        console.log("Verifying OTP:", otp);
        alert("OTP Verified!"); // Placeholder for actual verification
    }
    
    return(
        <div className="login-container">
            <img src={loginBackground} alt="background" className="login-img"/>
            {!showVerifyForm ?(
                <form className="login-form">
                <h2 className="text-center text-xl font-semibold text-white">Forgot Password</h2>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="email" className="email">Enter your email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            required

                            className="login-box"
                        />

                        <button type="submit" onClick={handleSendOtp} className="btn-login">
                            Send OTP
                        </button>
                    </div>                   
                </form>
            ):(
                <form className="login-form">
                <h2 className="text-center text-xl font-semibold text-white">Verify OTP</h2>
                    <br></br>
                    <div className="form-group">
                        <label htmlFor="email" className="email">Enter your otp here</label>
                        <input
                            type="number"
                            id="number"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter your otp"
                            required

                            className="login-box"
                        />

                        <button type="submit" onClick={handleVerifyOtp} className="btn-login">
                            Verify OTP
                        </button>
                    </div>                   
                </form>
            )}          
            
        </div>
    )


}

export default Forgot;