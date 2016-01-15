var mqtt = require('mqtt');

// MQTT
var client  = mqtt.connect(config.broker, { clientId: 'MAIN-', clean: false }); 
client.on('connect', function () {
	console.log("Connected to broker: ".green + config.broker);
	client.subscribe('arduino', { qos: 1 });
});
client.on('message', function (topic, message) { 
	//sensorData = JSON.parse(message);
	console.log("Message recived: ", message);
});

