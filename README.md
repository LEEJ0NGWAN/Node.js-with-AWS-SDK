# Node.js with SDK   
## 1. MQTT   


EC2 setting   
```
sudo apt update   
sudo apt install nodejs   
sudo apt install npm   
npm install mqtt   
```

Topic   
```
FILE: sender가 broker에게 파일의 시작이나 끝을 알리기 위한 토픽   
to_broker: sender가 broker에게 파일 내용을 전송하기 위한 토픽   

INFO: broker가 receiver에게 파일의 시작이나 끝을 알리기 위한 토픽   
from_broker: broker가 receiver에게 파일 내용을 전송하기 위한 토픽   
```

### sender   
복사하려는 파일을 broker로 보내는 애플리케이션   
```
node sender.js {전송하려는 파일} {broker의 ip}   
```

### broker   
파일 복제본을 수신하려는 애플리케이션들이 subscribe하는 토픽으로 파일을 publish하는 애플리케이션   
```
node broker.js   
```

### receiver   
복제된 파일을 수신하려는 애플리케이션   
```
node receiver.js {broker의 ip}   
```


## 2. Lambda+S3   


### index   
입력 받은 payload 데이터를 내용으로 갖는 S3 object를 S3에 업로드 하는 람다   
입력 받는 이벤트의 형식은 다음과 같습니다   
```
event = {   
    bucket, // 업로드 되는 S3 Object의 버킷   
    key,   // 업로드 되는 S3 Object의 키   
    load, // 업로드 되는 S3 Object의 내용   
}   
```

### invoker   
S3 Object를 생성해서 S3에 업로드하는 람다를 호출하는 애플리케이션   
```
node invoker.js {호출하려는 람다 이름} {버킷 이름} {키 이름} [S3 오브젝트 내용 ...]   
```


## 3. FRLS (Face Recognition Lambda Service)   


### design   
![Alt text](/3.FRLS/design.png)   

### FRLS   
입력 받은 payload의 키값을 파일이름으로 하는 이미지 S3 오브젝트와 참조 대상이 되는 이미지 S3 오브젝트를 비교하기 위해 AWS Face Rekognition으로 요청을 보내는 람다   
입력 받는 이벤트의 형식은 다음과 같습니다   
```
event = {
    id, // 비교 대상이 되는 인물의 이미지 S3 오브젝트 키값(파일이름)   
}
```
얼굴 비교 결과를 faceRecog/notify/door1 토픽으로 publish합니다   
publish하는 객체의 형식은 다음과 같습니다   
```
{
    image: 일치하는 이미지 이름 || unknown(일치하는 참조 대상이 없을 경우),   
    command: unlock || lock,   
}
```

### doorCamera   
비교하고자 하는 이미지 파일을 S3 오브젝트로 업로드하고 faceRecog/request 토픽으로 publish하는 애플리케이션   
```
node doorCamera.js {이미지 파일}
```

### doorLock   
faceRecog/notify/door1 토픽을 subscribe하는 애플리케이션   
command에 따라 unlock 또는 lock을 출력   
