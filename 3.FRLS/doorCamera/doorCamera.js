const file = process.argv[2];
if (file == null) {
    console.log('node doorCamera.js {image file}');
    process.exit();
}
const stream = require('fs').createReadStream('./'+file);
const awsIoT = require('aws-iot-device-sdk');
const doorCamera = awsIoT.device({
    keyPath: "./credentials/YOUR-private.pem.key",
    certPath: "./credentials/YOUR-certificate.pem.crt",
    caPath: "./credentials/rootCA.pem",
    clientId: "doorCamera",
    host: "YOUR-ats.iot.ap-northeast-2.amazonaws.com"
});
doorCamera.on('connect', () => {
    console.log('[doorCamera]: connected');

    const AWS = require('aws-sdk');
    AWS.config.region = 'ap-northeast-2';
    const S3 = new AWS.S3({
        'accessKeyId': 'YOUR_ACCESS_KEY',
        'secretAccessKey': 'YOUR_SECRET_KEY',
    });
    const params = {
        Bucket: 'visitor-face',
        Key: file,
        Body: stream,
    };
    S3.upload(params, (err,data) => {
        if (err) console.log(err);
        else {
            doorCamera.publish(
                'faceRecog/request',
                JSON.stringify({id:file}),
                (err,data) => {
                    if (err) console.log(err);
                    else console.log('[doorCamera]: requested');
                    setTimeout(process.exit, 1);
                }
            );
        }
    });
});
