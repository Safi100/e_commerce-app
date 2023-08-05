import React from 'react';
import './nav.css'
const Nav = () => {
    return (
        <ul className='nav'>
            <li><a href="/">Home</a></li>
            <li><a href="/">About us</a></li>
            <li><a href="/">How to order</a></li>
            <li><a href="/product/deals">Deals</a></li>
            <li><a href="/">Write a complaint</a></li>
            <li><a href="/">My Orders</a></li>
        </ul>
    );
}

export default Nav;
