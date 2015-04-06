get_default_range(function(){

  // set the position to the middle
  window.current_servo_position = [
    Math.floor((window.servo_settings.x_max - window.servo_settings.x_min) * 0.5) + window.servo_settings.x_min,
    Math.floor((window.servo_settings.y_max - window.servo_settings.y_min) * 0.5) + window.servo_settings.y_min
  ]

  window.send_coordinate(window.current_servo_position)

  var svg_w = window.innerWidth*0.5
  var svg_h = 30

  var sliders = []

  ;['x_min','x_max','y_min','y_max'].forEach(function(e){

    var svg = d3.select('div#bucket').append('svg')//.style('width','100%')
      .attr('width', svg_w).attr('height', svg_h)

    var slider = new GUId3.Slider(function(v){

      var this_id = e

      console.log(e,v)
      window.servo_settings[e] = v

      var dim = e.split('_')
      if(dim[0] === 'x'){
        window.current_servo_position[0] = v
      } else {
        window.current_servo_position[1] = v
      }

      window.send_coordinate(window.current_servo_position)
      window.socket.emit('new_settings', window.servo_settings)

    })

    slider.width(window.innerWidth*0.5).height(30)
      .label(e).type('horizontal').cssClass('setup_sliders')
      // .connect(window.servo_settings,e)

    slider.scale(d3.scale.linear().domain([0,100]).range([1,180]))

    slider.create(svg)
    slider.setValue(window.servo_settings[e])

    sliders[e] = slider


  })

  ;['x_invert', 'y_invert'].forEach(function(e){

    var svg = d3.select('div#bucket').append('svg')//.style('width','100%')
      .attr('width', window.innerWidth*0.5).attr('height', 30)

    var button = new GUId3.Button(function(){
      window.socket.emit('new_settings', window.servo_settings)
    })
    button.width(window.innerWidth*0.5).height(30)
      .labelOn(e + ' on').labelOff(e + ' off').type('toggle').cssClass('setup_buttons')
      .connect(window.servo_settings,e)

    button.create(svg)
    button.setValue(window.servo_settings[e])

  })

})
