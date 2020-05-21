var host = process.argv[2]; //broker host

if (host == null) {
    console.log('node sender.js {broker ip}');
    process.exit();
}

var mqtt = require('mqtt');
var conn = mqtt.connect('mqtt://13.124.141.168');
conn.on('connect', () => {
    conn.subscribe('INFO');
    conn.subscribe('from_broker');
    console.log('[receiver]: broker connection success.');
})

var fs = require('fs');
conn.on('message', (topic, message) => {
    if (topic == 'INFO') {
        if (message == ''){
            console.log('[receiver]: finish receiving from broker!');
            conn.end();
        }
        else {
            this.output = fs.createWriteStream('[COPY]'+message);
        }
    }
    else {
        this.output.write(message);
        console.log('[receiver]: receiving from broker');
    }
})

