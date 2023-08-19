const express = require('express')
const { SearchProduct, getFeatures, getNewArrivals, getProducts, productProfile } = require('../controllers/product')
const router = express.Router({mergeParams: true})

router.route('/search')
.post(SearchProduct)

router.route('/cohsen_for_you')
.get(getFeatures)

router.route('/new_arrival')
.get(getNewArrivals)

router.route('/:category')
.get(getProducts)

router.route('/product-profile/:id')
.get(productProfile)

module.exports = router