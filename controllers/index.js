const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./html');
const unfoundRoute = require('./unfound');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('*', unfoundRoute);

module.exports = router;
