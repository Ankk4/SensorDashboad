"use strict";
var fs       = require('fs'),
    colors   = require('colors'),
    serial   = require('./serial.js'),
    express  = require('express'),
    app      = express(),
    server   = require('http').Server(app);
    io       = require('socket.io')(server),
    mongoose = require('mongoose');

// Config
var config = JSON.parse(fs.readFileSync("./config.json"));
 fs.watchFile("./config.json", function(current, previous) {
	console.log("Config file changed!");
	config = JSON.parse(current);
	console.log("New config file:\n ", config);
});

//Express and Sockets
app
	.use(express.static(__dirname + '/public'))
	.get('/', function (req, res) {
		res.sendFile(__dirname + '/public/main.html');
	});
server.listen(config.port, function(){
    console.log("Webserver listening to: ".green + config.port);
});
io.on('connection', function(socket){
    console.log('User connected'.gray);
    socket.on('disconnect', function () {
    	console.log('User disconnected'.gray);
	});
});

io.emit('sensorData', { will: 'be received by everyone'});


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
			//console.log(colors.green(data));
		}
	}
    catch (e) {
    	console.log("Data error: ".red + e);
    }
    return false;
}

// db

