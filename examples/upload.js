#!/usr/bin/env node
var ALY      = require('aliyun-sdk'),
    fs       = require('fs');

// Make sure Aliyun credentials are loaded.
var config = require('./config.json');

// Initialize a stream client.
var ossStream = require('../lib/oss-upload-stream.js')(new ALY.OSS(config));

// Create the streams
var read = fs.createReadStream('文件路径');
var upload = ossStream.upload({
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
  var delta = (new Date() - startTime) / 1000;
  console.log(details);
  console.log('Completed upload in', delta, 'seconds');
});

// Pipe the incoming filestream and upload to Aliyun OSS.
read.pipe(upload);
var startTime = new Date();
