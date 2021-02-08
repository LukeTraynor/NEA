--drop database

DROP DATABASE group_calendar

--Drop table

--DROP TABLE group_calendar.Users;




CREATE DATABASE `group_calendar`;


CREATE TABLE group_calendar.Users (
UserID INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
Username VARCHAR(50) UNIQUE,
User_Password VARCHAR(150),
FirstName VARCHAR(30),
LastName VARCHAR(30),
Email VARCHAR(50),
Bio VARCHAR(50),
ImgLoc VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_calendar.Groups (
GroupID INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
GroupName VARCHAR(50) NOT NULL,
Bio VARCHAR(50),
ImgLoc VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_calendar.Events (
EventID INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
EventName VARCHAR(50),
TimeOfEvent DATETIME,
DateOfEvent DATE,
LocationOfEvent VARCHAR(30),
Bio VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE group_calendar.GroupMembers (
UserID INT(6) NOT NULL ,
GroupID INT(6) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (UserID, GroupID)
);

CREATE TABLE group_calendar.EventGroups (
EventID INT(6) NOT NULL,
GroupID INT(6) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (EventID, GroupID)
);

-- create user

INSERT INTO `Users` (`Username`, `User_Password`, `FirstName`, `LastName`, `email`, `bio`, `created_at`) VALUES ('Luke', 'pass', 'luke', 'traynor', NULL, 'words words words', CURRENT_TIMESTAMP);

-- getting user

select *
from Users
where UserID = 1;

select Groups.GroupName, Groups.GroupID, Groups.Bio, Groups.ImgLoc from Users, `Groups` where Users.UserID = 1;
select * from Users, `Groups` where Users.UserID = 1;


-- create event

INSERT INTO `Events` (`EventName`, `TimeOfEvent`, `DateOfEvent`, `LocationOfEvent`, `bio`, `created_at`) VALUES ('Meeting', '20200404', '20200303', 'Woodhouse College', 'lots and lots of words about event', CURRENT_TIMESTAMP);

-- getting event

select *
from Events
where EventID = 1;

-- create group

INSERT INTO `Groups` (`GroupName`, `bio`, `ImgLoc`, `created_at`) VALUES ('Tesco2', 'loads of loads of words for bio', 'location', CURRENT_TIMESTAMP);

INSERT INTO `GroupMembers` (`UserID`, `GroupID`) VALUES (1, 1);


-- getting Groups

SELECT * FROM `Groups`;

SELECT * FROM `Groups` where GroupID = 1;

-- updating a user, example

UPDATE Users SET FirstName = 'newfirst1', LastName = 'newlast', Email = 'newemail', Bio = 'newbio' WHERE UserID = 1;

-- put this in to terminal before connecting to database with node js
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw'