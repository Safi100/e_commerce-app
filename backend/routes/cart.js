const express = require('express')
const { addToCart } = require('../controllers/cart')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')
router.route('/addToCart')
.post(authorization, addToCart)


module.exports = router