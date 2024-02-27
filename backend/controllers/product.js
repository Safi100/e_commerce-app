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
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3); // Get the date 3 days ago
        
        var end = new Date();
        end.setHours(23,59,59,999);

        const products = await Product.find({createdAt: { $gte: threeDaysAgo }});

        res.status(200).json(products);
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


        const pageCount = count / items_per_page
        
        res.status(200).json({products, count, PageCount:Math.ceil(pageCount) })
    }catch(e){
        console.log(e);
    }
}

module.exports.getAllBrands = async (req, res) => {
    try{
        const {category} = req.query

        const query = {}

        if (category === 'deals') {
            query['discount'] = { $gte: 1};
        }else{
            const categoryy = await Category.findOne({CategoryName: category});
            query['category'] = categoryy._id;
        }

        // Find all products that match the query
        const products = await Product.find(query).lean();
        const brandIds = [...new Set(products.map(product => product.brand))];
        const brands = await Brand.find({ _id: { $in: brandIds } })

        res.json(brands);
    }catch(e){
        console.log(e);
    }
}

module.exports.productProfile = async (req, res) => {
    try{
        const id = req.params.id

        const product = await Product.findById(id).populate('category').populate({path:'reviews', populate:{path:'author'}})
        if(product){
            res.status(200).json(product)
        }else{
            res.status(400).json({error: "product not found"})
        }
    }catch(e){
        res.status(500).json({error: e})
        console.log(e);
    }
}