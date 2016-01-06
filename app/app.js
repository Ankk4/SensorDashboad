var fs       = require('fs');
var serial   = require('./serial.js');
var express  = require('express');
var	http     = require('http').Server(app);
var	io       = require('socket.io')(http);
var mongoose = require('mongoose');
var	app      = express();
var coms     = [];

app
    .use(express.static(__dirname + '/public'))
	.get('*', function (req, res) {
		res.sendFile(__dirname + '/public/main.html');
	 })
	.listen(7000);

//SERIAL CONNECTIONS

//Get port connections based on config file
for (var i = config.serialPorts.length - 1; i >= 0; i--) {
	coms.push(serial.serialPortConnection(config.serialPorts[i].name, config.serialPorts[i].baudrate));
};

//Create event listeners for data
for (var i = serialPorts.length - 1; i >= 0; i--) {
	coms[i].on('data', onData);
};

function onData(data) {
  console.log(data);
}

// db

// CONFIG FILE
var config = JSON.parse(fs.readFileSync("./config.json"));
fs.watchFile("./config.json", function(current, previous) {
	console.log("Config file changed!");
	config = JSON.parse(current);
	console.log("New config file:\n ", config);
});