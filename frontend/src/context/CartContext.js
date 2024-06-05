import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import Axios from 'axios';

// Create the CartContext with an initial value of an empty array
export const CartContext = createContext([]);

export const CartContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if(currentUser) {
      fetchCartData(); // Fetch cart data initially
    }
  }, [currentUser]);

  // Function to fetch cart data
  const fetchCartData = () => {
    Axios.get('http://localhost:8000/cart')
    .then(res => {
      let cartQuantity = 0
      res.data.items.forEach(item => {
        cartQuantity += item.quantity
      })
      setCart({...res.data, cartQuantity});
    })
    .catch(err => {
      console.error("Error fetching cart:", err);
      // Handle the error here and possibly set an error state
    });
  };

  // Function to add an item to the cart
  const addToCart = (productID, quantity=1 ) => {
    if(currentUser) {
      Axios.post(`http://localhost:8000/cart/addToCart?quantity=${quantity}`, {productID})
      .then(() => {
        // After adding the item to the cart, refetch the cart data to update the cart state
        fetchCartData();
      })
      .catch(err => {
          console.log(err);
      })
    }else{
      console.log("User not logged in");
    }
  };

  const removeFromCart = (productID, quantity=1 ) => {
    Axios.delete(`http://localhost:8000/cart/deleteFromCart?quantity=${quantity}`, { data: { productID }})
    .then(() => {
      // After adding the item to the cart, refetch the cart data to update the cart state
      fetchCartData();
    })
    .catch(err => {
        console.log(err);
    })
  }
  const contextValue = { cart, addToCart, removeFromCart };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Export the useCart hook
export const useCart = () => {
  const { cart } = useContext(CartContext);
  return cart;
}
