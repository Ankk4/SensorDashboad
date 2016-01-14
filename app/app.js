'use strict';
var fs       = require('fs'),
	os		 = require('os'),
    colors   = require('colors'),
    express  = require('express'),
    app      = express(),
    server   = require('http').Server(app),
    io       = require('socket.io')(server),
    mongoose = require('mongoose'),
    mqtt 	 = require('mqtt');

// Config
var config = JSON.parse(fs.readFileSync('./config.json'));
 fs.watchFile('./config.json', function(current, previous) {
	console.log('Config file changed!');
	config = JSON.parse(current);
	console.log('New config file:\n ', config);
});

//Express and Sockets
app
	.use(express.static(__dirname + '/public'))
	.get('/', function (req, res) {
		res.sendFile(__dirname + '/public/main.html');
	});

server.listen(config.port, function(){
    console.log('Webserver listening to: '.green + config.port);
});

io.on('connection', function(socket){
    console.log('User connected'.gray);
    socket.on('disconnect', function () {
    	console.log('User disconnected'.gray);
	});
});

io.emit('sensorData', { will: 'be received by everyone'});

// MQTT
var client  = mqtt.connect(config.broker, { clientId: 'MAIN-', clean: false }); 
client.on('connect', function () {
	console.log("Connected to broker: ".green + config.broker);
	client.subscribe('arduino', { qos: 1 });
});
client.on('message', function (topic, message) {  
	console.log('Received message:',  message.toString());
});

//https://nodejs.org/dist/latest-v5.x/docs/api/os.html
//https://nodejs.org/api/process.html#process_process_uptime
var systemData = {
	'hostname' 		: '',
	'arch'	   		: '',
	'platform' 		: '',
	'cpu-model'		: '',
	'cpu-count'		: '',
	'totalmemory'	: '',
	'freememory'	: '',
	'loadavg'		: '',
	'systemuptime'	: '',
	'appuptime'		: ''
};

