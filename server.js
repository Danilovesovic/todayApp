"use strict";
const express = require('express');
const mongojs = require('mongojs');
const db = mongojs('js2',['todos']);
const ObjectId = mongojs.ObjectId;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));

app.use(bodyParser.json())

app.use(express.static(__dirname + "/public"));

app.get("/getData",function (req,res) {
	db.todos.find(function (err,docs) {
		if (err) { throw err }
		res.send(docs);
	})
})


app.post('/deleteTodo',function (req,res) {
	var id = req.body.id;
	db.todos.remove({ _id : ObjectId(id)},function (err,docs) {
		if (err) { throw err }
		res.send(docs);
	})
})


app.post('/addNewTask',function (req,res) {
	var msg = req.body.msg;
	db.todos.insert({ msg : msg },function (err,docs) {
		if (err) { throw err }
		res.send(docs);
	})

})


app.listen(3000,function () {
	console.log(":listening to port 3000");
})