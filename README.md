## oss-upload-stream

A pipeable write stream which uploads to Aliyun OSS using the multipart file upload API.

根据[s3-upload-stream](https://github.com/nathanpeck/s3-upload-stream)修改过来.
使用方法请参考[s3-upload-stream](https://github.com/nathanpeck/s3-upload-stream).
目前还在进行中.

样例代码请参考[examples/upload.js](https://github.com/meteormatt/oss-upload-stream/blob/master/examples/upload.js)

```js
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

// Pipe the incoming filestream through compression, and upload to Aliyun OSS.
read.pipe(upload);

```