#!/usr/bin/env nodejs

const assert = require('assert');
const mongo = require('mongodb').MongoClient;

const {inspect} = require('util'); //for debugging

'use strict';
let counter = 0;
let time = 120000;
let stop_flag = false;


function insert(db)
{
	if (stop_flag) return;
	let dbo = db.db("test");
        let myobj ={name:"test", address:"test2", doc_count: counter};
        dbo.collection("customers").insertOne(myobj, function(err,res) {
		if(err) console.log("Insertion err");
		console.log("Inserted new record");
		counter = counter + 1;

		pick_random(db);
		/*
		setTimeout(function() {
			insert(db);
		})
		*/
        });
}

function remove(db)
{
	if (stop_flag) return;
        let dbo = db.db("test");
	let rand = Math.round(Math.random() * counter);
        let myobj ={doc_count: rand};
	//console.log(rand);
        dbo.collection("customers").deleteOne(myobj, function(err,res) {
                if(err) console.log("Deletion err");
                console.log("Deleted record successfully...");
		//console.log(res);
		pick_random(db);
        });
}

function retrieve(db)
{
	if (stop_flag) return;
	let dbo = db.db("test");
        let myobj ={doc_count: Math.round(Math.random() * counter)};
        dbo.collection("customers").find(myobj).count(function(err,res) {
                if(err) console.log("Retrieval err");
                console.log("Retrieved Successfully ", res);

		pick_random(db);
        });
}

function pick_random(db)
{
	let pick = Math.round(Math.random() * 2);

	if (pick === 0)
	{
		insert(db);
	}
	else if(pick === 1)
	{
		remove(db);
	}
	else
	{
		retrieve(db);
	}
}


try
{
	mongo.connect("mongodb://localhost/", {useNewUrlParser : true}, function(err,db) {
		let si = setInterval(function(){stop_flag = true; console.log("End of run"); clearInterval(si);}, time);
		setTimeout(function(){db.close();}, time + 1000);
		pick_random(db);
	});
	//const mongoURL = "mongodb://172.17.0.2/";
	//console.log(client);
	//const db = client.db("users");


	//const dbUsers = db.collection("users");

	//dbUsers.updateOne({"_id": "T00001"}, {"name" : "Test"}, {upsert: true});
}
catch(err)
{
	console.log("Job Error");
}


