## oss-upload-stream

[![npm version](https://img.shields.io/npm/v/oss-upload-stream.svg)](https://www.npmjs.com/package/oss-upload-stream)
[![cnpm version](https://npm.taobao.org/badge/v/oss-upload-stream.svg)](https://npm.taobao.org/package/oss-upload-stream)
[![Build Status](https://travis-ci.org/meteormatt/oss-upload-stream.svg?branch=master)](https://travis-ci.org/meteormatt/oss-upload-stream)
[![CodeShip Status](https://img.shields.io/codeship/9d423a50-5ace-0133-11b8-624f61fe64ff.svg)](https://codeship.com/projects/110510)
[![Dependency Status](https://david-dm.org/meteormatt/oss-upload-stream.svg)](https://david-dm.org/meteormatt/oss-upload-stream)
[![Coverage Status](https://coveralls.io/repos/meteormatt/oss-upload-stream/badge.svg?branch=master&service=github)](https://coveralls.io/github/meteormatt/oss-upload-stream?branch=master)

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

### 附录

本项目和[aliyun-oss-upload-stream](https://github.com/berwin/aliyun-oss-upload-stream)的区别.

`aliyun-oss-upload-stream`是从本项目fork出去的,增加了中文注释,然后改头换面,隐藏了出处.
![](http://ww4.sinaimg.cn/large/474ac5b3gw1ezoews1udtj20yk042dgl.jpg)
我个人认为开源项目应该保持fork的属性,并且指明出处