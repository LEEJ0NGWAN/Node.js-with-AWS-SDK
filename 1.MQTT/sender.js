var file = process.argv[2]; //file name
var host = process.argv[3]; //broker host
if (file == null || host == null) {
    console.log('node sender.js {file name} {broker ip}');
    process.exit();
}

var fs = require('fs');
var mqtt = require('mqtt');

var conn = mqtt.connect('mqtt://13.124.141.168');

conn.on('connect', () => {
    console.log('[sender]: broker connection success');
    conn.publish('FILE', file);

    let input = fs.createReadStream(file);
    input.on('data', (chunk) => {
        conn.publish('to_broker', chunk);
        console.log('[sender]: sending to broker...');
    })
    input.on('close', () => {
        conn.publish('FILE', '');
        console.log('[sender]: finish sending to broker!');
        conn.end();
    })
})

