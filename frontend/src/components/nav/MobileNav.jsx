import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const MobileNav = ({open, setOpen}) => {
    return (
        <>
            {open && <div className='backdrop-overlay'></div>}
            <div className={`mobile-nav ${open && 'active'}`}>
                <div>
                    <div className='mobile-nav_header'>
                        <div className='mobile-nav_header_account'>
                            <div><a href="/register">Register</a></div>
                            <div className="line"></div>
                            <div><a href="/login">Login</a></div>
                        </div>
                        <div onClick={()=> setOpen(false)}><CloseOutlinedIcon /></div>    
                    </div>
                    <ul className='mobile-nav-ul'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About us</a></li>
                        <li><a href="/">How to order</a></li>
                        <li><a href="/product/deals">Deals</a></li>
                        <li><a href="/">Write a complaint</a></li>
                        <li><a href="/">My Orders</a></li>
                        <li className='logout'><button><LogoutOutlinedIcon /> Logout</button></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MobileNav;
