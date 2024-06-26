const Review = require('../models/review')
const Customer = require('../models/customer')
const Product = require('../models/product')
const {cloudinary} = require('../cloudinary/index')

module.exports.CreateReview = async (req, res) => {
    try{
        const {title, rating, body, productID} = req.body
        const customer = await Customer.findById(req.user.id)
        const product = await Product.findById(productID)
        
        if(!customer) throw new Error('Customer not found')
        if(!product) throw new Error('Product not found')
        const image = req.file ? { url: req.file.path, filename: req.file.filename } : null;
        const newReview = new Review({
            title: title.trim(),
            rating: rating,
            body: body.trim(),
            image,
            author: req.user.id,
            product: productID
        })
        await newReview.populate({path: 'author', select: 'first_name last_name'});

        customer.reviews.push(newReview)
        product.reviews.push(newReview)
    
        await newReview.save()
        await customer.save()
        await product.save()
    
        res.status(200).json({newReview})
    }catch(e){
        res.status(500).json({ error: e.message })
    }
}

module.exports.deleteReview = async (req, res) => {
    try{
        const reviewId = req.params.id
        const DeletedReview = await Review.findByIdAndDelete(reviewId)
        if(!DeletedReview) throw new Error("Review not found!")

        if(DeletedReview.image.filename){
            await cloudinary.uploader.destroy(DeletedReview.image.filename)
        }
        await Product.findByIdAndUpdate(DeletedReview.product, {$pull: { reviews: reviewId }})
        await Customer.findByIdAndUpdate(req.user.id , {$pull: { reviews: reviewId }})
        res.status(200).json(DeletedReview)
    }catch(e){
        res.status(400).json({error: e.message})
        console.log(e);
    }
}