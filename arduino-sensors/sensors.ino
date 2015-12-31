#include <ArduinoJson.h>
StaticJsonBuffer<200> jsonBuffer;
JsonObject& tempJSON = jsonBuffer.createObject();
JsonObject& lightJSON = jsonBuffer.createObject();

const int temperaturePin = 0;
float voltage, degreesC;
const int lightlevelPin  = 1;
int lightLevel, high = 0, low = 1023;

void setup() {
	Serial.begin(9600);
}

void loop() {
	getAnalogData();
	sendJSON();
	delay(5000);
}

void getAnalogData() {
	// Read data from analog ping and use 
	// the sensors own constant function to convert mesured voltage to tempeture
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
  tempJSON["sensor"] = "Tempeature";
  tempJSON["voltage"] = voltage;
  tempJSON["C"] = degreesC;
  
  lightJSON["sensor"] = "Light level";
  lightJSON["light"] = lightLevel;
  
  tempJSON.printTo(Serial);
  lightJSON.printTo(Serial);
}
