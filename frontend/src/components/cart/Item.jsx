import {react, useContext, useState} from 'react';
import {CartContext} from '../../context/CartContext';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

const Item = ({item, index}) => {
    const [itemQuantity, setItemQuantity] = useState(item.quantity);
    const cartContext = useContext(CartContext);
    const addOneToCart = (e) => {
        setItemQuantity(itemQuantity + 1);
        cartContext.addToCart(item.product._id)
    }
    const removeOneFromCart = (e) => {
        if(itemQuantity > 1){
            setItemQuantity(itemQuantity - 1);
            cartContext.removeFromCart(item.product._id)
        }
    }
    const RemoveItem = (e) => {
        cartContext.removeFromCart(item.product._id, item.quantity)
    }
    return (
        <div className='cart_product'>
        <div>
            <p className={index === 0 ? "mb-5 text-secondary" : "hide"} >PRODUCT DETAILS</p>
            <div className='cart_product_info'>
                <div className='cart_product_image'><img src={item.product.images[0].url} alt={item.product.title} /></div>
                <div>
                    <p className='cart_product_title mb-2'>{item.product.title}</p>
                    {item.product.discount > 0 ? 
                     <p className='cart_product_discount'>{item.product.discount}% off</p> :
                     <p className='text-danger'>No discount</p>}
                     <button className='removeBtn' onClick={RemoveItem} >Remove</button>
                </div>
            </div>
        </div>
        <div>
            <p className={index === 0 ? "mb-5 text-secondary text-center" : "hide"} >QUANTITY</p>
            <div className='quantity_div'>
                <button className='quantityBtn' onClick={removeOneFromCart}><RemoveOutlinedIcon /></button>
                <span className='quantity'>{item.quantity}</span>
                <button className='quantityBtn' onClick={addOneToCart}><AddOutlinedIcon /></button>
            </div>
        </div>
        <div>
            <p className={index === 0 ? "mb-5 text-secondary" : "hide"} >PRICE</p>
            <div>
                {item.product.discount > 0 && <p className='mb-0 text-decoration-line-through text-secondary'>${item.product.price}</p>}
                <p className='mb-0'>${item.product.priceToPay}</p>
            </div>
        </div>
        <div>
            <p className={index === 0 ? "mb-5 text-secondary" : "hide"} >TOTAL</p>
            <div>
                ${(item.quantity * item.product.priceToPay).toFixed(2)}
            </div>
        </div>
    </div>
    );
}

export default Item;
