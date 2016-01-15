var mqtt = require('mqtt');

// MQTT
var client  = mqtt.connect('mqtt://192.168.202.79', { clientId: 'testSubscription-', clean: false });
client.on('connect', function () {
	console.log("Connected to broker");
	client.subscribe('#', { qos: 1 });
});
client.on('message', function (topic, message) { 
	//sensorData = JSON.parse(message);
	console.log("Message recived: ", message);
});

