#!/usr/bin/env node
var ALY      = require('aliyun-sdk'),
    zlib     = require('zlib'),
    fs       = require('fs');

// Make sure AWS credentials are loaded.
var config = require('./config.json');

// Initialize a stream client.
var s3Stream = require('../lib/s3-upload-stream.js')(new ALY.OSS(config));

// Create the streams
var read = fs.createReadStream('/Users/Meteor/备份/LibreOffice_5.0.1_MacOS_x86-64.dmg');
var upload = s3Stream.upload({
  "Bucket": "gkstorage2",
  "Key": 'test.jpg'
});

// Handle errors.
upload.on('error', function (error) {
  console.log(error);
});

// Handle progress.
upload.on('part', function (details) {
  console.log(details);
});

// Handle upload completion.
upload.on('uploaded', function (details) {
  console.log(details);
});

// Pipe the incoming filestream through compression, and up to S3.
read.pipe(upload);
