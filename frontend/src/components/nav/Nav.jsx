import React from 'react';
import './nav.css'
const Nav = ({currentUser}) => {
    return (
        <ul className='nav'>
            <li><a href="/">Home</a></li>
            <li><a href="/">About us</a></li>
            <li><a href="/">How to order</a></li>
            <li><a href="/product-category/deals">Deals</a></li>
            {currentUser && <li><a href="/my-account">My Account</a></li>}
        </ul>
    );
}

export default Nav;