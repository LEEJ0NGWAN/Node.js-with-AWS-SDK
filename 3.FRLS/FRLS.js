const AWS = require('aws-sdk');
const key = {
    'accessKeyId': 'YOUR_ACCESS_KEY',
    'secretAccessKey': 'YOUR_SECRET_KEY',
};
const rekog = new AWS.Rekognition(key);
key.endpoint = 'YOUR-ats.iot.ap-northeast-2.amazonaws.com';
const iotData = new AWS.IotData(key);

// doorCamera로부터 입력받는 이미지와 비교할 정답 이미지, 즉, 참조 대상들입니다.
// doorCamera로부터 입력받은 이미지가 다음 리스트의 원소에 해당되는 키값을 
// 가지는 참조 이미지의 인물과 일치하면 valid한 대상으로 판단합니다.
const faces = [
    'michiko.jpg',
    'V.jpg',
    'RM.jpg',
    'mina.jpg',
    'trump.jpg',
];

exports.handler = async (event) => {
    let params = {
        SourceImage: {
          S3Object: {
            Bucket: "reference-face",
          },
        },
        TargetImage: {
          S3Object: {
            Bucket: "visitor-face",
            Name: event.id,
          },
        },
        SimilarityThreshold: 85
    };
    
    let counter = 0;
    let res = await new Promise((resolve, reject) =>{
        for (let id of faces){
            params.SourceImage.S3Object.Name = id;
            rekog.compareFaces(params, (err, data) => {
                if (data.FaceMatches.length) {
                    resolve({
                        image: id,
                        command: 'unlock',
                    });
                }
                else {
                    if (++counter == faces.length) {
                        resolve({
                            image: 'unknown',
                            command: 'lock',
                        });
                    }
                }
            });
        }
    });
    params = {
        topic: 'faceRecog/notify/door1',
        payload: JSON.stringify(res),
        qos: 0,
    };
    await iotData.publish(params).promise();
    return {
        'statusCode': 200,
        'result': res,
    };
};
