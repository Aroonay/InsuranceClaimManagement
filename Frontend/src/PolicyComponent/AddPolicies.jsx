import React, {useState} from "react";
import myAxios from "../services/helper";


function AddPolicy({ isSidebarOpen }){
    const [policy, setPolicy] = useState({
        name: "",
        description: "",
        plan: "Monthly",
        premium: "",
    });

    const [coverage, setCoverage] = useState({
        coverageType: "",
        description: "",
        coverageAmount: "",
    });

    const [coverageList, setCoverageList] = useState([]);

    const handlePolicyChange=(e)=>{
        const {name, value}=e.target;
        setPolicy((prevPolicy)=>({...prevPolicy, [name]: value}));
    };

    const handleCoverageChange = (e) => {
        const { name, value } = e.target;
        setCoverage((prevCoverage) => ({ ...prevCoverage, [name]: value }));
    };

    const addCoverage=()=>{
        console.log("Coverage state before validation:", coverage);
        if(coverage.coverageType && coverage.description && coverage.coverageAmount){

            const newCoverage = {
                ...coverage,
                coverageAmount: parseInt(coverage.coverageAmount, 10), // Convert amount to integer
            };
            setCoverageList((prevList)=> [...prevList, newCoverage]);
            setCoverage({ coverageType: "", description: "", coverageAmount: "" });

        }else{
            alert("All coverage fields are required!");
        }
    }

    const addPolicy=()=>{
        if (!policy.name || !policy.description || !policy.premium || coverageList.length === 0) {
            alert("Please fill all policy fields and add at least one coverage!");
            return;
        }

        const fullPolicy = {
            ...policy,
            coverages: coverageList,
        };

        console.log("Payload to be sent:", fullPolicy);
        myAxios
            .post("/policies", fullPolicy)
            .then((response) => {
                console.log("Policy successfully added:", response.data);
                alert("Policy added successfully!");
                // Reset form
                setPolicy({ name: "", description: "", plan: "Monthly", premium: "" });
                setCoverageList([]);
            })
            .catch((error) => {
                console.error("Error adding policy:", error);
                alert("Failed to add policy. Please try again.");
            });

    };
     

    return(
        <div className={`add-policy-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
            
            {/* Add Policy Form */}
            <div className="add-policy-box">
                <form>
                <h3 className="text-center font-semibold text-xl">Add Policy</h3>
                    <div>
                        <label>Policy Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={policy.name}
                            onChange={handlePolicyChange}
                            placeholder="Enter policy name"
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={policy.description}
                            onChange={handlePolicyChange}
                            placeholder="Enter policy description"
                            required
                            className="policy-description"
                        ></textarea>
                    </div>
                    <div>
                        <label>Policy Plan:</label>
                        <select name="plan" value={policy.plan} onChange={handlePolicyChange}>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                    <div>
                        <label>Premium Amount:</label>
                        <input
                            type="number"
                            name="premium"
                            value={policy.premium}
                            onChange={handlePolicyChange}
                            placeholder="Enter premium amount"
                            required
                        />
                    </div>
                    <button type="button" onClick={addPolicy} className="btn-policy">
                        Add Policy
                    </button>
                </form>
            </div>
            {/* Add Coverage Form */}
            <div className="add-coverage-box">
                <h3 className="text-center font-semibold text-xl">Add Coverage</h3>
                <form>
                    <div>
                        <label>Coverage Type:</label>
                        <input
                            type="text"
                            name="coverageType"
                            value={coverage.coverageType}
                            onChange={handleCoverageChange}
                            placeholder="Enter coverage type"
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={coverage.description}
                            onChange={handleCoverageChange}
                            placeholder="Enter coverage description"
                            required

                            className="coverage-description"
                        ></textarea>
                    </div>
                    <div>
                        <label>Coverage Amount:</label>
                        <input
                            type="number"
                            name="coverageAmount"
                            value={coverage.coverageAmount}
                            onChange={handleCoverageChange}
                            placeholder="Enter coverage amount"
                            required
                        />
                    </div>
                    <button type="button" onClick={addCoverage} className="btn-coverage">
                        Add Coverage
                    </button>
                </form>
            </div>
            {/* Coverage Details */}
            <div className="coverage-details">
                <h3 className="text-center font-semibold text-xl">Coverage Details</h3>
                {coverageList.length>0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coverageList.map((coverage, index) => (
                                    <tr key={index}>
                                        <td>{coverage.coverageType}</td>
                                        <td>{coverage.description}</td>
                                        <td>{coverage.coverageAmount}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                ):(
                    <p className="text-center">No coverage added yet.</p>
                )}
            </div>
        </div>
    )
}

export default AddPolicy;