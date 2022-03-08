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
        req.flash('success', 'Teacher ID= '+req.params.id+'Record Deleted!');
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
appRouter.get('/students', (req, res) => {
    mysqlConnection.query('SELECT * FROM students', (err, rows) => {
        if (err){
            req.flash('error',err);
            res.render('student',{data:''});
        }
        else{
        res.render('student',{data:rows});
        }
    });
});
appRouter.get('/students/delete/(:id)',(req, res)=>{
    let user = {id:req.params.id};
    mysqlConnection.query('DELETE FROM students WHERE studentID = '+req.params.id,user,(err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/students');
        }
        else{
        req.flash('success', 'Student ID= '+req.params.id+'Record Deleted!');
        res.redirect('/students');
        }
    });
});
appRouter.get('/students/search',(req, res) => {
    let searchQuery = req.query.studentName;
    mysqlConnection.query('SELECT * FROM students WHERE studentLastName LIKE ? OR studentFirstName LIKE ?', ['%' + searchQuery + '%', '%' + searchQuery + '%'], (err, rows) => {
        if (err){
            req.flash('error',err);
            res.render('student',{data:''});
        }
        else{
        res.render('student',{data:rows});
        }
    });
});
appRouter.get('/subjects', (req, res) => {
    mysqlConnection.query('SELECT * FROM subjects', (err, rows) => {
        if (err){
            req.flash('error',err);
            res.render('subjects',{data:''});
        }
        else{
            res.render('subjects',{data:rows});
        }
    });
});
appRouter.get('/subjects/delete/(:id)',(req, res)=>{
    let subject = {id:req.params.id};
    mysqlConnection.query('DELETE FROM subjects WHERE subjectID = '+req.params.id,subject,(err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/subjects');
        }
        else{
        req.flash('success', 'Subject ID= '+req.params.id+'Record Deleted!');
        res.redirect('/subjects');
        }
    });
});
appRouter.get('/subjects/search',(req, res) => {
    let searchQuery = req.query.subjectName;
    mysqlConnection.query('SELECT * FROM subjects WHERE subjectTitle LIKE ?', ['%' + searchQuery + '%'], (err, rows) => {
        if (err){
            req.flash('error',err);
            res.render('subjects',{data:''});
        }
        else{
        res.render('subjects',{data:rows});
        }
    });
});
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

appRouter.post('/students/add',(req, res)=>{
    let studentLastName = req.body.studentLastName;
    let studentFirstName = req.body.studentFirstName;
    let studentMiddleName = req.body.studentMiddleName;

    var form_data={
        studentLastName: studentLastName,
        studentFirstName: studentFirstName,
        studentMiddleName: studentMiddleName
    };

    mysqlConnection.query('INSERT INTO students SET ?', form_data, (err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/students');
        }
        else{
        req.flash('success', 'Student Added to Record');
        res.redirect('/students');
        }
    });
});

appRouter.post('/subjects/add',(req, res)=>{
    let subjectTitle = req.body.subjectTitle;
    let subjectNo = req.body.subjectNo;
    let transcriptLoad = req.body.transcriptLoad;
    let payingLoad = req.body.payingLoad;
    let teachingLoad = req.body.teachingLoad;

    var form_data={
        subjectTitle: subjectTitle,
        subjectNo: subjectNo,
        transcriptLoad: transcriptLoad,
        payingLoad: payingLoad,
        teachingLoad: teachingLoad
    };

    mysqlConnection.query('INSERT INTO subjects SET ?', form_data, (err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/subjects');
        }
        else{
            req.flash('success', 'Subject Added to Record');
            res.redirect('/subjects');
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

appRouter.post('/students/edit/:id',(req, res)=>{
    let studentID= req.body.studentID;
    let studentLastName = req.body.studentLastName;
    let studentFirstName = req.body.studentFirstName;
    let studentMiddleName = req.body.studentMiddleName;

    var form_data={
        studentID: studentID,
        studentLastName: studentLastName,
        studentFirstName: studentFirstName,
        studentMiddleName: studentMiddleName
    };

    mysqlConnection.query('UPDATE students SET ? WHERE studentID= '+studentID, form_data, (err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/students');
        }
        else{
        req.flash('success', 'Student Record Updated');
        res.redirect('/students');
        }
    });
});

appRouter.post('/subjects/edit/:id',(req, res)=>{
    let subjectID= req.body.subjectID;
    let subjectTitle = req.body.subjectTitle;
    let subjectNo = req.body.subjectNo;
    let transcriptLoad = req.body.transcriptLoad;
    let payingLoad = req.body.payingLoad;
    let teachingLoad = req.body.teachingLoad;

    var form_data={
        subjectID: subjectID,
        subjectTitle: subjectTitle,
        subjectNo: subjectNo,
        transcriptLoad: transcriptLoad,
        payingLoad: payingLoad,
        teachingLoad: teachingLoad
    };

    mysqlConnection.query('UPDATE subjects SET ? WHERE subjectID= '+subjectID, form_data, (err, result) => {
        if(err){
            req.flash('error',err);
            res.redirect('/subjects');
        }
        else{
        req.flash('success', 'Subject Record Updated');
        res.redirect('/subjects');
        }
    });
});

module.exports=appRouter;