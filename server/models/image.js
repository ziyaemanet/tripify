const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const path = require('path');
const uuid = require('uuid');

const BUCKET_NAME = 'tripify-image-bucket';
const AWS_URL_BASE = 'https://s3-us-west-1.amazonaws.com';

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  Key: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

imageSchema.statics.upload = function(fileObj, cb) {
  const { originalname, buffer } = fileObj;
  const ext = path.extname(originalname);
  const Key = uuid() + ext;
  const params = {
    Bucket: BUCKET_NAME,
    Key,
    ACL: 'public-read',
    Body: buffer,
  };

  // save data to mongodb
  s3.putObject(params, (err, result) => {
    if (err) return cb(err);
    const url = `${AWS_URL_BASE}/${BUCKET_NAME}/${Key}`;
    this.create({ name: originalname, url, Key }, cb);
  });
};

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
