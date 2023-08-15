import React from 'react';
import Deal from '../../components/deal/Deal';

const Product = ({product}) => {
    return (
        <div className='productCard'>
            <a href={`/product/product-profile/${product._id}`} className='productCard_header'>
                {product.discount > 0 && <Deal deal_percent={product.discount} />}
                <img className='productCard_header_image' loading='lazy' src={product.images[0].url} alt="" />
            </a>
            <div className="productCard_body mt-3">
                <a href={`/product/${product._id}`} className='productCard_title'>{product.title}</a>
                <div className='productCard_price'>
                {product.discount > 0 && <>
                    <span>${product.priceToPay}</span>
                    <span className='original_price text-secondary'>${product.price}</span>
                </>}
                {product.discount === 0 && <span>${product.priceToPay}</span>}
                </div>
            </div>
        </div>
    );
}

export default Product;
