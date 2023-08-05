const express = require('express')
const { SearchProduct, getFeatures, getNewArrivals, getProducts } = require('../controllers/product')
const router = express.Router({mergeParams: true})

router.route('/search')
.post(SearchProduct)

router.route('/cohsen_for_you')
.get(getFeatures)

router.route('/new_arrival')
.get(getNewArrivals)

router.route('/:category')
.get(getProducts)

module.exports = router