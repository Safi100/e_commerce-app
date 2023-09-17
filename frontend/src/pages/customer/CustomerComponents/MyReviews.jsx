import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../context/AuthContext';
import ReviewCard from './ReviewCard';
const MyReviews = ({reviews}) => {
    const {user} = useContext(AuthContext)

    const [open, setOpen] = useState(false)
    const handleClick = (open) => {
        setOpen(!open)
    }
    return ( <>
        {!reviews && <h3 className='text-danger'>There's no reviews yet...</h3>}
        <div className='reviews_container'>
            { reviews.map( (review) => (
                <ReviewCard review={review} user={user} key={review._id} />
            ))}
        </div>
    </> );
}

export default MyReviews;