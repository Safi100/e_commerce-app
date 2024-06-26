import React, { useContext, useEffect, useState } from 'react';
import './header.css'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import Axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';
import Nav from '../nav/Nav';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MobileNav from '../nav/MobileNav';
import AccountMenu from '../../components/AccountMenu'
import {AuthContext} from '../../context/AuthContext'
import Cart from '../cart/Cart';
import { CartContext } from '../../context/CartContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid #2a9d8f`,
      padding: '0 4px',
    },
}));

const Header = () => {
    const cartContext = useContext(CartContext).cart;
    const {currentUser} = useContext(AuthContext)
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [openCart, setOpenCart] = useState(false)

    const handleSearchInput = async (e) => {
        e.preventDefault()
        const text = e.target.value.trimStart()
        setSearch(text);
    }
    useEffect(()=> {
        if(search.length >= 3){
            Axios.post(`http://localhost:8000/product/search?title=${search}`)
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
        }else{
            setProducts([])
        }
    }, [search])
    return (
        <div className='header'>
            <div className='header_top'>
                <div className="logo">
                    <a href="/">E-COMMERCE</a>
                    <div className='mobile_account'>
                    {currentUser &&
                    <span className='cart'>
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartContext.cartQuantity} color="secondary" max={9}>
                            <ShoppingCartIcon style={{color:'#fff'}}/>
                        </StyledBadge>
                    </IconButton>
                    </span>
                    }
                        <span className='menu' onClick={()=> setOpen(true)}><MenuOutlinedIcon style={{color: '#fff'}}/></span>
                    </div>
                </div>
                <div className="search_bar">
                    <input type="text" value={search} onChange={handleSearchInput} placeholder='Search for products'/>
                    <div className='search_btn'><SearchIcon /></div>
                    {(search.length >= 3) && <div className='search_cont'>
                        {products.length === 0  && <h3 className='text-danger text-center my-2'>No result found</h3>}
                        {products.map(product => (
                            <SearchResult product={product} key={product._id} />
                        ))}
                    </div>}
                </div>
                <div className="account">
                {currentUser &&
                    <span className='cart' onClick={()=> setOpenCart(true)} >
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={cartContext.cartQuantity} color="secondary" max={9}>
                            <ShoppingCartIcon style={{color:'#fff'}}/>
                        </StyledBadge>
                    </IconButton>
                    </span>
                }
                    {currentUser && <AccountMenu />}
                    {!currentUser && 
                        <div className='d-flex gap-2'>
                            <a className='logReg_btn' href="/register">Register</a>
                            <a className='logReg_btn' href="/login">Login</a>
                        </div>
                    }
                    <span className='menu' onClick={()=> setOpen(true)}><MenuOutlinedIcon style={{color: '#fff'}}/></span>
                </div>
            </div>
            <Nav currentUser={currentUser} />
            <MobileNav open={open} setOpen={setOpen} currentUser={currentUser}/>
            {currentUser && <Cart cart={cartContext} setOpenCart={setOpenCart} openCart={openCart} />}
        </div>
    );
}

export default Header;
