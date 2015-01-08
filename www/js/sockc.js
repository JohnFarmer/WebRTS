//websocket
var update_count = 0;
try {
    var sock = new WebSocket("ws://localhost:1234");
    //sock.binaryType = 'blob'; // can set it to 'blob' or 'arraybuffer 
    console.log("Websocket - status: " + sock.readyState);
    sock.onopen = function(m) { 
        console.log("CONNECTION opened..." + this.readyState);
	};
    sock.onmessage = function(m) { 
		var msgJSON = recieveJSON(m.data);

		if (msgJSON['command'] === "new_game") {

		} else if (msgJSON['command'] === "update") {
			if (update_count % 80 === 0)
				console.log('updating... ', update_count);
			update_count += 1;
		} else if (msgJSON['command'] === "select") {

		} else if (msgJSON['command'] === "kbd") {
			
		} else if (msgJSON['command'] === "build_robot") {

		} else if (msgJSON['command'] === "build_building") {

		} else {
			console.log('unkown command:', msgJSON['command']);
		}
	};
    sock.onerror = function(m) {
        console.log("Error occured sending..." + m.data);
	};
    sock.onclose = function(m) { 
        console.log("Disconnected - status " + this.readyState);
	};
} catch(exception) {
    console.log(exception);
}

var sendJSON = function(msg) {
	if (msg['command'] !== "update")  
		console.log('sending JSON', JSON.stringify(msg));
	sock.send(JSON.stringify(msg));
};

var recieveJSON = function(msg) {
	var msgJSON;
	try {
		msgJSON = JSON.parse(msg);
		if (msgJSON['command'] != 'refresh')
			console.log('parsing JSON:', msg);
	} catch(e) {
		console.log(e);
		msgJSON = msg;
	}
	return msgJSON;
};
