get_default_range(function(){

  var scalex = d3.scale.linear()
    .domain([0, window.innerWidth])
    .range([window.servo_settings.x_min, window.servo_settings.x_max])
    .clamp(true)

  var scaley = d3.scale.linear()
    .domain([0, window.innerHeight])
    .range([window.servo_settings.y_min, window.servo_settings.y_max])
    .clamp(true)

  var x_coord = window.servo_settings.x_min + ((window.servo_settings.x_max - window.servo_settings.x_min) / 2)
  var y_coord = window.servo_settings.y_min + ((window.servo_settings.y_max - window.servo_settings.y_min) / 2)
  console.log(x_coord,y_coord)
  send_coordinate([x_coord,y_coord])

  var svg = d3.select('svg').attr('height', window.innerHeight * 0.8)

  var drag = d3.behavior.drag()
    .origin(function(d) {
      return d;
    })
    .on("drag", dragmove)
    .on("dragstart", dragmove)

  svg.selectAll('rect').data([0])
    .enter()
    .append('rect')
    .attr('x', 0).attr('y', 0)
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('fill', d3.rgb(100, 100, 100))
    .call(drag)

  // on screen indicator
  var circle = svg.append('circle').attr('id', 'laser_position')
    .attr('cx', scalex.invert(x_coord, true))
    .attr('cy', scaley.invert(y_coord, true))
    .attr('r', window.innerWidth * 0.05)
    .attr('stroke', 'none')
    .attr('fill', 'red')
    .attr('fill-opacity', 0.5)
    // .style('pointer-events', 'none')

  function dragmove() {

    // console.log(d3.event)

    if(d3.event.sourceEvent.targetTouches !== undefined){
      if(d3.event.sourceEvent.targetTouches.length > 0){
        //console.log(d3.event.sourceEvent.targetTouches)
        x_coord = Math.floor(scalex(d3.event.sourceEvent.targetTouches[0].pageX))
        y_coord = Math.floor(scaley(d3.event.sourceEvent.targetTouches[0].pageY))
      }
    } else {
      x_coord = Math.floor(scalex(d3.event.sourceEvent.pageX))
      y_coord = Math.floor(scaley(d3.event.sourceEvent.pageY))
    }

    // from main.js
    send_coordinate([x_coord, y_coord])

    // update the position of the indicator circle
    circle.attr('cx', scalex.invert(x_coord))
      .attr('cy', scaley.invert(y_coord))

  }

  d3.select('button#wander_mode').on('click', function() {
    wander_mode()
  })

  var wander_interval
  var wander_mode_active = false

  function wander_mode() {

    if (wander_mode_active) {

      wander_mode_active = false
      clearInterval(wander_interval)

    } else {

      wander_mode_active = true
      wander_interval = setInterval(function() {

        var sin_multi = 0.0003
        var max_distance = 10
        var range = Math.abs(max_distance*Math.sin(Date.now()*sin_multi)) + 1

        if(Math.random()<0.01){
          range = 100
        }

        var range_2 = range / 2.0

        x_coord += Math.floor((Math.random() * range) - range_2 + 0.5)
        y_coord += Math.floor((Math.random() * range) - range_2 + 0.5)

        if (x_coord < window.servo_settings.x_min) {
          x_coord = window.servo_settings.x_min
        }
        if (x_coord > window.servo_settings.x_max) {
          x_coord = window.servo_settings.x_max
        }

        if (y_coord < window.servo_settings.y_min) {
          y_coord = window.servo_settings.y_min
        }
        if (y_coord > window.servo_settings.y_max) {
          y_coord = window.servo_settings.y_max
        }

        circle.attr('cx', scalex.invert(x_coord))
          .attr('cy', scaley.invert(y_coord))
          .attr('r', window.innerWidth * 0.05)

        send_coordinate([x_coord, y_coord])

      }, 60)

    }

  }

})
