var express = require('express');
var app = express();

app.set('views', __dirname + "/www");
var dir_name = process.cwd() + '/';

app.get('/', function(req, res) {
	res.sendFile(dir_name + 'www/index.html');
});

app.get(/^\/((?:js|css|img|public)\/.+)$/, function(req ,res) {
	res.sendFile(dir_name + 'www/' + req.params[0]);
});

server = require('http').createServer(app).listen(8080);
