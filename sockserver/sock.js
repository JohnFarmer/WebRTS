module.exports = function(http_server) {
	var websocketserver = require('websocket').server;
	var wss = new websocketserver({
		httpServer: http_server
	});
	
	wss.on('request', function(request) {
		var conn = request.accept(null, request.origin);
		console.log("connection accepted:", conn);
		conn.send("conncection accepted");
		
		var test_data = {"test": "data"};
		conn.send(JSON.stringify(test_data));
		
		conn.on('message', function(message) {
			console.log('get msg', message);
			conn.send(message.utf8Data);
		});
		
		conn.on('close', function(connection) {
			console.log('connection closed:', connection);
		});
	});
};
