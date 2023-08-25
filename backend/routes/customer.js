const express = require('express')
const { CreateAccount } = require('../controllers/customer')
const router = express.Router({mergeParams: true})

router.route('/register')
.post(CreateAccount)

module.exports = router