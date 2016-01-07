# SensorDashboard
Arduino is used to measure sensor data about the environment, that data is saved to a database and finally visualized on a webpage.
Work in progress.


## Install

Run inside the app folder:

```sudo npm install```

After that manually install the serialport module:

```sudo npm install serialport --unsafe-perm```

If the installation fails, make sure you have the following dependecies installed:
- gcc -v 4.8 or higher
- Python 2.7 (3.0 won't work!)
- node-gyp nw-gyp node-pre-gyp

```sudo npm install -g node-gyp nw-gyp node-pre-gyp```

##Todo:
1. Routing between angular and express
2. Socket.io realtime interaction
3. MongoDB interactions
