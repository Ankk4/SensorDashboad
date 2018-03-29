#!/usr/bin/python
#-*-coding: utf-8-*-
import pymongo
import datetime

'''

Saves and queries data form and to MongoDB. 

Made by Antero Juutinen

'''

class MongoDB:

  def __init__(self, mongodb_uri, database, collection):
    try:
      self._client = pymongo.MongoClient(mongodb_uri)
      self._database = self._client[database]
      self._collection = self._database[collection]
    except pymongo.errors.ConnectionFailure, e:
      print "Tietokantayhteys epäonnistui: %s" % e


  def client(self):
    return self._client


  def set_database(self, database):
    if self._database != database:
      self._database = self._client[database]


  def set_collection(self, collection):
    self._collection = self._database[collection]

		
  def find_one(self, query):
    return list(self._collection.find_one(query))


  def insert_one(self, data):
    return self._collection.insert_one(data)

	
