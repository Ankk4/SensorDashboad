'use strict';
var fs      	= require('fs'),
	os 			= require('os'),
    colors   	= require('colors'),
    mongoose 	= require('mongoose'),
    mqtt 	 	= require('mqtt'),
    express  	= require('express'),
    path		= require('path'),
    cookieParser= require('cookie-parser'),
    bodyParser 	= require('body-parser');

// Socket.IO binding to express
var app 	= express(),
    server  = require('http').Server(app),
    io     	= require('socket.io')(server);

var sensorData = [];

// Config
var config = JSON.parse(fs.readFileSync(__dirname + '/config.json'));
 fs.watchFile(__dirname + '/config.json', function(current, previous) {
	console.log('Config file changed!');
	config = JSON.parse(current);
	console.log('New config file:\n ', config);
});

//Express Middleware
app
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({extended: true}))
	.use(cookieParser())
	.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/public/main.html')
});

//404 if routes not found (must be last one)
app.use(function(req, res, next) {
	res.status(404).send('Page not found');
});

server.listen(config.port, function(){
    console.log('Webserver listening to: '.green + config.port);
});

// Socket connections and emits
io.on('connection', function(socket){
    console.log('User connected'.gray);
	io.emit('sensorData', sensorData);

	socket.on('getData', function (from, msg) {
    	console.log('Sending data to ', from);
    	socket.emit('sensorData', sensorData);
 	});

    socket.on('disconnect', function () {
    	console.log('User disconnected'.gray);
	});
});


// MQTT
var client  = mqtt.connect(config.broker, { clientId: config.clientId + '-', clean: false }); 
client.on('connect', function () {
	console.log("Connected to broker: ".green + config.broker);
	if(config.subscribeAll === true) {
		client.subscribe('sensors/#', { qos: 1 });
	}
	else {
		for (var i = config.subscriptions.length - 1; i >= 0; i--) {
			client.subscribe(config.subscriptions[i], { qos: 1 });
			console.log(config.subscriptions[i]);
		}
	}
});

client.on('message', function (topic, message) { 
	sensorData = JSON.parse(message);
	console.log(sensorData);
    console.log('Message get: ', message.toString());
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

