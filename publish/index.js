const express = require('express');
const server = express();
//const cors = require('cors');
const mqtt = require('mqtt');
const { randomUUID } = require('crypto');

//server.use(cors());

//const uuid = require('uuid');

console.log("Publish starting...")

let options = {
    username: process.env.ACTIVE_MQ_PASSWORD,
    password: process.env.ACTIVE_MQ_PASSWORD,
    clientId: `publish_${randomUUID()}`,
    port: 1883
};

let topic = process.env.ACTIVE_MQ_TOPIC;

server.get("/publish/:id", async (req, res) => {
    const client = mqtt.connect(process.env.ACTIVE_MQ_ENDPOINT, options);
    let event = {
        id: req.params.id,
        message: "From Publish service"
    };
    client.on('connect', () => {
        console.log("Broker connected");
        client.publish(topic, JSON.stringify(event));
        client.end();
        res.json(event);
    });
    client.on('error', (error) => {
        console.log("Error");
    });
});

server.listen(3000, async () => { console.log("Server connected") });