import React from 'react';
import DollarIcom from '../../assets/dollar.png'
import './after_payment.css';
const Sucess = () => {
    return (
        <div className='success_payment_container py-5'>
            <div className="wrapper">
                <div className='success_payment'>
                    <div className='icon'><img src={DollarIcom} alt="usd icon" /></div>
                    <div>
                        <h3>Payment successful</h3>
                        <p>Thanks for your payment!</p>
                    </div>
                    <div><a className='button' href='/'>Continue Shopping</a></div>
                </div>
            </div>
        </div>
    );
}

export default Sucess;
