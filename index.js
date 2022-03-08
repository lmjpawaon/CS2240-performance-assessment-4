'use strict';

const express = require('express');
const app = express();
var session = require('express-session');
var flash = require('express-flash');
const port = process.env.PORT||5000;   
const bodyParser = require('body-parser');

require('dotenv').config();
const appRouter = require('./routes');
const mysqlConnection = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'whatever', resave: false, saveUninitialized: true}));
app.use(express.static(__dirname + '/public'));

//Templating Engine - EJS
app.set('views', './view');
app.set('view engine', 'ejs');

app.use(flash());

//Use Routes
app.use('/',appRouter);
app.use('/teacher',appRouter);
app.use('/students',appRouter);
app.use('/subjects',appRouter);
app.use('/404',appRouter);

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
    res.status(err.status || 500);
    res.render('/404');
});

//Port Listening
app.listen(port,()=>{
    console.log(`Now listening on port: ${port}`); 
});