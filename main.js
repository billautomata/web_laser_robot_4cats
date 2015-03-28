var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();

arduino.connect();
arduino.on('connect', function(){
  console.log('Connection to arudino completed')
  console.log("Board version"+arduino.boardVersion);

});

server.listen(8000);

// routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/setup', function (req, res) {
  res.sendFile(__dirname + '/public/setup.html');
});

// all the rest
app.use(express.static(__dirname + '/public'));

// socket io
io.on('connection', function (socket) {

  socket.on('coords', function (data) {

    console.log(data);
    var x_angle, y_angle

    if(data.data.length > 0){
      x_angle = Math.floor(data.data[0])
      y_angle = Math.floor(data.data[1])
    }

    arduino.servoWrite(5,y_angle)
    arduino.servoWrite(6,180-x_angle)

  });

});
