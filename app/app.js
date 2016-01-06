var fs       = require('fs');
var colors   = require('colors');
var serial   = require('./serial.js');
var express  = require('express');
var	http     = require('http').Server(app);
var	io       = require('socket.io')(http);
var mongoose = require('mongoose');

// CONFIG FILE
var config = JSON.parse(fs.readFileSync("./config.json"));
fs.watchFile("./config.json", function(current, previous) {
	console.log("Config file changed!");
	config = JSON.parse(current);
	console.log("New config file:\n ", config);
});

//Create the express app
var	app = express();
app
    .use(express.static(__dirname + '/public'))
	.get('/', function (req, res) {
		res.sendFile(__dirname + '/public/main.html');
	 })
	.listen(7000);

//Sockets
io.on('connect', function(socket){
	console.log('a user has connected'.green)
	socket.on('disconnect', function (socket) {
		console.log('a user has disconnected'.red);
	});
})


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
			console.log(colors.green(data));
		}
	}
    catch (e) {
    	console.log(colors.red(e));
    }
    return false;
}

// db
