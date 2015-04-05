get_default_range(function(){

  var temp_servo_range = window.servo_settings

  window.current_servo_position = [
    Math.floor((window.servo_settings.x_max - window.servo_settings.x_min) * 0.5) + window.servo_settings.x_min,
    Math.floor((window.servo_settings.y_max - window.servo_settings.y_min) * 0.5) + window.servo_settings.y_min
  ]

  // send_coordinate(current_servo_position)

  var svg_w = window.innerWidth*0.5
  var svg_h = 30

  ;['x_min','x_max','y_min','y_max'].forEach(function(e){

    var svg = d3.select('div#bucket').append('svg')//.style('width','100%')
      .attr('width', window.innerWidth*0.5).attr('height', 30)

    var slider = new GUId3.Slider(function(v){

      console.log(e,v)

      var dim = e.split('_')
      if(dim[0] === 'x'){
        window.current_servo_position[0] = v
      } else {
        window.current_servo_position[1] = v
      }
      window.send_coordinate(current_servo_position)
      window.socket.emit('new_settings', window.servo_settings)
    })
    slider.width(window.innerWidth*0.5).height(30)
      .label(e).type('horizontal').cssClass('setup_sliders')
      .connect(window.servo_settings,e)

    slider.scale(d3.scale.linear().domain([0,100]).range([1,180]))

    slider.create(svg)
    slider.setValue(window.servo_settings[e])
  })



})
