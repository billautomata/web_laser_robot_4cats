#web laser robot 4cats v0.5.0

Control a laser pointer with your phone or computer through a browser, an arduino, two servos, and javascript.

##instructions

1. Install the `Standard Firmata` example on your  Arduino and connect it to your computer.
    * The example comes standard with the Arduino development environment, and can be found under `File` > `Examples` > `Firmata` > `Standard Fimrata`

Clone this repo and run:

* `npm install`
* `npm start`

###default wiring setup

* `PIN 5` `X SERVO DATA`
* `PIN 6` `Y SERVO DATA`
* `PIN 8` `LASER +`
* `GND` `LASER -`
* __Do not power your servos from your Arduino, use a separate power source and connect the `GND` of that source to the `GND` pin on the Arduino.__



###note
This project is trying to take this idea beyond the experiment phase and into something very user friendly and robust.  Attention is being paid to the UX and mobile friendliness.  If you have input on improvements, or just want to point out something that doesn't work well for you • please open an issue.
