import React, {useEffect, useState} from "react";
import myAxios from "../services/helper";
import { useNavigate } from "react-router";

const AdminViewPolicy=({ isSidebarOpen })=>{
    const[policies, setPolicies]=useState([]);
    const navigate = useNavigate(); 

    useEffect(()=>{
        
        myAxios
            .get("/policies")
            .then((response)=>{
                console.log("Policies fetched:", response.data);
                setPolicies(response.data);
            })
            .catch((error)=>{
                console.error("Error fetching policies:", error);
            });
    }, []);

    const handleCardClick = (policy) => {
        navigate('/policy-details/${policy.policyId}', { state: { policy } });
    };

    const handleDelete = (e, policyId) => {
        e.stopPropagation();
         
        if (window.confirm("Are you sure you want to delete this policy?")) {
            myAxios.delete(`/policies/${policyId}`)
                .then(() => {
                    

                    setPolicies((prevPolicies) => {const updatedPolicies = prevPolicies.filter((policy) => policy.policyId !== policyId)
                        return updatedPolicies;
                    });
                    alert("Policy deleted successfully!");
                })
                .catch((error) => {
                    console.error("Error deleting policy:", error);
                    alert("Failed to delete policy.");
                });
        }
    };

    return(
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
                            <button className="delete-btn"
                                onClick={(e) =>handleDelete(e, policy.policyId)}>
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default AdminViewPolicy;
