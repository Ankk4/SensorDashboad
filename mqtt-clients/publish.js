var mqtt 	= require('mqtt'),
	serial 	= require('./serial.js'),
	fs      = require('fs'),
	colors  = require('colors');

// Config
var config = JSON.parse(fs.readFileSync('./config.json'));
 fs.watchFile('./config.json', function(current, previous) {
	console.log('Config file changed!');
	config = JSON.parse(current);
	console.log('New config file:\n ', config);
});

// MQTT
var client  = mqtt.connect(config.broker, { clientId: 'arduino001-', clean: false });

client.on('connect', function () {
	console.log("Connected to broker: ".green + config.broker);
	/*for (var i = config.subscriptions.length - 1; i >= 0; i--) {
		client.subscribe(config.subscriptions[i], { qos: 1 });
	};*/
});
client.on('message', function (topic, message) {  
	console.log('Received message: ',  message.toString());
});

//Serial port connections
//Get port connections based on config file
var coms = [];
for (var i = config.serialPorts.length - 1; i >= 0; i--) {
	coms.push(serial.serialPortConnection(config.serialPorts[i].name, config.serialPorts[i].baudrate));
};

//Create event listeners for data
for (var i = coms.length - 1; i >= 0; i--) {
	coms[i].on('data', onData);
};

function onData(data) {
	try {
		var o = JSON.parse(data);
		if (o && typeof o === "object" && o !== null) {
			//If indeed is JSON
		    client.publish('arduino', data, { qos: 1 }, function () {
		    	console.log("Data published");
		    });
		}
	}
    catch (e) {
    	console.log("Data error: ".red + e);
    }
    return false;
}