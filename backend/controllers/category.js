const Category = require('../models/category')

module.exports.getCategories = async (req, res) => {
    const categories = await Category.find()
    res.json(categories)
}