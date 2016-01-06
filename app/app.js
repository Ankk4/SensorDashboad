// CONFIG FILE
var fs = require('fs');
var config = JSON.parse(fs.readFileSync("./config.json"));
fs.watchFile("./config.json", function(current, previous) {
	console.log("Config file changed!");
	config = JSON.parse(current);
	console.log("New config file:\n ", config);
});

// EXPRESS APP
var express = require('express'),
	app		= express();

app
    .use(express.static(__dirname + '/public'))
	.get('*', function (req, res) {
		res.sendFile(__dirname + '/public/main.html');
	 })
	.listen(7000);

//SERIAL CONNECTIONS
var serialApp = require('./serialApp.js');
var serialPorts = [];

//Get port connections based on config file
for (var i = config.serialPorts.length - 1; i >= 0; i--) {
	serialPorts.push(serialApp.serialPortConnection(config.serialPorts[i].name, config.serialPorts[i].baudrate));
};

//Create event listeners for data
for (var i = serialPorts.length - 1; i >= 0; i--) {
	serialPorts[i].on('data', onData);
};

function onData(data) {
  console.log(data);
}

// db
