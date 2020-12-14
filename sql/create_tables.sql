--drop database

DROP DATABASE group_calendar

--Drop table

--DROP TABLE group_calendar.users;




CREATE DATABASE `group_calendar`;


CREATE TABLE group_calendar.Users (
UserID INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
Username VARCHAR(50),
User_Password VARCHAR(50),
FirstName VARCHAR(30) NOT NULL,
LastName VARCHAR(30) NOT NULL,
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

INSERT INTO `Users` (`Username`, `User_Password`, `FirstName`, `LastName`, `email`, `bio`, `created_at`) VALUES ('Luke', 'pass', 'luke', 'traynor', 'luke@gmail.com', 'words words words', CURRENT_TIMESTAMP);

-- getting user

select *
from Users
where UserID = 1;

-- create event

INSERT INTO `Events` (`EventName`, `TimeOfEvent`, `DateOfEvent`, `LocationOfEvent`, `bio`, `created_at`) VALUES ('Meeting', '20200404', '20200303', 'Woodhouse College', 'lots and lots of words about event', CURRENT_TIMESTAMP);

-- getting event

select *
from Events
where EventID = 1;

-- put this in to terminal before connecting to database with node js
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'my-secret-pw'