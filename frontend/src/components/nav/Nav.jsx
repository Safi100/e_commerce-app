import React from 'react';
import './nav.css'
const Nav = ({user}) => {
    return (
        <ul className='nav'>
            <li><a href="/">Home</a></li>
            <li><a href="/">About us</a></li>
            <li><a href="/">How to order</a></li>
            <li><a href="/product-category/deals">Deals</a></li>
            {user && <li><a href="/">Write a complaint</a></li>}
            {user && <li><a href="/">My Orders</a></li>}
        </ul>
    );
}

export default Nav;