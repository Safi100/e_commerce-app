import React, { useState, useContext } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {AuthContext} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const MobileNav = ({open, setOpen, user}) => {
    const {dispatch} = React.useContext(AuthContext)
    const Navigate = useNavigate()
    const handleLogOut = (e) => {
        dispatch({type: "LOGOUT"})
        Navigate('/')
    }
    return (
        <>
            {open && <div className='backdrop-overlay'></div>}
            <div className={`mobile-nav ${open && 'active'}`}>
                <div>
                    {!user &&
                    <div className='mobile-nav_header'>
                        <div className='mobile-nav_header_account'>
                            <div><a href="/register">Register</a></div>
                            <div className="line"></div>
                            <div><a href="/login">Login</a></div>
                        </div>
                        <div onClick={()=> setOpen(false)}><CloseOutlinedIcon /></div>    
                    </div>
                    }
                    {user && <div onClick={()=> setOpen(false)}><CloseOutlinedIcon /></div>}    
                    <ul className='mobile-nav-ul'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About us</a></li>
                        <li><a href="/">How to order</a></li>
                        <li><a href="/product-category/deals">Deals</a></li>
                        {user && <li><a href="/my-account">My Account</a></li>}
                        {user && <li className='logout'><button onClick={handleLogOut}><LogoutOutlinedIcon /> Logout</button></li>}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default MobileNav;
