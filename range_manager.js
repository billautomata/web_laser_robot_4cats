var fs = require('fs')
var path = require('path')

module.exports.setup_range = setup_range
module.exports.save_range = save_range
module.exports.get_range = get_range

var global_range = {}

function setup_range() {

  var this_dir = path.resolve(path.dirname())

  fs.exists(this_dir + '/settings/default_range.json', function (b) {
    if (b) {

      fs.readFile(this_dir + '/settings/default_range.json', function (err, d) {
        if (err) {
          console.log('error loading saved defaults')
        } else {
          global_range = JSON.parse(d.toString())
          console.log('success loading saved defaults')
          console.log(JSON.stringify(global_range, null, 0))
        }

        // console.log(d.toString())
      })

    } else {

      console.log('no initial defaults json found')

      var defaults = {
        x_min: 80,
        x_max: 90,
        y_min: 80,
        y_max: 90
      }

      global_range = defaults
      save_range()


    }
  })

}

function save_range(new_range) {

  if (new_range !== undefined) {
    global_range = new_range
  }

  global_range.x_min = Math.floor(global_range.x_min)
  global_range.x_max = Math.floor(global_range.x_max)
  global_range.y_min = Math.floor(global_range.y_min)
  global_range.y_max = Math.floor(global_range.y_max)

  var this_dir = path.resolve(path.dirname())
  fs.writeFile(this_dir + '/settings/default_range.json',
    JSON.stringify(global_range, null, 2),
    function (err) {
      if (err) {
        console.log('error writing initial defaults json')
      } else {
        console.log('success writing initial defaults json')
      }
    })
}

function get_range() {
  return global_range
}
