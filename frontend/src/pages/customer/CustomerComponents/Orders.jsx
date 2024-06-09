import React, { useEffect, useState } from 'react';
import axios from 'axios'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [openOrder, setOpenOrder] = useState({});
    useEffect(() => {
        axios.get('http://localhost:8000/order/fetch-orders')
        .then(res => {
            setOrders(res.data)
            setLoading(false)
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const toggleAddress = (orderId) => {
        setOpenOrder(prevState => ({
            ...prevState,
            [orderId]: !prevState[orderId]
        }));
    };

    return (
        <>
        {loading ?
            <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
                <div className="spinner-border text-success" role="status"></div>
            </div> 
            :
            <div className='orders'>
                <h2>Your Orders ({orders.length})</h2>
                {orders.length > 0 ? 
                orders.map(order => (
                    <div className='order card' key={order._id}>
                        <div className='card-header d-flex gap-5'>
                            <div className='d-flex flex-column'>
                                <span>ORDER PLACED</span>
                                <span>{formatDate(order.createdAt)}</span>
                            </div>
                            <div className='d-flex flex-column'>
                                <span>TOTAL</span>
                                <span>${order.total_price}</span>
                            </div>
                            <div className='d-flex flex-column position-relative' role="button" onClick={() => toggleAddress(order._id)}>
                                <span>SHIPING ADDRESS</span>
                                <span>{openOrder[order._id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</span>
                                {openOrder[order._id] && <div className='address'>
                                    <p className='m-0'>{order.address.recipient_name}</p>
                                    <p className='m-0'>{order.address.street_address}</p>
                                    <p className='m-0'>{order.address.city}</p>
                                    <p className='m-0'>{order.address.postal_code}</p>
                                    <p className='m-0'>{order.address.phone_number}</p>
                                </div>}
                            </div>
                        </div>
                        <div className='order_items card-body'>
                            {order.items.map(item => (
                                <div className='d-flex order gap-4 order_item_info' key={item.product._id}>
                                    <a className='d-flex align-items-center' href={`/product-profile/${item.product._id}`}>
                                        <img src={item.product.images[0].url} alt={item.product._id} />
                                    </a>
                                    <div>
                                        <a href={`/product-profile/${item.product._id}`}>{item.product.title}</a>
                                        <p className='mt-2'>${item.price_when_order} x {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
                :
                <h2 className='text-danger'>You have no orders.</h2> 
                }
            </div>
        }
        </>
    );
}
export default Orders;
