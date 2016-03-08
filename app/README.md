# SensorDashboard
Arduino is used to measure sensor data about the environment, that data is saved to a database and finally visualized on a webpage. Work in progress.

## Install
Nodejs Debian-based Linux:

```sudo apt-get installl npm```

```sudo npm install -g n```

```sudo n stable```

Clone the repository and run inside the repository folder:

```sudo npm install```

After that manually install the serialport module:

```sudo npm install serialport --unsafe-perm```

If the installation fails, make sure you have the following dependecies installed:
- gcc version 4.8 or higher
- Python 2.7 (3.0 won't work!)
- If serialport module still fails to install run the following command:

```sudo npm install -g node-gyp nw-gyp node-pre-gyp```

## Run

Modify config.json to your liking and then run:

```node app.js```

## 	Todo:
1. Routing between angular and express
2. Socket.io realtime interaction
3. MongoDB interactions
