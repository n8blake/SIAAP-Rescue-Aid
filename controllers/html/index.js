const router = require('express').Router();

const home = require('./home');
const listingRoute = require('./listingRoute');

router.use('/', home);

router.use('/listing', listingRoute);

module.exports = router;