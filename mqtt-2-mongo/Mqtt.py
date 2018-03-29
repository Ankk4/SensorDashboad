#!/usr/bin/python
#-*-coding: utf-8-*-
'''
Model for serialport read and write.

Wrapperi pyserial moduulille. Näin funktiot voidaan laittaa eri tiedostoon ja koodi on luettavampaa. 


'''
import json
import paho.mqtt.client as mqtt


class Mqtt:

    '''konstruktori MQTT -clientille, jonka avulla saamme yhteyden brokeriin.'''
    def __init__(self, broker, qos, clientID, clean_session, userdata, subTopic, on_connect, on_message):
        self._clientID      = clientID
        self._clean_session = clean_session
        self._userdata      = userdata
        self._broker        = broker
        self._subs          = set()
        self._qos           = qos
        self._subTopic      = subTopic

        self._client = mqtt.Client(clientID, clean_session, userdata)
        self._client.username_pw_set(userdata['username'], userdata['password'])

        self._client.on_connect = on_connect
        self._client.on_message = on_message
        self._client.connect(broker, 1883, 60)
        # self._client.loop_start() # Spawnaa aliohjelman ja ylläpitää yhteyttä 'non-blocking'     


    ''' KESKEN - mahdollisuus tilata vain tiettyjä topiceja
    def setSubs(self, topic):
        self._subs.add(topic)
        self.subscribe()
        return self._subs


    def subscribe(self):
        for topic in self._subs:
            self._client.subscribe(topic, self._qos)
            print "subscribed to: " + topic
    '''

    def subscribe(self, topic, qos):
        self._client.subscribe(topic, self._qos)

    def loop_start(self):
        self._client.loop_start()

    def loop_stop(self):
        self._client.loop_stop()

    def maintain(self):
        self._client.loop()





