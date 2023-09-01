import React from 'react';
import Rating from '@mui/material/Rating';
import Axios from 'axios'


const Review = ({review, user, refetch, setRefetch}) => {

    const deleteReview = (e) => {
        Axios.delete(`http://localhost:8000/review/deleteReview/${review._id}`, {
            headers: {authorization: "Bearer " + user.token}
        })
        .then(res => {
            setRefetch(!refetch)
            if(res.status === 200){
                setRefetch(true)
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
            <p className="review-body">{review.body}</p>
            <p className="review-date">Posted on {new Date(review.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</p>
            {review.image.url && <img className="review-image" src={review.image.url} />}
            {user.id === review.author._id && <button className='btn btn-danger' onClick={deleteReview}>delete</button>}
      </div>
    );
}

export default Review;
