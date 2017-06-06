const router = require('express').Router();

router.use('/places', require('./places'));
router.use('/images', require('./images'));

module.exports = router;
