#!/usr/bin/env node
var ALY      = require('aliyun-sdk'),
    fs       = require('fs');

// Make sure Aliyun credentials are loaded.
var config = require('./config.json');

// Initialize a stream client.
var s3Stream = require('../lib/oss-upload-stream.js')(new ALY.OSS(config));

// Create the streams
var read = fs.createReadStream('文件路径');
var upload = s3Stream.upload({
  "Bucket": "你的bucket",
  "Key": '文件名称'
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

// Pipe the incoming filestream through compression, and up to Aliyun OSS.
read.pipe(upload);
