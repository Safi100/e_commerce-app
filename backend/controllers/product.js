const Product = require('../models/product')
const Category = require('../models/category')
const Brand = require('../models/brand')

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
const items_per_page = 12;

module.exports.getProducts = async (req, res) => {
    try{
        const {brand} = req.query
        const page = req.query.page || 1;
        const skip = (page - 1) * items_per_page 

        const {category} = req.params

        const query = {}

        if (category === 'deals') {
            query['discount'] = { $gte: 1};
        }else{
            const categoryy = await Category.findOne({CategoryName: category})
            const CATEGORY_ID = categoryy._id
            query['category'] = CATEGORY_ID
        }

        if (brand) {
            const brandsIds = brand.split(",");
            query.brand = { $in: brandsIds };
          }

        const count = await Product.countDocuments(query)
        const products = await Product.find(query).limit(items_per_page).skip(skip)
        const brandIds = [...new Set(products.map(product => product.brand))];
        const brands = await Brand.find({ _id: { $in: brandIds } });

        const pageCount = count / items_per_page
        
        res.status(200).json({products, brands, count, PageCount:Math.ceil(pageCount) })
    }catch(e){
        console.log(e);
    }
}