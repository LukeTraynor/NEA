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



CREATE TABLE Groups (
    GroupID int NOT NULL AUTO_INCREMENT PRIMARY KEY,

)