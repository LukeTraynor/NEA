--drop database

DROP DATABASE group_calendar

--Drop table

--DROP TABLE group_calendar.users;




CREATE DATABASE `group_calendar`


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
)

CREATE TABLE group_calendar.Groups (
GroupID INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
GroupName VARCHAR(50) NOT NULL,
Bio VARCHAR(50),
ImgLoc VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE group_calendar.Events (
EventID INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
EventName VARCHAR(50),
TimeOfEvent DATETIME,
DateOfEvent DATE,
LocationOfEvent VARCHAR(30),
Bio VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

--fix this to have composite key
CREATE TABLE group_calendar.GroupMembers (
UserID INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
GroupID INT(6) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

--fix this to have composite key
CREATE TABLE group_calendar.EventGroups (
EventID INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
GroupID INT(6) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)