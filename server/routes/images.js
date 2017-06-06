const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const Image = require('../models/image');
// const path = require('path');


const router = new express.Router();

router.get('/', (req, res) => {
  Image.find({}, (err, images) => {
    res.status(err ? 400 : 200).send(err || images);
  });
});

router.post('/', upload.single('image'), (req, res) => {
  Image.upload(req.file, (err, image) => {
    res.status(err ? 400 : 200).send(err || image);
  });
});


module.exports = router;
