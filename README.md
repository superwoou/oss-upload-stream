## oss-upload-stream

A pipeable write stream which uploads to Aliyun OSS using the multipart file upload API.

Fork from [s3-upload-stream](https://github.com/nathanpeck/s3-upload-stream).

### 介绍

阿里云官方的Node.js SDK [aliyun-sdk](https://github.com/aliyun-UED/aliyun-sdk-js) 不支持`stream`方式上传文件到OSS. 
所以我尝试修改了[s3-upload-stream](https://github.com/nathanpeck/s3-upload-stream), 然后移植在[aliyun-sdk](https://github.com/aliyun-UED/aliyun-sdk-js)上.

项目取名`oss-upload-stream`, 并发布到`npm`上.

### 样例

样例代码请参考[examples/upload.js](https://github.com/meteormatt/oss-upload-stream/blob/master/examples/upload.js)

```js
#!/usr/bin/env node
var ALY = require('aliyun-sdk'),
    fs = require('fs');

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
```

### 安装

```
npm install oss-upload-stream
```

### 测试

```
npm test
```

### 许可证

[Mozilla 公共许可协议](http://mozillachina.github.io/MPL/)