import React, { useState, useEffect } from 'react';
import './cart.css';
import Item from './Item';
import Arrow from '@mui/icons-material/KeyboardBackspaceOutlined';

const Cart = ({cart, setOpenCart, openCart}) => {
    const [DeliveryCost, setDeliveryCost] = useState(cart.total >= 300 ? 0 : 10);
    const [totalCost, setTotalCost] = useState(0)
    useEffect(() => {
        // Recalculate totalCost whenever DeliveryCost or cart.total changes
        const newTotalCost = Number(cart.total) + Number(DeliveryCost);
        setTotalCost(newTotalCost);
      }, [DeliveryCost, cart.total]);

        // Update DeliveryCost when cart.total changes
        useEffect(() => {
            const updatedDeliveryCost = cart.total >= 300 ? 0 : 10;
            setDeliveryCost(updatedDeliveryCost);
        }, [cart.total]);

        // Handler to update DeliveryCost when the dropdown value changes
        const handleDeliveryCostChange = (e) => {
            setDeliveryCost(Number(e.target.value));
        };

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
                        <div className='items_with_price'>
                            <span>SUB TOTAL</span>
                            <span>${cart.total.toFixed(2)}</span>
                        </div>
                        <div className="shipping_promo mb-4">
                            <div className='shipping mb-5'>
                            <p className='mb-3 fw-bold'>SHIPPING</p>
                                <select className='p-2 px-3' name="" value={DeliveryCost} onChange={handleDeliveryCostChange}>
                                    {cart.total >= 300 ? (
                                        <>
                                        <option value={0}>Free Economy Delivery (3-5 days)</option>
                                        <option value={10}>Standard Delivery (1-3 days) - $10</option>
                                        <option value={30}>Same-Day Delivery - $30</option>
                                        </>
                                    ) : (
                                        <>
                                        <option value={10}>Economy Delivery (3-5 days) - $10</option>
                                        <option value={30}>Standard Delivery (1-5 days) - $30</option>
                                        <option value={50}>Same-Day Delivery - $50</option>
                                        </>
                                    )}
                                </select>
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
                            <button className='mt-5 w-100 py-2'>CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    );
}

export default Cart;
