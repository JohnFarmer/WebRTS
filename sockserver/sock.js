module.exports = function(http_server) {
    var debug_flag = true;
    var heavy_debug_flag = false;

    var websocketserver = require('websocket').server;
    var game_core = require('./game-core.js');
    var game;
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
                if (debug_flag)
                    if (heavy_debug_flag || msgJSON['command'] !== "update")
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
            if (false) {

            } else if (msgJSON['command'] === "update") {
                if (game)
                    sendJSON(game.update());
                else
                    return;

                if (update_count % 80 === 0) {
                    console.log('updating... ', update_count);
                    game.print_state();
                }
                update_count += 1;
            } else if (msgJSON['command'] === "select") {
                game.select(msgJSON['type'],
                            msgJSON['selected_things']);

            } else if (msgJSON['command'] === "set_destination") {
                game.set_destination(msgJSON['dest_x'],
                                     msgJSON['dest_y']);

            } else if (msgJSON['command'] === "build_robot") {
                game.build_robot(msgJSON['factory_id']);

            } else if (msgJSON['command'] === "build_building") {
                //msgJSON['build_args']
                //game.build_building(msgJSON['build_args']);
                game.build_building(msgJSON['type'],
                                    msgJSON['building_x'],
                                    msgJSON['building_y']);
            } else if (msgJSON['command'] === "new_game") {
                command_log(msgJSON['command']);
                console.log(msgJSON);
                game= new game_core(msgJSON['settings']);
                sendJSON(game.world_init());
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
