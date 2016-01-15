// Require the MQTT module as dependency
// Connect to the broker
var mqtt 	= require('mqtt');
var client  = mqtt.connect('mqtt://192.168.202.79', { clientId: 'testPublish-', clean: false });

client.on('connect', function () {
	console.log("Connected to broker");
});

// Publish data to topic 'test/mqtt', with Quality of service 1
// After this, log success to console and close the client
client.publish('test/mqtt', 'This is a test publish', { qos: 1 }, function () {
	console.log("Data published");
	client.end();
});