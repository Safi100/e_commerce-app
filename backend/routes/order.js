const express = require('express')
const { create_checkout_session, success_payment, fetch_orders } = require('../controllers/order')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.route('/create-checkout-session')
.post(authorization, create_checkout_session)

router.route('/success-payment')
.post(authorization, success_payment)

router.route('/fetch-orders')
.get(authorization, fetch_orders)

module.exports = router