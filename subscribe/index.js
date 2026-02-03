const mqtt = require('mqtt');
const { randomUUID } = require('crypto');
//const uuid = require('uuid');

let options = {
    username: process.env.ACTIVE_MQ_USERNAME,
    password: process.env.ACTIVE_MQ_PASSWORD,
    clientId: `subscribe_${randomUUID()}`,
    port: 1883
};

console.log("Subscriber starting...");

let topic = process.env.ACTIVE_MQ_TOPIC;

console.log(options);
console.log(process.env.ACTIVE_MQ_ENDPOINT);

const client = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT, options);

client.on('connect', () => {
    client.subscribe(topic);
});

let message = null;

client.on('message', (topic, res) => {
    console.log(`Message received on ${topic}`);
    message = res.toString();
    console.log(`Message received: ${message}`);
});