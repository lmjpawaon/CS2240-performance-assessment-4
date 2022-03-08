'use strict'
const express = require('express');
const appRouter = express.Router();
const mysqlConnection = require('./db');

appRouter.use(express.json());
appRouter.use(express.urlencoded({extended: false}));


/*GET ROUTES*/
appRouter.get('/', (req, res) => res.render('index'));
appRouter.get('/teachers', (req, res) => {
    mysqlConnection.query('SELECT * FROM teachers', (err, rows) => {
        if (err){
            req.flash('error',err);
            res.render('teacher',{data:''});
        }
        else{
        res.render('teacher',{data:rows});
        }
    });
});
appRouter.get('/teachers/delete/(:id)',(req, res)=>{
    let user = {id:req.params.id};
    mysqlConnection.query('DELETE FROM teachers WHERE teacherID = '+req.params.id,user,(err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/teachers');
        }
        else{
        req.flash('success', 'Teacher ID= '+req.params.id+'Record Updated!');
        res.redirect('/teachers');
        }
    });
});
appRouter.get('/teachers/search',(req, res) => {
    let searchQuery = req.query.teacherName;
    mysqlConnection.query('SELECT * FROM teachers WHERE teacherLastName LIKE ? OR teacherFirstName LIKE ?', ['%' + searchQuery + '%', '%' + searchQuery + '%'], (err, rows) => {
        if (err){
            req.flash('error',err);
            res.render('teacher',{data:''});
        }
        else{
        res.render('teacher',{data:rows});
        }
    });
});
appRouter.get('/students', (req, res) => res.render('student'));
appRouter.get('/subjects', (req, res) => res.render('subjects'));
appRouter.get('*', (req, res) => res.render('404'));


/*POST ROUTES*/

//CREATE ROUTES
appRouter.post('/teachers/add',(req, res)=>{
    let teacherLastName = req.body.teacherLastName;
    let teacherFirstName = req.body.teacherFirstName;
    let teacherMiddleName = req.body.teacherMiddleName;

    var form_data={
        teacherLastName: teacherLastName,
        teacherFirstName: teacherFirstName,
        teacherMiddleName: teacherMiddleName
    };

    mysqlConnection.query('INSERT INTO teachers SET ?', form_data, (err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/teachers');
        }
        else{
        req.flash('success', 'Teacher Added to Record');
        res.redirect('/teachers');
        }
    });
});

//UPDATE ROUTES
appRouter.post('/teachers/edit/:id',(req, res)=>{
    let teacherID = req.body.teacherID;
    let teacherLastName = req.body.teacherLastName;
    let teacherFirstName = req.body.teacherFirstName;
    let teacherMiddleName = req.body.teacherMiddleName;

    var form_data={
        teacherID: teacherID,
        teacherLastName: teacherLastName,
        teacherFirstName: teacherFirstName,
        teacherMiddleName: teacherMiddleName
    };

    mysqlConnection.query('UPDATE teachers SET ? WHERE teacherID= '+teacherID, form_data, (err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/teachers');
        }
        else{
        req.flash('success', 'Teacher Record Updated');
        res.redirect('/teachers');
        }
    });
});


module.exports=appRouter;