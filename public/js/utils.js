function get_default_range(cb){
  window.socket.on('settings_range', function(d){
    console.log('got settings range')
    console.log(d)
    window.servo_settings = d
    if(cb !== undefined){
      cb()
    }
  })
  window.socket.emit('send_settings',{})
}

var sending_timeout_debounce
function send_coordinate(coord){

  // console.log('running send_coordinate')
  // console.log('servo settings',JSON.stringify(window.servo_settings,null,0))

  coord[0] = Math.floor(coord[0])
  coord[1] = Math.floor(coord[1])

  if(coord[0] <= window.servo_settings.x_min){
    coord[0] = window.servo_settings.x_min
  }
  if(coord[0] >= window.servo_settings.x_max){
    coord[0] = window.servo_settings.x_max
  }

  if(coord[1] <= window.servo_settings.y_min){
    coord[1] = window.servo_settings.y_min
  }
  if(coord[1] >= window.servo_settings.y_max){
    coord[1] = window.servo_settings.y_max
  }

  // console.log(coord)

  clearTimeout(sending_timeout_debounce)
  sending_timeout_debounce = setTimeout(function(){

    // console.log('sending',coord.toString())
    window.socket.emit('coords', {
      data: coord
    })

  },10)
}
