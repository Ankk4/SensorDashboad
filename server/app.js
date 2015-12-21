var sp = require("serialport");
var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600
});

serialPort.on("open", function () {
  console.log('open');
  serialPort.on('data', function(data) {
    console.log('data received: ' + data);
  });
});

sp.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log("Com name: " + port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});