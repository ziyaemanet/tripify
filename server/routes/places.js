const router = require('express').Router();
const Places = require('../models/Places');

router.get('/', Places.search);

router.route('/location')
  .get((req, res) => {
    Places.getLocation(req.query, res.handleSend);
  });

module.exports = router;
