var mqtt 	= require('mqtt'),
	serial 	= require('./serial.js'),
	fs      = require('fs'),
	colors  = require('colors');

// Config
var config = JSON.parse(fs.readFileSync('./config.json'));
var connected = false;

// MQTT
var client  = mqtt.connect(config.broker, { clientId: config.clientId + '-', clean: true });
client.on('connect', function () {
	console.log("Connected to broker: ".green + config.broker);
	connected = true;
});

//Publish with MQTT
function sendToBroker (topic, payload) {
	client.publish(topic, payload, { qos: 1 }, function () {
		console.log("Data published: ".green, payload);
	});
}    

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
	//Oma funktio tälle jossain vaiheessa
	try {
		var o = JSON.parse(data);
		if (o && typeof o === "object" && o !== null) {
			for (var i = 0; i < config.publish.length; i++) {
				if(config.publish[i].topic.indexOf(getKeys(o[i])) > -1) {
					sendToBroker(config.publish[i].topic, JSON.stringify(o[i]));
				}
				else
					console.log("Your json dosent match with your publish scheme.".red);
			}
    	}
	}
    catch (e) {
    	console.log("Data error: ".red + e);
    }
    return false;
}

function getKeys(obj) {
	var str = [];
	for(var key in obj)
		str.push(key);
	return str;
}

