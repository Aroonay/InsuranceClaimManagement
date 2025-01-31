import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import myAxios from "../services/helper";
import user_pic from "../images/profile.png";

function UserInfo({ isSidebarOpen }){
    const userId= useSelector((state)=> state.user.cusId);
    const [userData, setUserData] = useState(null);

    useEffect(()=>{
        if(userId){
            myAxios.get(`/api/admin/${userId}`).then((response)=>setUserData(response.data)).catch((error)=>console.error("Error fetching user data:", error));
        }
    }, [userId]);

    return(
        <div className={`user-info-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            {userData ? (
            <div className="user-info">
                <img
                    src={user_pic}
                    alt="Profile"
                    className="profile-image"
                />
                <div className="user-details">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                </div>
            </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    )
}

export default UserInfo;