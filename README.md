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


