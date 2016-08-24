var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// app.get('/', function(req, res){
// 	res.sendFile(__dirname + '/index.html');
// });

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});


// http.listen(3000, function(){
// 	console.log('listening on *:3000');
// });