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
