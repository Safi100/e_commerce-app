import {React, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Axios from 'axios';
import './productProfile.css'
import NoImage from '../../assets/image-placeholder.png'
// import NoImagee from '../../assets'

const ProductProfile = () => {
    const { id } = useParams()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [product, setProduct] = useState({})

    useEffect(()=> {
        Axios.get(`http://localhost:8000/product/product-profile/${id}`)
        .then(res => {
            console.log(res);
            setProduct(res.data)
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    
    return (
        <div className='wrapper py-3'>
            <p className='breadcrumb'>
                <a href="/">Home</a>
                <span>{'>'}</span>
                <a href={`/product-category/${product.category?.CategoryName}`}>{product.category?.CategoryName}</a>
            </p>
            <div className='productProfile_row'>
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
                <form className="product_info" onSubmit={console.log(this)}>
                    <h2 className='product_title'>{product.title}</h2>
                    <p>stars, {product.reviews?.length}</p>
                    <div className='mt-2'>
                        <div className="price">
                            <span className='fs-2'><sup className='sign fs-5'>$</sup>{product.priceToPay}</span>
                            {(product.discount > 0 ) && <div className='ProductDiscount'>{`${product.discount}% off`}</div>}       
                        </div>
                        {(product.price !== product.priceToPay ) ? <p className='priceBefore text-secondary'>List price: <span className='originalPrice'>${product.price}</span></p> : ""}
                    </div>
                    {product.still_available ? <div className='Stock text-success'>In Stock</div> : <div className='Stock text-danger'>Out of Stock</div>}
                    <button onClick={()=> console.log(this)} disabled={product.still_available}  className={`CartBtn ${!product.still_available && 'OutOfStockBtn'}`}>Add to Cart</button>
                </form>
            </div>
        </div>
    );
}

export default ProductProfile;
