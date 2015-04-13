const LASER_PIN = 8
const X_SERVO_PIN = 5
const Y_SERVO_PIN = 6

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
  arduino.digitalWrite(LASER_PIN,1)
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
    var defaults_range = get_range()
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
      arduino.servoWrite(X_SERVO_PIN,x_angle)
      arduino.servoWrite(Y_SERVO_PIN  ,y_angle)
    } else {
      console.log('arduino not connected yet')
    }

  });

  socket.on('coords_pct', function (data) {

    console.log(data)

    var r = get_range()

    console.log(r)

    // console.log(data);
    var x_angle, y_angle

    if(data.length > 0){
      x_angle = Math.floor((data[0] * (r.x_max - r.x_min)) + r.x_min)
      y_angle = Math.floor((data[1] * (r.y_max - r.y_min)) + r.y_min)
    }

    console.log('coords',x_angle,y_angle)

    if(arduino_connected){
      arduino.servoWrite(X_SERVO_PIN,x_angle)
      arduino.servoWrite(Y_SERVO_PIN  ,y_angle)
    } else {
      console.log('arduino not connected yet')
    }

  });


  socket.on('laser_power', function(data){

    console.log('laser event' + JSON.stringify(data,null,0))

    if(data.laser_state){
      arduino.digitalWrite(8,1)
    } else {
      arduino.digitalWrite(8,0)
    }

  })


});
