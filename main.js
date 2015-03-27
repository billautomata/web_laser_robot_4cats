var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8000);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/setup', function (req, res) {
  res.sendFile(__dirname + '/public/setup.html');
});

// all the rest
app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {

  socket.on('coords', function (data) {

    console.log(data);
    var x_angle, y_angle

    if(data.data.length > 0){
      x_angle = Math.floor(data.data[0])
      y_angle = Math.floor(data.data[1])
    }

    if(sp){
      sp.write(x_angle +','+ y_angle)
    }

  });



});

//
var serialport = require('serialport')
var SerialPort = serialport.SerialPort
var sp

serialport.list(function(err,ports){

  ports.forEach(function(port){

    console.log(port.comName)
    if(port.comName.indexOf('usbmodem') !== -1){
      console.log('found... setting sp object to ' + port.comName)
      sp = new SerialPort(port.comName)
    }

  })

})
