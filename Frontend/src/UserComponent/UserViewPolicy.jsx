import React, { useState, useEffect } from "react";
import myAxios from "../services/helper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UserViewPolicy = ({isSidebarOpen}) => {
    const [policies, setPolicies] = useState([]);
    const navigate = useNavigate();  
    const userId = useSelector((state)=> state.user.cusId);
  
    useEffect(() => {
      
      myAxios
        .get(`/claims/unbought-policies/${userId}`)
        .then((response) => {
          setPolicies(response.data);
        })
        .catch((error) => {
          console.error("Error fetching unbought policies:", error);
        });
    }, [userId]);

    const handleCardClick = (policy) => {
        navigate('/policy-details/${policy.policyId}', { state: { policy } });
    };

  
    const handleBuy = (policyId) => {
      
      myAxios
        .post(`/claims/buy`, { userId, policyId })
        .then(() => {
          alert("Policy bought successfully!");
          
          setPolicies(policies.filter((policy) => policy.policyId !== policyId));
        })
        .catch((error) => {
          console.error("Error buying policy:", error);
        });
    };
  
    return (
        <div className={`policy-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <h1 className="text-center font-bold text-2xl">Our policies</h1>
        <div className="policy-cards">
            {policies.map((policy)=>
                <div className="policy-card" key={policy.policyId} onClick={() => handleCardClick(policy)}>
                     
                    <h3>{policy.name}</h3>
                    <p>{policy.description}</p>
                    <p>
                        <strong>Plan:</strong> {policy.plan}
                    </p>
                    <p>
                        <strong>Premium:</strong> ₹{policy.premium}
                    </p>
                    <div className="delete-button-container">
                        <button className="delete-btn items-center"
                            onClick={() =>handleBuy(policy.policyId)}>
                            Buy
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
  };
  
export default UserViewPolicy;