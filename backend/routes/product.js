const express = require('express')
const { SearchProduct, getFeatures, getNewArrivals } = require('../controllers/product')
const router = express.Router({mergeParams: true})

router.route('/search')
.post(SearchProduct)

router.route('/cohsen_for_you')
.get(getFeatures)

router.route('/new_arrival')
.get(getNewArrivals)
module.exports = router