import React from 'react';
import './footer.css'
const Footer = () => {
    return (
        <footer className='mt-auto'>
            <div className="wrapper">
                <ul className='footer_nav'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">About us</a></li>
                    <li><a href="/">How to order</a></li>
                    <li><a href="/product-category/deals">Deals</a></li>
                    <li><a href="/my-account">My Account</a></li>
                </ul>
                <div className='footer_row'>
                    <div className='col'>
                        <h3>Suggested Categories</h3>
                        <ul>
                            <li><a href="/product-category/laptop">Laptops</a></li>
                            <li><a href="/product-category/monitors">Monitors</a></li>
                            <li><a href="/product-category/tv">Television</a></li>
                            <li><a href="/product-category/graphic%20card">Graphic cards</a></li>
                        </ul>
                    </div>
                    <div className='col'>
                        <h3>Call us</h3>
                        <ul>
                            <li><a href="">+970592481601</a></li>
                            <li><a href="">safinafi12@gmail.com</a></li>
                            <li><a href=""></a></li>
                        </ul>
                    </div>
                    <div className='col'>
                        <h3>Social media</h3>
                        <ul>
                            <li><a href="">facebook</a></li>
                            <li><a href="">Twitter</a></li>
                            <li><a href="">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
