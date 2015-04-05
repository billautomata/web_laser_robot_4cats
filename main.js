var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

require('./range_manager.js').setup_range()
var save_range = require('./range_manager.js').save_range
var get_range = require('./range_manager.js').get_range

var arduino_connected = false
var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();
arduino.connect()

arduino.on('connect', function(){
  console.log('Connection to arudino completed [Board version: '+arduino.boardVersion +']')
  arduino_connected = true
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

  socket.on('send_settings', function(){
    defaults_range = get_range()
    socket.emit('settings_range', defaults_range)
  })

  socket.on('new_settings', function(d){
    console.log('got new settings: '+ JSON.stringify(d,null,0))
    save_range(d)
  })

  socket.on('coords', function (data) {

    // console.log(data);
    var x_angle, y_angle

    if(data.data.length > 0){
      x_angle = Math.floor(data.data[0])
      y_angle = Math.floor(data.data[1])
    }
    console.log('coords',x_angle,y_angle)

    if(arduino_connected){
      arduino.servoWrite(5,x_angle)
      arduino.servoWrite(6,y_angle)
    } else {
      console.log('arduino not connected yet')
    }

  });

});
