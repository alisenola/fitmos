/* eslint-disable */
const async = require('async');
const AWS = require('aws-sdk');
const fs = require('fs');
const im = require('imagemagick');
const s3 = new AWS.S3();

function getImageType(objectContentType) {
  if (objectContentType === 'img/jpeg') {
    return 'jpeg';
  } else if (objectContentType === 'img/png') {
    return 'png';
  } else {
    throw new Error('unsupported objectContentType ' + objectContentType);
  }
}

function cross(left, right) {
  var res = [];
  left.forEach(function (l) {
    right.forEach(function (r) {
      res.push([l, r]);
    });
  });
  return res;
}

exports.handler = function (event, context) {
  console.log('event ', JSON.stringify(event));
  async.mapLimit(event.Records, true, function (record, cb) {
    var originalKey = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
    s3.getObject({
      'Bucket': record.s3.bucket.name,
      'Key': originalKey,
    }, function (err, data) {
      if (err) {
        cb(err);
      } else {
        cb(null, {
          originalKey,
          'contentType': data.ContentType,
          'imageType': getImageType(data.ContentType),
          'buffer': data.Body,
          record,
        });
      }
    });
  }, function (err, images) {
    if (err) {
      context.fail(err);
    } else {
      var resizePairs = cross([100, 400], images);
      async.eachLimit(resizePairs, true, function (resizePair, cb) {
        var config = resizePair[0];
        var image = resizePair[1];
        const resizedFile = `/tmp/resized.${(image.imageType || 'png')}`;
        const croppedFile = `/tmp/cropped.${(image.imageType || 'png')}`;

        var wstream = fs.writeFileSync(resizedFile, image.buffer);

        im.convert([resizedFile, '-resize', `${config}x${config}^`, '-crop', `${config}x${config}+0+0`, croppedFile], (err, stdout) => {
          if (err) {
            cb(err);
          } else {
            console.log('Resize operation completed successfully');
            const buffer = fs.readFileSync(croppedFile);
            var parts = image.originalKey.split('/');
            parts.splice(0, 1);
            var path = `resized/${config}/${parts.join('/')}`;
            console.log('PATH', path);
            s3.putObject({
              'Bucket': image.record.s3.bucket.name,
              'Key': path,
              'Body': buffer,
              'ContentType': image.contentType,
              'ACL': 'public-read',
            }, function (err) {
              cb(err);
            });
          }
        });
      });
    }
  }, function (err) {
    if (err) {
      context.fail(err);
    } else {
      context.succeed();
    }
  });
};
