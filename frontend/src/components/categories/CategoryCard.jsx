import React from 'react';

const CategoryCard = ({category}) => {
    return (
        <div className='category_card'>
            <a href={`/product-category/${category.CategoryName}`}>
                <div className='category_card_header'>
                    <img loading='lazy' className='category_card_header_image' src={category.categoryImage.url} alt={category.CategoryName} />
                </div>
                <div className='category_card_body'>
                    <h4 className='text-center'>{category.CategoryName.toUpperCase()} </h4>
                </div>
            </a>
        </div>
    );
}

export default CategoryCard;
