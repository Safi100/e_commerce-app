import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import DollarIcom from '../../assets/dollar.png'
import './after_payment.css';
const Sucess = () => {
    const location = useLocation();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const session_id = query.get('session_id');
        console.log(session_id);
        if (session_id) {
            axios.post(`http://localhost:8000/order/success-payment?session_id=${session_id}`)
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    console.error('Error processing payment success:', error);
                    setError(true);
                    setMessage('There was an error processing your payment.');
                });
        } else {
            setError(true);
            setMessage('No session ID provided.')
        }
    }, [location.search]);
    return (
        <div className='success_payment_container py-5'>
            <div className="wrapper">
                {error && <>
                <h2 className='text-danger'>{message}</h2>
                <div><a className='button' href='/'>Continue Shopping</a></div>
                </>
                }
                {!error &&
                <div className='success_payment'>
                    <div className='icon'><img src={DollarIcom} alt="usd icon" /></div>
                    <div>
                        <h3>Payment successful</h3>
                        <p>Thanks for your payment!</p>
                    </div>
                    <div><a className='button' href='/'>Continue Shopping</a></div>
                </div>
            }
            </div>
        </div>
    );
}

export default Sucess;
