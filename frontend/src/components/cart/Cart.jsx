import React, { useState, useEffect, useContext } from 'react';
import {CartContext} from '../../context/CartContext';
import Axios from 'axios';
import Item from './Item';
import Arrow from '@mui/icons-material/KeyboardBackspaceOutlined';
import { loadStripe } from '@stripe/stripe-js';
import './cart.css';

const Cart = ({cart, setOpenCart, openCart}) => {
    const cartContext = useContext(CartContext);
    const [DeliveryCost, setDeliveryCost] = useState(cart.total >= 300 ? 0 : 20);
    const [totalCost, setTotalCost] = useState(0)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Recalculate totalCost whenever DeliveryCost or cart.total changes
        const newTotalCost = Number(cart.total) + Number(DeliveryCost);
        setTotalCost(newTotalCost);
    }, [DeliveryCost, cart.total]);

    // Update DeliveryCost when cart.total changes
    useEffect(() => {
        const updatedDeliveryCost = cart.total >= 300 ? 0 : 20;
        setDeliveryCost(updatedDeliveryCost);
    }, [cart.total]);

    
    const goToCheckOut = async () => {
        setLoading(true);
        const stripePromise = loadStripe("pk_test_51NptvaKDY5agNltgMHRegPmk1DFjJuok4VDi8hdKSjCvqWeUZhRVJadpQJiEO9W8T44wg8vJE1LLme1RNpuvScuv00PoXqXWev");
        const stripe = await stripePromise;
        const response = await Axios.post('http://localhost:8000/order/create-checkout-session');
        const result = await stripe.redirectToCheckout({ sessionId: response.data.id });
        console.log(result);
        setLoading(false);
        if (result.error) {
            console.error(result.error.message);
        }
        // cartContext.clearCart();
    }

    return (
        <div className={`cartBOX ${openCart == true ? 'showCart' : '' }`}>
            {cart.cartQuantity === 0 && <div className='CartEmpty'>
                <h2>Cart is empty</h2>
                <button className='CloseCartBtn' onClick={()=> setOpenCart(false)}><Arrow /> Continue Shopping</button>
            </div>}
            {cart.cartQuantity > 0 && 
            <>
                <div className='items_container'>
                    <div className='cart_heading'><span className='cart_heading_title'>Shopping Cart</span> <span className='cart_items_count'>{`${cart.items.length} ${cart.items.length > 1 ? 'Items': 'Item'}`}</span></div>
                    <div className='product_info_cont'>
                        <div className='products_row'>
                            {cart.items.map((item, index) => (
                                <Item item={item} index={index} key={index} />
                            ))}
                        </div>
                    </div>
                    <button className='CloseCartBtn' onClick={()=> setOpenCart(false)}><Arrow /> Continue Shopping</button>
                </div>
                <div className='check_out'>
                    <h2>Order Summary</h2>
                    <div className='order_info'>
                        <div className='price'>
                            <div>
                                <span>SUB TOTAL</span>
                                <span>${cart.total.toFixed(2)}</span>
                            </div>
                            <div>
                                <span>SHIPPING</span>
                                <span>${DeliveryCost}</span>
                            </div>
                        </div>
                        <div className="shipping_promo mb-4">
                            <div className='shipping mb-5'>
                            <p className='mb-3 fw-bold shipping_note'>SHIPPING IS FREE FOR ORDER COST 300$ OR MORE</p>
                            </div>
                            <div className='PromoCode mb-5'>
                                <p className='fw-bold'>PROMO CODE (soon)</p>
                                <input type="text" className='p-2 px-3' placeholder='Enter yor code (Soon...)' disabled />
                            </div>
                        </div>
                        <div className="check-out_btn">
                            <div className='totalCost'>
                                <span>TOTAL COST</span>
                                <span>${totalCost.toFixed(2)}</span>
                            </div>
                            <button className='mt-5 w-100 py-2' onClick={goToCheckOut}>
                                {!loading && "CHECKOUT"}
                                {loading && <div class="spinner-border" role="status"></div>}
                                
                            </button>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    );
}

export default Cart;
