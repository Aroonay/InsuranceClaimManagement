import React, {useState,useEffect} from "react";
import myAxios from "../services/helper";


const PendingClaims=({isSidebarOpen})=>{
    const[claims, setClaims]=useState([]);
    const [amounts, setAmounts] = useState({});

    useEffect(()=>{
        myAxios
            .get("/claims/pending")
            .then(async(response)=>{
                const pendingClaims=response.data;
                console.log(pendingClaims);
                const claimsWithDetails= await Promise.all(
                    pendingClaims.map(async (claim)=>{
                        const userResponse = await myAxios.get(`api/admin/${claim.userId}`);
                        const policyResponse = await myAxios.get(`/policies/${claim.policyId}`);

                        return {
                            ...claim,
                            userName: userResponse.data.name,
                            userEmail: userResponse.data.email,
                            policyName: policyResponse.data.name,
                        };
                        
                    })
                    
                );
                console.log("Claims with details : ", claimsWithDetails);
                setClaims(claimsWithDetails);
            })
            .catch((error) => {
                console.error("Error fetching pending claims:", error);
            });
    }, []);

    const handleAmountChange = (claimId, e) => {
        setAmounts((prevAmounts) => ({
          ...prevAmounts,
          [claimId]: e.target.value,
        }));
        console.log(amounts);
    };

    const handleDecision = (claimId, amountGiven, isAccepted) => {
        if (isAccepted && amountGiven <= 0) {
          alert("Amount must be greater than 0 when accepting the claim.");
          return;
        }
    
        const payload = {
          amountGiven: amountGiven,
          isAccepted: isAccepted,
        };
    
        myAxios
          .put(`/claims/decision/${claimId}`, null, {
            params: payload,
          })
          .then(() => {
            alert("Claim decision has been updated successfully.");
            setClaims((prevClaims) =>
                prevClaims.filter((claim) => claim.claimId !== claimId)
            );
          })
          .catch((error) => {
            console.error("Error updating claim decision:", error);
            alert("Failed to update claim decision.");
          });
      };

      return (
        <div className={`pending-claims ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <h2>Pending Claims</h2>
          <table className="customer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Policy</th>
                <th>Claim Date</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim) => (
                <tr key={claim.claimId}>
                  <td>{claim.userName}</td>
                  <td>{claim.userEmail}</td>
                  <td>{claim.policyName}</td>
                  <td>{claim.claimedDate}</td>
                  <td>
                    <input
                      type="number"
                      value={amounts[claim.claimId] || ""}
                      onChange={(e) => handleAmountChange(claim.claimId, e)}
                      placeholder="Enter Amount"
                    />
                  </td>
                  <td>
                    <div className="decision-button-container">
                      <button
                        className="decision-btn"
                        onClick={() =>
                          handleDecision(claim.claimId, amounts[claim.claimId], true)
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="decision-btn"
                        onClick={() =>
                          handleDecision(claim.claimId, 0, false) // Reject with 0 amount
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

};

export default PendingClaims;