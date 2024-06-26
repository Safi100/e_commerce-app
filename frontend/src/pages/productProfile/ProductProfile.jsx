import {React, useEffect, useState, useContext, useCallback} from 'react';
import {useParams} from 'react-router-dom'
import Axios from 'axios';
import './productProfile.css'
import NoImage from '../../assets/image-placeholder.png'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Rating from '@mui/material/Rating';
import Reviews from '../../components/reviews/Reviews';
import {AuthContext} from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext';
// import NoImagee from '../../assets'
const ProductProfile = () => {
    const {currentUser} = useContext(AuthContext)
    const { id } = useParams()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const cart = useContext(CartContext)

    useEffect(()=> {
        Axios.get(`http://localhost:8000/product/product-profile/${id}`)
        .then(res => {
            setProduct(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const HandleSubmit = (e) => {
        e.preventDefault()
        cart.addToCart(id, quantity)

    }
    return (
        <div className='wrapper py-3'>
            <p className='breadcrumb'>
                <a href="/">Home</a>
                <span>{'>'}</span>
                <a href={`/product-category/${product.category?.CategoryName}`}>{product.category?.CategoryName}</a>
            </p>
            <div className='productProfile_row'>
                <div className='thumbnails_cont'>
                <div className="thumbnails">
                    <div className="selected__photo">
                    {product.images?.length > 0 ? 
                        <img src={product.images[selectedIndex].url} alt={`${product.images[selectedIndex].url}`} />
                        :<img src={NoImage} alt={`product have no images`} /> }
                    </div>
                    <div className="group__photo">
                        {product.images?.map((image, index) => (
                            <div onClick={()=> setSelectedIndex(index)} className={`img__div ${(selectedIndex === index) ? "selected" : ""}`} key={image._id}>
                                <img className={(selectedIndex === index) ? "selected__inside" : ""} src={image.url} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                
                </div>
                <form className="product_info" onSubmit={HandleSubmit}>
                    <h2 className='product_title'>{product.title}</h2>
                    <p className='rating'>
                        <span className='d-flex'>{product.average_rating} <Rating name="read-only" value={product.average_rating ?? ""} precision={0.1} readOnly /></span>
                        <span>{product.reviews?.length} ratings</span>
                        </p>
                    <div className='mt-2'>
                        <div className="price">
                            <span className='fs-2'><sup className='sign fs-5'>$</sup>{product.priceToPay}</span>
                            {(product.discount > 0 ) && <div className='ProductDiscount'>{`${product.discount}% off`}</div>}       
                        </div>
                        {(product.price !== product.priceToPay ) ? <p className='priceBefore text-secondary'>List price: <span className='originalPrice'>${product.price}</span></p> : ""}
                    </div>
                    {product.still_available ? <div className='Stock text-success'>In Stock</div> : <div className='Stock text-danger'>Out of Stock</div>}
                    {currentUser && product.still_available && 
                        <>
                            <div className='counter_div'>
                                <span className='counter_control' onClick={()=> quantity < 10 && setQuantity(quantity+1)}><AddOutlinedIcon /></span>
                                <span>{quantity}</span>
                                <span className='counter_control' onClick={()=> quantity > 1 && setQuantity(quantity-1)}><RemoveOutlinedIcon /></span>
                            </div>
                            <button type='submit' disabled={!product.still_available} className="CartBtn" >Add to Cart</button>
                        </>                
                    }
                    <hr />
                    <div>
                        <h3 className='mb-3'>Product description</h3>
                        <div className='product_description' >
                        {product.description?.split(/\r\n|\n/).map((line, index) => (
                        <div className='d-flex mb-2' key={index}>
                            <li className='dot_list'></li>
                            <>{line}</>
                            </div>
                        ))}
                        </div>
                    </div>
                </form>
                <div>
                </div>
            </div>
            <Reviews currentUser={currentUser} setProduct={setProduct} product={product} productID={id} />
        </div>
    );
}

export default ProductProfile;
