import React, { useEffect, useState } from 'react';
import './reviews.css'
import Review from './Review';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Axios from 'axios'

const Reviews = ({currentUser, product, setProduct, productID}) => {
    const [rating, setRating] = useState(0)
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedImageDisplay, setSelectedImageDisplay] = useState('');
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    })
    
    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0])
        if(e.target.files.length !== 0){
            setSelectedImageDisplay(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const text = value.trimStart();
        setFormData((prevData) => ({
            ...prevData,
            [name]: text
        }))
    }
    const AddReview = (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        if(rating === 0) {
            setError("Please rate before submit");
            return ;
        } 
        let Data = new FormData()
        Data.append('title', formData.title)
        Data.append('body', formData.body)
        Data.append('review_image', selectedImage)
        Data.append('rating', rating)
        Data.append('productID', productID)

        Axios.post('http://localhost:8000/review/addReview', Data)
        .then(res => {
            if(res.status === 200){
                e.target.reset()
                setFormData({
                    title: '',
                    body: '',
                })
                setRating(0)
                setSelectedImage('')
                setSelectedImageDisplay('')
                setError('')
                setSuccess('Review added successfully')
                setProduct({...product, reviews: [...product.reviews, res.data.newReview]})
            }
        })
        .catch((err) => {
            console.log(err)
            setError(err.response.data.error)
        })
    }
    return (
        <div className='review_dev mt-5'>
            {currentUser &&
            <form className='review-form-container__parent' onSubmit={AddReview}>
                <div className="review-form-container">
                    <h2 className="review-header">Write a Review</h2>
                    <div className="rating-stars">
                        <Box sx={{ '& > legend': { mt: 2 },}} >
                            <Rating value={rating} name='rating' onChange={(e, value)=> setRating(value || 0)} required/>
                        </Box>
                    </div>
                    <input type="text" onChange={handleInputChange}  className='review-text' value={formData.title} name='title' placeholder='Write your review heading...' required/>
                    <textarea value={formData.body} onChange={handleInputChange} name='body' className="review-textarea" placeholder="Write your review here..."  required/>
                    <div className="image-upload mb-4">
                        <div className='control_image mb-2'>
                            <p className='mb-0'>*You can only upload one image</p>
                            {selectedImage && <button onClick={() => {setSelectedImage(''); setSelectedImageDisplay('') }} 
                            className='btn btn-outline-danger' type='button'>delete Image</button>}
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageChange}/>
                        {selectedImage && <img className='review_SelectedImage' src={selectedImageDisplay} alt={selectedImage.name}/>}
                    </div>
                    {error && <p className='text-danger'>{error}</p>}
                    {success && <p className='text-success'>{success}</p>}
                    <button className="submit-button">Submit Review</button>
                </div>
            </form>}
            {product.reviews?.length > 0 && <div className='reviews'>
                <h3 className='fs-4 mb-3'>All Reviews ({product.reviews?.length})</h3>
                <div className="reviews_container">
                    {product.reviews?.map(review => (
                        <Review setProduct={setProduct} product={product} review={review} currentUser={currentUser} key={review._id} />
                    ))}
                </div>
            </div>
            }
        </div>
    );
}

export default Reviews;
