import React, { useEffect, useState } from 'react';
import './reviews.css'
import Rating from '@mui/material/Rating';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Axios from 'axios'

const Review = ({review, product, setProduct, currentUser}) => {
    const [open, setOpen] = useState(false)
    const handleClick = (open) => {
        setOpen(!open)
    }
    const deleteReview = (e) => {
        Axios.delete(`http://localhost:8000/review/deleteReview/${review._id}`)
        .then(res => {
            if(res.status === 200){
                setProduct({...product, reviews: product.reviews.filter(revieww => revieww._id !== review._id)})
            }
        })
    }
    
    return (
        <div className="review-card">
            <div className='d-flex justify-content-between'>
                <h2 className="review-title">{review.title}</h2>
                <div className="review-rating"><Rating name="read-only" value={review.rating} readOnly /></div>
            </div>
            <p className="review-author">By {`${review?.author.first_name} ${review?.author.last_name}`}</p>
            <p className="review-date">Posted on {new Date(review.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
            <div className="review_body">
                <div className={((review.body.length < 200) && !review.image.url) ? "" : (!open && "cut")} >
                    <p>{review.body}</p>
                    {review.image.url && <img className='review_image' src={review.image.url} alt="" /> }
                </div>
            </div>
            <div className="review_footer">
                {((review.body.length < 200) && !review.image.url) ? "" : 
                <p onClick={()=> {handleClick(open)}} className='read_more_btn'>{(open === false) ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon /> } 
                <span className='read_more'>Read {(open === false) ? "more" : "less" }</span></p>}
            </div>
            {currentUser._id === review.author._id && <button className='btn btn-danger' onClick={deleteReview}>delete</button>}
      </div>
    );
}

export default Review;
