import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import Axios from 'axios';

// Create the CustomerContext with an initial value of an empty array
export const CustomerContext = createContext([]);
export const CustomerContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    if(user && user.token) {
      fetchCustomerData(); // Fetch customer data initially
    }
  }, []);

  // Function to fetch customer data
  const fetchCustomerData = () => {
    Axios.get('http://localhost:8000/user/', {
      headers: { Authorization: "Bearer " + user.token }
    })
    .then(res => {

      setCustomer(res.data);
    })
    .catch(err => {
      console.error("Error fetching customer:", err);
      // Handle the error here and possibly set an error state
    });
  };
  const editAddress = (address) => {
    console.log(address);
    Axios.put('http://localhost:8000/user/editAddress', address, {
      headers: { Authorization: "Bearer " + user.token }
    })
   .then(res => {
      fetchCustomerData()
   })
   .catch(err => {
      console.error("Error editing address:", err); 
   })
  }
  const deleteReview = (review) => {
    console.log(review);
    Axios.delete(`http://localhost:8000/review/deleteReview/${review._id}`, {
        headers: {authorization: "Bearer " + user.token}
    })
    .then(res => {
        if(res.status === 200){
          fetchCustomerData()
        }
    })
}

  // Return the context value
  const contextValue = { customer, editAddress, deleteReview };

  return (
    <CustomerContext.Provider value={contextValue}>
      {children}
    </CustomerContext.Provider>
  );
}

// Export the useCustomer hook
export const useCustomer = () => {
  const { customer } = useContext(CustomerContext);
  return customer;
}
