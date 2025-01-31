import React, { useState, useEffect } from "react";
import myAxios from "../services/helper";
import { useSelector, useDispatch } from "react-redux";
import { setClaimId } from "../redux/claimSlice";
import { useNavigate } from "react-router";


function UserBoughtPolicies({isSidebarOpen}) {
  const userId= useSelector((state)=> state.user.cusId);
  const [policies, setPolicies] = useState([]);
  const [activeTab, setActiveTab] = useState("claimed");
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // Fetch policies based on the active tab
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const endpoint = activeTab === "claimed" ? `/claims/claimed/${userId}` : `/claims/unclaimed/${userId}`;
        const response = await myAxios.get(endpoint);
        setPolicies(response.data);


      } catch (error) {
        console.error(`Error fetching ${activeTab} policies:`, error);
      }
    };
    fetchPolicies();
  }, [activeTab, userId]);


  const handleClaim = async (claimId) => {
    try {
      
      dispatch(setClaimId(claimId));

      const response = await myAxios.put(`/claims/claim/${claimId}`);

      alert("Policy claimed successfully!");

      setPolicies((prevPolicies) =>
        prevPolicies.filter((policy) => policy.claimId !== claimId)
      );
    } catch (error) {
      console.error("Error claiming the policy:", error);
      alert("Failed to claim the policy. Please try again.");
    }
  };

  const handleCardClick = (policy) => {
    navigate('/policy-details/${policy.policyId}', { state: { policy } });
};

  return(
    <div className={`bought-policies-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <h1 className="text-center">My Policies</h1>
      <div className="tabs">
        <button
          className={`tab ${activeTab === "claimed" ? "active" : ""}`}
          onClick={() => setActiveTab("claimed")}
        >
          Claimed
        </button>
        <button
          className={`tab ${activeTab === "unclaimed" ? "active" : ""}`}
          onClick={() => setActiveTab("unclaimed")}
        >
          Unclaimed
        </button>
      </div>

      <div className="policies-list">
        {policies.length === 0 ? (
          <p>No policies found in the {activeTab} category.</p>
        ) : (
          policies.map((policy) => (
            <div className="policy-card" key={policy.policyId} onClick={() => handleCardClick(policy)}>
              <h3>{policy.policyName}</h3>
              <p><strong>Description:</strong> {policy.policyDescription}</p>
              <p><strong>Plan:</strong> {policy.plan}</p>
              <p><strong>Premium Amount:</strong> {policy.premium}</p>
              {activeTab === "claimed" && (
                <div>
                  <p><strong>Claimed Date:</strong> {policy.claimedDate}</p>
                  <p><strong>Status:</strong> {policy.accepted === true ? (
                            <span className="accepted">Accepted</span>
                            ) : policy.accepted === false ? (
                            <span className="rejected">Rejected</span>
                            ) : (
                            <span className="pending">Pending</span>
                            )}
                  </p>
                  {policy.decisionDate && <p><strong>Decision Date:</strong> {policy.decisionDate}</p>}
                  <p><strong>Amount Given:</strong> {policy.amountGiven}</p>
                </div>
              )}
              {activeTab === "unclaimed" && (
                <div className="delete-button-container">
                  <button
                    className="delete-btn"
                    onClick={() => handleClaim(policy.claimId)}
                  >
                    Claim
                  </button>
                </div>
            )}
            </div>           
          ))
        )}
      </div>
    </div>
  );
};

export default UserBoughtPolicies;