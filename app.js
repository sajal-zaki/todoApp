
var express = require('express');
var promise = require('bluebird');
var path = require('path');
var bp = require('body-parser')

var app = express();

var options =  {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);

var db = pgp('postgres://postgres:computer1@localhost:5432/todolist');

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'views'));
app.use(bp.json());

//allows us to decode body
app.use(bp.urlencoded({extended:false}));


app.get('/users',function(req,res,next){
    db.any('select * from list')
        .then(function(data){
            res.render('index',{ data: data });
        })
        .catch(function(err){
            return next(err);
        });
});

app.get('/users/:id', function (req,res,next) {
     var userId = parseInt(req.params.id);
    db.one('select * from list where id ='+id)
    // db.one('select * from users where id =$1'+userId)
        .then(function(data){
        res.render('about',{data: data});
    })
        .catch(function(err){
            return next(err)
        });
});

app.post("/users",function(req,res,next){
    var todo = req.body.todo;

    db.none("INSERT INTO list(todo, time, date) values($1,$2,$3)", [todo,time, date]);
    // db.query("INSERT INTO users(username,password) values($1,$2)", [username,password]);
    console.log(todo+" "+time+" "+date);

});

app.listen(4000);