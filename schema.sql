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

ALTER USER 'root'@'localhost' IDENTIFIED BY '';
flush privileges;

SHOW DATABASES;

select * from teachers;
select * from students;
select * from subjects;

ALTER TABLE students RENAME COLUMN studentLastname TO studentLastName;