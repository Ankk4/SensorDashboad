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

socket.on('sensorData', function (data) {
	sensors = data;
	console.log('Got new data');
});
socket.on('message', function (message) {
	console.log(message);
});

function getData() {
	socket.emit('getData');
}