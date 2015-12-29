var express = require('express'),
	app		= express();

app
	.use(express.static(__dirname + '/public'))
	.get('*', function (req, res) {
		res.sendFile(__dirname + '/public/main.html');
	})
	.listen(7000);
