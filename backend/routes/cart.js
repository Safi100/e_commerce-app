const express = require('express')
const { addToCart, getCart } = require('../controllers/cart')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.route('/')
.get(authorization, getCart)

router.route('/addToCart')
.post(authorization, addToCart)


module.exports = router