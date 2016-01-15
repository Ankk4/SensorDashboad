// Require the MQTT module as dependency
// Connect to the broker - clientId is connected to a queue
var mqtt 	= require('mqtt');
var client  = mqtt.connect('mqtt://192.168.0.15:1883', { 
	clientId: 'testClient2-', 
	clean: false
});

client.on('connect', function () {  
	console.log('Connected')
});

// Publish data to topic 'test/mqtt', with Quality of service 1
// After this, log success to console and close the client
// Do it every second
setInterval(function(){
	client.publish('test/mqtt', 'This is from client 2.', { qos: 1 }, function() {
		console.log('Message published from client 2.')
	});
}, 1000);


