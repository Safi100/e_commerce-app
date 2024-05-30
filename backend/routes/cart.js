const express = require('express')
const { addToCart, getCart, DeleteFromCart, clearCart } = require('../controllers/cart')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.route('/')
.get(authorization, getCart)

router.route('/addToCart')
.post(authorization, addToCart)

router.route('/deleteFromCart')
.delete(authorization, DeleteFromCart)

router.route('/clear-cart')
.delete(authorization, clearCart)

module.exports = router