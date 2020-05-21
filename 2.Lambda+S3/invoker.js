var name = process.argv[2];
var bucket = process.argv[3];
var key = process.argv[4];

if (name == null || bucket == null || key == null){
    console.log('node invokeLambda.js {lambda} {bucket} {key} [...]');
    process.exit();
}

var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';

var lambda = new AWS.Lambda({
    'accessKeyId': 'accessKey',
    'secretAccessKey': 'secretKey',
});

var load = JSON.stringify(process.argv.slice(5));
const payload = {
    'bucket': bucket,
    'key': key,
    'load': load,
};

var params = {
    FunctionName: name,     //invoke할 람다의 이름
    InvocationType: "RequestResponse",  //람다 invoke 방식
    Payload: JSON.stringify(payload) //해당 람다로 넘겨주는 JSON객체, 즉, 람다의 event가 됨
};

lambda.invoke(params, (err, data) => {
    if(err) console.log(err);
    else    console.log(JSON.parse(data.Payload).body);
});