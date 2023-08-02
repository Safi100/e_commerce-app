import React, { useEffect, useState } from 'react';
import './header.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';
import Nav from '../nav/Nav';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MobileNav from '../nav/MobileNav';

const Header = () => {
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

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
                        <span className='cart'>
                            <ShoppingCartIcon style={{color: '#fff'}} />
                            <span className="cartCount">0</span>
                        </span>
                        <span className='menu' onClick={()=> setOpen(true)}><MenuOutlinedIcon style={{color: '#fff'}}/></span>
                    </div>
                </div>
                <div className="search_bar">
                    <input type="text" value={search} onChange={handleSearchInput} placeholder='Search for products'/>
                    <div onClick={()=> console.log("clicked")} className='search_btn'><SearchIcon /></div>
                    {(search.length >= 3) && <div className='search_cont'>
                        {products.length === 0  && <h3 className='text-danger text-center my-2'>No result found</h3>}
                        {products.map(product => (
                            <SearchResult product={product} key={product._id} />
                        ))}
                    </div>}
                </div>
                <div className="account">
                    <span className='cart'>
                        <ShoppingCartIcon style={{color: '#fff'}} />
                        <span className="cartCount">0</span>
                    </span>
                    <span className='User'><AccountCircleIcon style={{color: '#fff'}} /></span>
                    <span className='menu' onClick={()=> setOpen(true)}><MenuOutlinedIcon style={{color: '#fff'}}/></span>
                </div>
            </div>
            <Nav />
            <MobileNav open={open} setOpen={setOpen} />
        </div>
    );
}

export default Header;
