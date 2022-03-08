CREATE DATABASE c2240_paa4;
USE c2240_paa4;

CREATE table Teachers(
	teacherID int AUTO_INCREMENT,
 	teacherLastname	Varchar(50),
 	teacherFirstName Varchar(50),
 	teacherMiddleName Varchar(50),
    primary key(teacherID)
);

CREATE table Subjects(
	subjectID int AUTO_INCREMENT,
	subjectTitle Varchar(200),
 	subjectNo varchar(50),
 	transcriptLoad int,
    payingLoad int,
    teachingLoad int,
    primary key(subjectID)
);

CREATE table Students(
	studentID int AUTO_INCREMENT,
 	studentLastname	Varchar(50),
 	studentFirstName Varchar(50),
 	studentMiddleName Varchar(50),
    primary key(studentID)
);
