import React from 'react';
import './features.css'
const FeatureCard = ({feature}) => {
    return (
        <div className='featureCard'>
            <a href={`/product/${feature._id}`} className='featureCard_header'>
                <img className='featureCard_header_image' loading='lazy' src={feature.images[0].url} alt="" />
            </a>
            <div className="featureCard_body mt-3">
                <a href={`/product/${feature._id}`} className='featureCard_title'>{feature.title}</a>
                <div className='featureCard_price'>
                {feature.discount > 0 && <>
                    <span>${feature.priceToPay}</span>
                    <span className='original_price text-secondary'>${feature.price}</span>
                </>}
                {feature.discount === 0 && <span>${feature.priceToPay}</span>}
                </div>
            </div>
        </div>
    );
}

export default FeatureCard;
