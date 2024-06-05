const express = require('express')
const { addToCart, getCart, DeleteFromCart } = require('../controllers/cart')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.route('/')
.get(authorization, getCart)

router.route('/addToCart')
.post(authorization, addToCart)

router.route('/deleteFromCart')
.delete(authorization, DeleteFromCart)

module.exports = router