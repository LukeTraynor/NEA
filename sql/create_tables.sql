--drop database

DROP DATABASE group_calendar

--Drop table

--DROP TABLE group_calendar.users;




CREATE DATABASE `group_calendar`


CREATE TABLE Users (
    Username varchar(255)
);


CREATE TABLE group_calendar.Users (
    UserID int NOT NULL PRIMARY KEY,
    Username varchar(255),
    Password varchar(255),
    email varchar(255),
    FirstName varchar(255),
    LastName varchar(255),
    ImgLoc varchar(255),
    Bio varchar(255),
    created_at TimeStamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Groups (
    GroupID int NOT NULL AUTO_INCREMENT PRIMARY KEY,

)