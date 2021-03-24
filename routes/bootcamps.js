const express = require('express');
const {
    getBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsInRadius,
    bootcampPhotoUpload
} = require('../controllers/bootcamps');

// Middleware req
const Bootcamp = require('../models/Bootcamps');
const advancedResults = require('../middleware/advancedResults');

// Include other resources router
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resources routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance')
    .get(getBootcampsInRadius);

router.route('/:id/photo')
    .put(bootcampPhotoUpload);

router.route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(createBootcamp);

router.route('/:id')
    .get(getBootcamp)
    .put(updateBootcamp)
    .delete(deleteBootcamp);

module.exports = router;
