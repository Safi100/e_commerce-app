const express = require('express')
const { create_checkout_session } = require('../controllers/order')
const router = express.Router({mergeParams: true})
const { authorization } = require('../middleware')

router.route('/create-checkout-session')
.post(authorization, create_checkout_session)

module.exports = router