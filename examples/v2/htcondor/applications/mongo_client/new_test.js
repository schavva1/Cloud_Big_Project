#!/usr/bin/env nodejs

const assert = require('assert');
const mongo = require('mongodb').MongoClient;

const {inspect} = require('util'); //for debugging

'use strict';

try
{
	 mongo.connect("mongodb://172.17.0.2/", {useNewUrlParser : true}, function(err,db) {
		//console.log(db);
		//console.log(" - " + typeof db);
		while (true)
		{
			let dbo = db.db("test");
			let myobj ={name:"test", address:"test2"};
			dbo.createCollection("customers",function(err,res){
		  		if(err) throw err;
		  		console.log("collection created");
			});
			dbo.collection("customers").insertOne(myobj, function(err,res) {
				if(err) throw err;
				console.log("one inserted");
				db.close();
			});
		}

	});
	//const mongoURL = "mongodb://172.17.0.2/";
	//console.log(client);
	//const db = client.db("users");


	//const dbUsers = db.collection("users");

	//dbUsers.updateOne({"_id": "T00001"}, {"name" : "Test"}, {upsert: true});
}
catch(err)
{
	throw err;
}


