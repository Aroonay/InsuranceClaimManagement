import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import myAxios from "../services/helper";
import user_pic from "../images/profile.png";

function AdminInfo({ isSidebarOpen }){
    const admId= useSelector((state)=> state.admin.admId);
    const [adminData, setAdminData] = useState(null);

    useEffect(()=>{
        if(admId){
            myAxios.get(`/api/admin/get/${admId}`).then((response)=>setAdminData(response.data)).catch((error)=>console.error("Error fetching user data:", error));
        }
    }, [admId]);

    return(
        <div className={`user-info-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            {adminData ? (
            <div className="user-info">
                <img
                    src={user_pic}
                    alt="Profile"
                    className="profile-image"
                />
                <div className="user-details">
                    <p><strong>Name:</strong> {adminData.name}</p>
                    <p><strong>Email:</strong> {adminData.email}</p>
                    <p><strong>Phone:</strong> {adminData.phone}</p>
                </div>
            </div>
            ) : (
                <p className="text-white">Loading information...</p>
            )}
        </div>
    )
}

export default AdminInfo;