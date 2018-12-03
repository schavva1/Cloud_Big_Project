#!/usr/bin/env nodejs

const {inspect} = require('util');

'use strict'

var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect('mongodb://172.17.0.2:27017/test', {useNewUrlParser: true}, function (err, db) {
	if(err)
    	{
        	console.log(err);
    	}
    	else
    	{
        	console.log("Connected to db");

        	db.collection('testt').insert({"doc1":"hello"},function(err,data){

	      		if(err)
    			{
      				throw(err);
    			}
    			else
		    	{
				console.log("sucessfuly inserted");
 			}
		});

		db.collection('Persons', function (err, collection) {
			collection.insert({ id: 1, firstName: 'Steve', lastName: 'Jobs' });
			collection.insert({ id: 2, firstName: 'Bill', lastName: 'Gates' });
			collection.insert({ id: 3, firstName: 'James', lastName: 'Bond' });

			console.log("Testing");

			db.collection('Persons').count(function (err, count) {
				if (err) throw err;

				console.log('Total Rows: ' + count);
			});
		});
	}
});
