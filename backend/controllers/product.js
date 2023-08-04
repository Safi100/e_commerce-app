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
        console.log(products);
        res.status(200).json(products)
    }catch(e){
        console.log(e);
    }
}

module.exports.getNewArrivals = async (req, res) => {
    try{
        var start = new Date();
        start.setHours(0,0,0,0);
        
        var end = new Date();
        end.setHours(23,59,59,999);

        const product = await Product.find({createdAt: {$gte: start, $lt: end}}).limit(4)
        res.status(200).json(product)
    }catch(e){
        console.log(e);
    }
}