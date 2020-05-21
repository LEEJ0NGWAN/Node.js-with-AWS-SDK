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
node sender.js {전송하려는 파일} {broker의 ip}   

### broker   
node broker.js   

### receiver   
node receiver.js {broker의 ip}   