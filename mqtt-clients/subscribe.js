var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://192.168.0.15',  { 
	clientId: 'testClient3-', 
	clean: false 
});

//Event listener confirming connection, and then subscribing the client. 
client.on('connect', function () {
	console.log('Connected to broker');
	client.subscribe('test/mqtt', { qos: 1 });
});

// Event listener looking for messages send from subscriptions
// 'message' is a buffer type
client.on('message', function (topic, message) { 
	console.log('Message received: ', message.toString());
});

