const express = require('express');
const bodyParser= require('body-parser')
const app = express()
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient
var loginInfo = require('./connect.json')
var mongoose = require('mongoose')
var path = require('path')
var cookieId = mongoose.Types.ObjectId().toString();

MongoClient.connect('mongodb://'+ loginInfo.username + ':'+ loginInfo.password + '@ds111529.mlab.com:11529/tasks', (err, database) => {
  if (err) return console.log(err);
  db = database;
    app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(cookieParser());
// set a cookie
/*app.use(function (req, res, next) {
    var cookie = req.cookies.todo_test;
    if(cookie  === undefined){

        //console.log('Cookie added.');

        db.collection('tasks').save({'_id': cookie, 'task':[]}, (err, result) => {
          if (err) return console.log(err)
          console.log('User added to database.')
        }).update({'_id': cookievalue},{$push:{'task':req.body.taskText}})
    }
    else{
        //console.log("Cookie is already there.");
    }
  next();
});*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.post('/add-task', (req, res, next) => {
    var cookievalue = req.cookies.todo_test;
    if(cookievalue  === undefined){
        db.collection('tasks').save({'_id': cookieId, 'task':[req.body.taskText]}, (err, result) => {
          if (err) return console.log(err)
          console.log('User added to database.')
        })

        //create a new cookie
        res.cookie('todo_test' , cookieId, {expire : new Date() + 9999});
        next();
    }
    else{
      db.collection('tasks').update({'_id': cookievalue},{$push:{'task':req.body.taskText}})
    }
    //console.log(req.body);
    //console.log("Post works");
})

app.use(express.static('/'))
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + '/index.html'));
})
