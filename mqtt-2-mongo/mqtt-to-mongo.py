#!/usr/bin/env python

import paho.mqtt.client as mqtt

# This is the Subscriber

def on_connect(client, userdata, flags, rc):
  print("Connected with result code "+str(rc))
  client.subscribe("location/arduino01")

def on_message(client, userdata, msg):
  if (msg.payload == "Hello world!"):
    print("Yes!")
    client.disconnect()
    
client = mqtt.Client()
client.connect("192.168.202.83",1883,60)

client.username_pw_set('admin', 'Passw0rd')

client.on_connect = on_connect
