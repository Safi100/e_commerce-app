const Customer = require('../models/customer')
const Product = require('../models/product')

module.exports.addToCart = async (req, res) => {
    try{
        const quantity = req.query.quantity || 1
        const {productId} = req.body
        const customer = await Customer.findById(req.user.customer_id).populate('cart.items.product').exec();
        const productt = await Product.findById(productId);
        if(!productt){
            throw new Error('Product not found')
        }
        const existingProductIndex = customer.cart.items.findIndex(item =>item.product._id.equals(productt._id));
            if (existingProductIndex !== -1) {
                // Increment the quantity of the existing product
                customer.cart.items[existingProductIndex].quantity += Number(quantity);
            } else {
                // Add the new product to the cart
                customer.cart.items.push({
                    product: productt,
                    quantity: quantity,
            });
        }
        customer.cart.total += Number(productt.priceToPay * quantity);
        await customer.save();
        return res.status(200).json(customer.cart)
    }catch(e){
        res.status(500).json({error : e.message})
        console.log(e);
    }
}