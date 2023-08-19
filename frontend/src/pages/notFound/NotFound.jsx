import React from 'react';
import NotFoundIcon from '../../assets/notFound.png'
import './notFound.css'
const NotFound = () => {
    return (
        <div className='notFound wrapper'>
            <img className='notfound_image' src={NotFoundIcon} alt="NotFound Icon" />
            <h3>Back to <a className='link' href="/">Home page</a></h3>
        </div>
    );
}

export default NotFound;
