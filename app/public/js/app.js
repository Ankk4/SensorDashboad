"use strict";
var app = angular.module('dashboard', []);
var socket = io.connect();
var sensors = [];

app.controller('DashboardController', function($scope){
	this.sensors = sensors;
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
	sensors = data;
	console.log('Got new data', data);
});
socket.on('message', function (message) {
	console.log(message);
});

function getData() {
	socket.emit('getData');
}

$(document).ready(function(){
	console.log("When is this even");
	Chartist.Line('.ct-chart', {
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
	  	series: [[0, 3, 2, 8, 9], [1, 2, 3, 5, 8]]
	}, {
		width: '300px',
		height: '200px'
	});
});