const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    'accessKeyId': 'accessKey',
    'secretAccessKey': 'secretKey',
});

exports.handler = async (event) => {
    const upload_params = {
        Bucket: event.bucket,
        Key: event.key,
        ACL: 'public-read',
        Body: JSON.stringify(event.load),
    };
    
    await s3.upload(upload_params, (err, data) => {
        if (err) {
            return {
                statusCode: 400,
                body: {},
            }
        }
        else {
            return {
                statusCode: 200,
                body: upload_params,
            }
        }
    }).promise();
};