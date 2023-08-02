const express = require('express')
const { SearchProduct, getFeatures } = require('../controllers/product')
const router = express.Router({mergeParams: true})

router.route('/search')
.post(SearchProduct)

router.route('/feature')
.get(getFeatures)

module.exports = router