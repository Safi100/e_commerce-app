const express = require('express')
const { getCategories } = require('../controllers/category')

const router = express.Router({mergeParams: true})

router.route('/')
.get(getCategories)

module.exports = router