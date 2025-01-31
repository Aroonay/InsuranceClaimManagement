import React, {useEffect, useState} from "react";
import myAxios from "../services/helper";
import { useNavigate } from "react-router";

const ViewPolicies=()=>{
    const[policies, setPolicies]=useState([]);
    const navigate = useNavigate(); 

    useEffect(()=>{
        
        myAxios
            .get("/policies")
            .then((response)=>{
                setPolicies(response.data);
            })
            .catch((error)=>{
                console.error("Error fetching policies:", error);
            });
    }, []);

    const handleCardClick = (policy) => {
        navigate('/policy-details/${policy.id}', { state: { policy } });
    };

    return(
        <div className="policy-container-normal">
            <h1 className="text-center font-bold text-2xl">Our policies</h1>
            <div className="policy-cards">
                {policies.map((policy)=>
                    <div className="policy-card" key={policy.id} onClick={() => handleCardClick(policy)}>
                        <h3>{policy.name}</h3>
                        <p>{policy.description}</p>
                        <p>
                            <strong>Plan:</strong> {policy.plan}
                        </p>
                        <p>
                            <strong>Premium:</strong> ₹{policy.premium}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
};

export default ViewPolicies;
