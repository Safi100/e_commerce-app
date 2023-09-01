const express = require('express')
const { CreateReview, productReview, deleteReview } = require('../controllers/review')
const router = express.Router({mergeParams: true})
const { authorization, isReviewAuthor } = require('../middleware')
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({storage})

router.route('/addReview')
.post(authorization, upload.single('review_image'), CreateReview)

router.route('/deleteReview/:id')
.delete(authorization, isReviewAuthor, deleteReview)

module.exports = router