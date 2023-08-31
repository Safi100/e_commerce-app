const express = require('express')
const { CreateReview, productReview, deleteReview } = require('../controllers/review')
const router = express.Router({mergeParams: true})
const { authorization, isReviewAuthor } = require('../middleware')

router.route('/addReview')
.post(authorization, CreateReview)

router.route('/productReview/:id')
.get(productReview)

router.route('/deleteReview/:id')
.delete(authorization, isReviewAuthor, deleteReview)

module.exports = router