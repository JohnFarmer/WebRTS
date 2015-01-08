module.exports = function(http_server) {
	var websocketserver = require('websocket').server;
	var game_core = require('./game-core.js');
	var wss = new websocketserver({
		httpServer: http_server
	});
	
	wss.on('request', function(request) {
		var conn = request.accept(null, request.origin);
		console.log("connection accepted", conn['socket']['_peername']);
		conn.send("conncection accepted");
		var update_count = 0;
		
		var sendJSON = function(msg) {
			conn.send(JSON.stringify(msg));
		};
		
		var recieveJSON = function(msg) {
			// TODO: add error handler
			var msgJSON = {};
			try {
				msgJSON = JSON.parse(msg);
				if (msgJSON['command'] !== "update")  
					console.log('parsing JSON:', msg);
			} catch(e) {
				console.log(e);
			}
			return msgJSON;
		};
		
		var command_log = function(log) {
			console.log('got command: \t', log);
		};
		
		conn.on('message', function(message) {
			var msgJSON = recieveJSON(message.utf8Data);
			if (msgJSON['command'] === "new_game") {
				command_log(msgJSON['command']);
				console.log(msgJSON);
				var game = new game_core(msgJSON['settings']);
				//game.world_init();

			} else if (msgJSON['command'] === "update") {
				//sendJSON(game.update());
				if (update_count % 80 === 0)
					console.log('updating... ', update_count);
				update_count += 1;
			} else if (msgJSON['command'] === "select") {
				//game.handle_select(msgJSON['select_id'],
			//	msgJSON['select_type']);
				
			} else if (msgJSON['command'] === "kbd") {
				//msgJSON['input_data']
				
			} else if (msgJSON['command'] === "build_robot") {

			} else if (msgJSON['command'] === "build_building") {
				//msgJSON['build_args']
				//game.build_building(msgJSON['build_args']);
			} else {
				console.log('unkown command:', msgJSON['command']);
			}
		});
		
		conn.on('close', function(connection) {
			console.log('connection closed:',
						conn['socket']['_peername']);
		});
	});
};
