const Customer = require('../models/customer')
const Product = require('../models/product')

module.exports.addToCart = async (req, res) => {
    try{
        const quantity = req.query.quantity || 1
        const {productID} = req.body
        const customer = await Customer.findById(req.user.customer_id).populate('cart.items.product').exec();
        const productt = await Product.findById(productID);
        if(!productt){
            throw new Error('Product not found')
        }
        if(!productt.still_available){
            throw new Error('Product not available')
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
        customer.cart.total = customer.cart.total.toFixed(2)
        await customer.save();
        return res.status(200).json(customer.cart)
    }catch(e){
        res.status(500).json({error : e.message})
        console.log(e);
    }
}
module.exports.DeleteFromCart = async (req, res) => {
    try{
        const quantity = req.query.quantity || 1
        const {productID} = req.body
        const customer = await Customer.findById(req.user.customer_id)
        const productt = await Product.findById(productID)
        const existingProductIndex = customer.cart.items.findIndex(item => item.product._id.equals(productID))
        if(existingProductIndex == -1){
            throw new Error('Product not found in cart')
        }
        customer.cart.items[existingProductIndex].quantity -= Number(quantity);
        // keep only items with quantity greater than or equal to 1
        customer.cart.items = customer.cart.items.filter(item => item.quantity >= 1);
        customer.cart.total -= Number(productt.priceToPay * quantity)
        customer.cart.total = customer.cart.total.toFixed(2)
        await customer.save()
        res.status(200).json({success : true})
    }catch(e){
        res.status(500).json({error : e.message})
        console.log(e)
    }
}
module.exports.getCart = async (req, res) => {
    try{
        const customer = await Customer.findById(req.user.customer_id).populate('cart.items.product').exec()
        if(!customer){
            throw new Error('Customer not found')
        }
        res.status(200).json(customer.cart)
    }catch(e){
        res.status(500).json({error : e.message})
        console.log(e)
    }
}