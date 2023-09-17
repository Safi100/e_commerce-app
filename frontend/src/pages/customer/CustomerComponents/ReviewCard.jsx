import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {CustomerContext} from '../../../context/CustomerContext';
const ReviewCard = ({review, user}) => {
    const customerContext = useContext(CustomerContext);
    const [open, setOpen] = useState(false)
    const handleClick = (open) => {
        setOpen(!open)
    }
    const deleteReview = () => {
        customerContext.deleteReview(review)
    }
    return (
        <div className="review-card">
            <div className='d-flex justify-content-between'>
                <h2 className="review-title">{review.title}</h2>
                <div className="review-rating"><Rating name="read-only" value={review.rating} readOnly /></div>
            </div>
            <p className="review-date">Posted on {new Date(review.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})} for <a className='text-primary' href={`/product-profile/${review.product._id}`}>{review.product.brand.BrandName} {review.product.category.CategoryName}</a></p>
            <div className="review_body">
                <div className={((review.body.length < 200) && !review.image.url) ? "" : (!open && "cut")} >
                    <p>{review.body}</p>
                    {review.image.url && <img className='review_image' src={review.image.url} alt="" /> }
                </div>
            </div>
            <div className="review_footer">
                {((review.body.length < 200) && !review.image.url)  ? "" : <p onClick={()=> {handleClick(open)}} 
                className='read_more_btn'>{(open === false) ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon /> } 
                <span className='read_more'>Read {(open === false) ? "more" : "less" }</span></p>}
            </div>
            {user.id === review.author && <button className='btn btn-danger' onClick={deleteReview}>delete</button>}
        </div>
    );
}

export default ReviewCard;
