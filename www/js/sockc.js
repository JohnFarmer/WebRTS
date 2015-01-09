//websocket
var refresh_count = 0;
try {
    var sock = new WebSocket("ws://" + document.URL.slice(7,-1));
    //sock.binaryType = 'blob'; // can set it to 'blob' or 'arraybuffer 
	console.log("Websocket - status: " + sock.readyState);
    sock.onopen = function(m) { 
		console.log("CONNECTION opened..." + this.readyState);
	};
    sock.onmessage = function(m) { 
		var msgJSON = recieveJSON(m.data);

		if (msgJSON['command'] === "refresh") {
			if (heavy_debug_flag || refresh_count % 80 === 0)
				console.log('refreshing... ',
							refresh_count,
							msgJSON);
			refresh_count += 1;
			refresh_state(msgJSON);
		} else if (msgJSON['command'] === "CMD") {

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
