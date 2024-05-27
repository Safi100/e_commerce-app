const jwt = require('jsonwebtoken')
const Review = require('./models/review')

module.exports.authorization = (req, res, next) => {
    const token = req.headers.authorization || req.cookies.accessToken;
    if (!token) throw new Error('You must log in to access this');

    const secret_key = process.env.SECRET_KEY
    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token is not valid!' });
        req.user = user;
        next();
    });
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const reviewId = req.params.id
    const review = await Review.findById(reviewId)
    if(review && !review.author.equals(req.user.id)){
        return res.status(400).json({error: "You don't have permission to delete this review!"}) 
    }
    return next()
}