#!/usr/bin/python
#-*-coding: utf-8-*-
import json
import serial
import time
import paho.mqtt.client as mqtt

run = True
port = serial.Serial('COM6', 9600, timeout = 2) # portin lukuparametrit: portti, baudinopeus, timeout
print "Connected to serialport"

clientID   = "pyserver01"
clientPath = "location/uno-02"
broker     = "192.168.202.83"
username   = "admin"
password   = "password"
userData   = {'username': username, 'password':'Passw0rd'}

# callback clientille kunnes palvelin kuittaa yhteyden (CONNACK status message).
def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    # Subscriptionit pitää julistaa on_connect scopessa, että jos yhteys menetetään
    # saadaan myös oikeat subscriptionit käyttöön uudestaan.
    client.subscribe(clientPath + "/inTopic/#", qos=1)

# Callback kuuntelee tietoa palvelimelta subscriben perusteella, tulostaa viestit. 
def on_message(client, userdata, msg):
    print(msg.topic+" "+str(msg.payload))
    # Seulaa viesti topic:in perusteella, ja lähetä payload clientille jos tarve.
    if "data" in msg.topic:
    	print "Data sending " + msg.payload
        sendToClient(msg.payload)
    if "disconnect":
    	client.disconnect()

# Lähettää tietoa serialporttia pitkin laitteelle
def sendToClient( msg ):
    msg += "\n\r"
    if port.isOpen:
        port.write(msg.encode())
    else:
        print "Port is not open for some reason"

# Publish - data
def sendToBroker( topic, payload ):
    client.publish(topic, payload, qos=1, retain=False)

# Konvertoi arvoja JSON -muotoon
def is_json(myjson):
	try:
		json_object = json.loads(myjson)
	except ValueError, e:
		return False
	return True


# MQTT Client configuration
# Setting up 
client = mqtt.Client(client_id=clientID, clean_session=True, userdata=userData)
client.on_connect = on_connect
client.on_message = on_message
client.connect(broker, 1883, 60)

# LOOP
while run:
	client.loop()
	line = port.readline()
	if is_json(line): 
		data = json.loads(line)
		sendToBroker(clientPath + "/outTopic/temperature", json.dumps(data[0]))
		sendToBroker(clientPath + "/outTopic/lux", json.dumps(data[1]))