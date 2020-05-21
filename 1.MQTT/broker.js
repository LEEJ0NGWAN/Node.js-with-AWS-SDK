var mqtt = require('mqtt');
var conn = mqtt.connect('mqtt://localhost');
conn.on('connect', () => {
    conn.subscribe('FILE');
    conn.subscribe('to_broker');
    console.log('[broker]: broker ready');
})
conn.on('message', (topic, message) => {
    if (topic == 'FILE') {
        conn.publish('INFO', message);
    }
    else {
        console.log('[broker]: delivering from sender to receiver');
        conn.publish('from_broker', message);
    }
})

