import React from 'react';
import './searchResult.css'
const SearchResult = ({product}) => {
    return (
        <a className='searchRes' href={`/product-profile/${product._id}`}>
            <div className='image'><img loading='lazy' src={product.images[0].url} alt={product.title} /></div>
            <div className='searchRes_info'>
                <p className='title'>{product.title}</p>
                {(product.discount > 0 ) ? 
                <div className='price'>
                    <span className='PriceToPay'>${product.priceToPay}</span>
                    <span className='priceBeforeDiscount'>${product.price}</span>
                    <span className='discount'>{product.discount}%</span>
                </div> 
                : 
                <>
                <p className='price'>${product.priceToPay}</p>
                </>}
                
            </div>
        </a>
    );
}

export default SearchResult;
