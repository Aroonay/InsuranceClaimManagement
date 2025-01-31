import React from "react";
import { useLocation } from "react-router";

const PolicyDetails=()=>{
    const location=useLocation();
    const {policy} =location.state;

    return(
        <div className="policy-details-container">
            <h1 className="text-center font-bold text-2xl">{policy.name}</h1>
            <div className="policy-details-card">
                <p>
                    {policy.description}
                </p>
                <p>
                    <strong>Plan:</strong> {policy.plan}
                </p>
                <p>
                    <strong>Premium:</strong> ₹{policy.premium}
                </p>

                <h2 className="font-bold text-xl">Coverage Details</h2>
                <div className="coverage-list">
                    {policy.coverages.map((coverage)=>(
                        <div className="coverage-card" key={coverage.coverageId}>
                            <h3>{coverage.coverageType}</h3>
                            <p>{coverage.description}</p>
                            <p>
                                <strong>Coverage Amount:</strong> ₹{coverage.coverageAmount}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PolicyDetails;