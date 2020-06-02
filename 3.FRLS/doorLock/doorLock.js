const awsIoT = require('aws-iot-device-sdk');
const doorLock = awsIoT.device({
    keyPath: "./credentials/YOUR-private.pem.key",
    certPath: "./credentials/YOUR-certificate.pem.crt",
    caPath: "./credentials/rootCA.pem",
    clientId: "doorLock",
    host: "YOUR-ats.iot.ap-northeast-2.amazonaws.com"
});
doorLock.on('connect', () => {
    doorLock.subscribe('faceRecog/notify/door1', (err,data)=>{
        console.log('[doorLock]: connected');
    });
});
doorLock.on('message', (topic, msg) =>{
    let load = JSON.parse(msg);
    console.log('[doorLock]: ' + load.command + 'ed ' + '('+load.image+')');
});