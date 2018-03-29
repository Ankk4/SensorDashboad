#!/usr/bin/python
#-*-coding: utf-8-*-
'''
Model for serialport read and write.

Wrapperi pyserial moduulille.

Made by Antero Juutinen


'''
import json
import serial
import time

class SerialComs:

    '''konstruktori port -objektille, jonka avulla saamme yhteyden serialporttiin.'''
    def __init__(self, portPath, baudRate, timeout):
        try:  
            self._port = serial.Serial(portPath, baudRate, timeout = 2) 
        except Exception as msg:
            print "Could not find port " + port
            print msg
            quit(0)


    def port(self):
        return self._port


    def isOpen(self):
        return self._port.isOpen();


    def sendToClient( msg ):
        msg += "\n\r" # insert newline marker at the end
        if self._port.isOpen:
            self._port.write(msg.encode())
        else:
            print "Port is not open for some reason"


    def readPort(self):
        line = self._port.readline()
        return line


    def sendToClient(self, msg):
        msg += "\n\r" # insert newline marker at the end
        if is_open:
            self._port.write(msg.encode())
        else:
            print "Port is not open for some reason"