import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import Axios from 'axios';

// Create the CustomerContext with an initial value of an empty array
export const CustomerContext = createContext([]);
export const CustomerContextProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [customer, setCustomer] = useState([]);

  // Function to fetch customer data
  const fetchCustomerData = () => {
    Axios.get('http://localhost:8000/user/renderProfile')
    .then(res => {
      setCustomer(res.data);
    })
    .catch(err => {
      console.error("Error fetching customer:", err);
      // Handle the error here and possibly set an error state
    });
  };
  const editAddress = (address) => {
    Axios.put('http://localhost:8000/user/editAddress', address)
    .then(res => {
        fetchCustomerData()
    })
    .catch(err => {
        console.error("Error editing address:", err); 
    })
  }
  const editCustomerData = (customer) => {
    const first_name = customer.first_name
    const last_name = customer.last_name
    Axios.put('http://localhost:8000/user/editCustomerData', {first_name, last_name})
    .then(res => {
      authContext.fetchCurrentUser();
    })
    .catch(err => {
      console.error("Error editing customer:", err); 
    })
  }
  const deleteReview = (review) => {
    console.log(review);
    Axios.delete(`http://localhost:8000/review/deleteReview/${review._id}`)
    .then(res => {
        if(res.status === 200){
          fetchCustomerData()
        }
    })
}

  // Return the context value
  const contextValue = { customer, editAddress, deleteReview, editCustomerData, fetchCustomerData };

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
