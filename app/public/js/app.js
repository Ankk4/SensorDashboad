"use strict";
var app = angular.module('dashboard', []);
var socket = io.connect();
var sensorData = [];

app.controller('DashboardController', function($scope){
	this.sensorData = sensorData;
    console.log($scope);
});

app.controller('SidebarController', function(){
	this.tab = 1;
	this.selectTab = function (setTab) {
		this.tab = setTab;
	};
	//Is it active? = set class
	this.isSelected = function(checkTab){
		return this.tab === checkTab;
	}
});

// SOCKETS
socket.on('sensorData', function (data) {
	sensorData += data;
	console.log('Got new data', data);
});
socket.on('message', function (message) {
	console.log(message);
});

function getData() {
	socket.emit('getData');
}
