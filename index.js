var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function() {
	console.log("Server listening at port " + port);
});

io.on('connection', function (socket) {

	// Everything socket.io based is in this scope now //
	console.log('client ' + socket.id + ' connected.');

	socket.emit('message', {
		'joinTime': new Date(),
		'username': socket.id
	});

	socket.on('message', function(messageData) {
		socket.broadcast.emit('message', {
			username: socket.id,
			message: messageData
		});
	});

	socket.on('gpsUpdate', function(gpsData) {
		var coords = gpsData.split(',');
		console.log("user: " + socket.id);
		console.log("lat: " + coords[0]);
		console.log('lng: ' + coords[1]);
	});
	
});


