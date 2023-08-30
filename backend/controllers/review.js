const Review = require('../models/review')
const Customer = require('../models/customer')
const Product = require('../models/product')

module.exports.CreateReview = async (req, res) => {
    try{
        const {title, rating, body, productID} = req.body

        const customer = await Customer.findById(req.user.customer_id)
        const product = await Product.findById(productID)
        
        if(!customer) throw new Error('Customer not found')
        if(!product) throw new Error('Product not found')

        const newReview = new Review({
            title: title.trim(),
            rating: rating,
            body: body.trim(),
            author: req.user.customer_id,
            product: productID
        })

        customer.reviews.push(newReview)
        product.reviews.push(newReview)
    
        await newReview.save()
        await customer.save()
        await product.save()
    
        res.json(req.body)
    }catch(e){
        res.status(500).json({error: e.error})
    }
}