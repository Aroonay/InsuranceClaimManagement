import React, { useEffect, useState } from "react";
import myAxios from "../services/helper";
import { useNavigate } from "react-router";

const ViewCustomers = ({isSidebarOpen}) => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  
  useEffect(() => {
    myAxios
      .get("/api/admin")
      .then((response) => {
        console.log("Customers fetched:", response.data);
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }, []);

 
  const handleViewPolicies = (customerId) => {
    console.log(customerId);
    navigate(`/user-policy-details/${customerId}`);
  };

  return (
    <div className={`view-customers ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <h1 className="text-center font-bold text-2xl text-green-500">Customer List</h1>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.cusId}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button
                  className="view-policies-btn"
                  onClick={() => handleViewPolicies(customer.cusId)}
                >
                  View Policies
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewCustomers;
