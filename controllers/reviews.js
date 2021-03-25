const ErrorResponse = require('../Utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamps = require('../models/Bootcamps');
const advancedResults = require('../middleware/advancedResults');

// @desc        Get reviews
// @route       GET /api/v1/reviews
// @route       GET /api/v1/bootcamps/:bootcampId/reviews
// @access      Public
exports.getReviews = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const reviews = await Review.find({ bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } else {
        return res.status(200).json(res.advancedResults);
    }
});
