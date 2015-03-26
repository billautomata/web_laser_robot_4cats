
check_stored_settings()

function check_stored_settings(){

  if(!window.localStorage.servo_settings){

    var servo_settings = {
      x_min: 64,
      x_max: 96,
      y_min: 64,
      y_max: 96
    }

    console.log('setting default servo settings')

    window.localStorage.setItem('servo_settings', JSON.stringify(servo_settings))

  }

  console.log('getting default servo settings')
  window.servo_settings = JSON.parse(window.localStorage.servo_settings)

}

var sending_timeout_debounce
function send_coordinate(coord){

  coord[0] = Math.floor(coord[0])
  coord[1] = Math.floor(coord[1])

  if(coord[0] < window.servo_settings.x_min){
    coord[0] = window.servo_settings.x_min
  }
  if(coord[0] > window.servo_settings.x_max){
    coord[0] = window.servo_settings.x_max
  }

  if(coord[1] < window.servo_settings.y_min){
    coord[1] = window.servo_settings.y_min
  }
  if(coord[1] > window.servo_settings.y_max){
    coord[1] = window.servo_settings.y_max
  }

  clearTimeout(sending_timeout_debounce)
  sending_timeout_debounce = setTimeout(function(){

    socket.emit('coords', {
      data: coord
    })

  },10)

}
