const Product = require('../models/product')

module.exports.SearchProduct = async (req, res) => {
    try{
        const {title} = req.query
        const products = await Product.find({ title: { $regex: new RegExp(title, "i") }})
        res.status(200).json(products)
    }catch(e){
        console.log(e);
    }
}

module.exports.getFeatures = async (req, res) => {
    try{
        const products = await Product.find({ chose_for_you: true}).limit(6)
        res.status(200).json(products)
    }catch(e){
        console.log(e);
    }
}