#include <ArduinoJson.h>
const int temperaturePin = 0;
const int lightlevelPin  = 1;

float degreesC, voltage;
int lightLevel, high = 0, low = 1023;

StaticJsonBuffer<200> jsonBuffer;
JsonArray& root   = jsonBuffer.createArray();

//create json obejects and append them to array
JsonObject& temp  = root.createNestedObject().createNestedObject("temperature");
JsonObject& light = root.createNestedObject().createNestedObject("light");

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    // wait serial port initialization
  }
  
  // Define variables to each json object here
  temp["degreesC"]    = 0;
  light["lightlevel"] = 0;
}

void loop() {
	getAnalogData();
	sendJSON();
	delay(5000);
}

void getAnalogData() {
	// Read data from analog ping and use 
	// the sensors own constant function to convert mesured voltage to temperature
	voltage = (analogRead(temperaturePin) * 0.004882814);
	degreesC = (voltage - 0.5) * 100.0;

	// Read data from analog pin
	// Optionally: Map (squeeze) and constrain it to some other range
	// Remember: High value = low light level 
	lightLevel = analogRead(lightlevelPin);
	lightLevel = map(lightLevel, 0, 1023, 0, 255);
 	lightLevel = constrain(lightLevel, 0, 255);
}

void sendJSON() {
  temp["degreesC"]    = degreesC;
  light["lightlevel"] = lightLevel;
  root.printTo(Serial);
  Serial.println();
}
