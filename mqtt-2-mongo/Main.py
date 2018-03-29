#!/usr/bin/python
#-*-coding: utf-8-*-

'''

Reads data from MQTT subscriptions and saves them to mongodb.

Made by Antero Juutinen

'''
import json
from MongoDB import MongoDB
from Mqtt import Mqtt

run = True

# MongoDB Class configuration
mongo_url  = '192.168.202.2'
database   = 'mqtt'
collection = 'broker01' 

# Luo uusi instanssi mongodb luokasta
mongoClient = MongoDB(mongo_url, database, collection) 

# MQTT Class configuration
mqttAuth      = {'username':"admin", 'password':"Passw0rd"}
broker        = '192.168.202.83'
qos           = 1
clientID      = 'dclab-database'
clean_session = True

# Topic -arvo jonka mukaan tilaukset tehdään
subTopic = '#'

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))    
    mqttClient.subscribe(subTopic, qos)

# Callback kuuntelee tietoa palvelimelta subscriben perusteella, tulostaa viestit. 
def on_message(client, userdata, msg):
    #print(msg.topic+" "+str(msg.payload))
    # HUOM Tämä koodi olettaa, että topic rakenteen viimeisenä on varsinaista arvoa kuvaava nimi! 

    # Aseta kokoelma topic -arvon perusteella, mutta poista viimeinen topic -taso
    mongoClient.set_collection(str(msg.topic))

    # Erottele ja muuta oikeaan muotoon viimeinen topic -taso ja varsinainen arvo 
    key = msg.topic.rpartition('/')[2]
    value = float(msg.payload)
    data = {key:value}

    print data
    # Syötä rakennettu arvo!
    mongoClient.insert_one(data)
    print "inserted"

# Luo uusi instanssi mqtt luokasta
mqttClient = Mqtt(broker, qos, clientID, clean_session, mqttAuth, subTopic, on_connect, on_message)

while run:
  mqttClient.maintain()
'''
def main (args): 


def dbconnect(args):
	try:
    	client = pymongo.MongoClient(args.mongo_uri)
	except pymongo.errors.ConnectionFailure, e:
   		return "Tietokantayhteys epäonnistui: %s" % e

   	db 		= client[args.database]
	col 	= db[args.mongo_uri]


def find(col, query):
	return dict(col.find(query))

'''

# Program main loop
