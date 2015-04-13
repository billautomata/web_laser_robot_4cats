#web laser robot 4cats v0.5.0

Control a laser pointer with your phone or computer through a browser, an arduino, two servos, and javascript.

![screen shot 2015-04-05 at 7 01 16 pm](https://cloud.githubusercontent.com/assets/432483/6999686/424e2dc8-dbc6-11e4-8b97-63fe7002f159.png)
![screen shot 2015-04-05 at 7 01 24 pm](https://cloud.githubusercontent.com/assets/432483/6999685/424da6aa-dbc6-11e4-90dd-8c138d8c36f8.png)


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

![img_2078](https://cloud.githubusercontent.com/assets/432483/6999675/dd632e5e-dbc5-11e4-9ca0-8ffaccbdb094.jpg)
![img_2079](https://cloud.githubusercontent.com/assets/432483/6999674/dc5248c4-dbc5-11e4-9a90-a2961d6dbc7a.jpg)

[simple video of the app in action](https://instagram.com/p/0xuJTBPbyk/?taken-by=billautomata)

###note
This project is trying to take this idea beyond the experiment phase and into something very user friendly and robust.  Attention is being paid to the UX and mobile friendliness.  If you have input on improvements, or just want to point out something that doesn't work well for you • please open an issue.
