const express = require('express')
const { getAdvertisementS } = require('../controllers/advertisement')
const router = express.Router({mergeParams: true})

router.route('/')
.get(getAdvertisementS)

module.exports = router