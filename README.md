# NEA - Group Calendar

This repo contains all the code for Group Calendar

## Git commands

`git status` - shows the status of all files in local repository
`git add <file_name>` - Adds the file to staging
`git commit -m "commit message"` - this will commit changes locally
`git push` - this will push all committed changes to a remote repository
`git pull` - this will pull down all committed changes from remote repository
`git checkout -b <branch_name>` - creates new branch and moves to this branch


## SQL commands

### INSERT ROW INTO USER TABLE EXAMPLE

```INSERT INTO `users` (`UserID`, `Username`, `Password`, `Timestamp`) VALUES (NULL, 'Luke', 'asdf', CURRENT_TIMESTAMP);```

### UPDATING EXISTING ITEM IN USER TABLE EXAMPLE

```UPDATE `users` SET `Password` = 'FDAA' WHERE `users`.`UserID` = 1;```

### SEARCHING FOR AN ITEM IN USER TABLE EXAMPLE

```SELECT * FROM `users` WHERE `users`.`UserID` = 1;```

### DELETING AN ITEM FROM THE USER TABLE EXAMPLE

```DELETE FROM `users` WHERE `users`.`UserID` = 2```

## Creating local docker mySQL database

### Create mySQL Docker DB
docker run --name test-mysql -p 3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:latest

### Check which port mySQL Docker DB is running on
docker ps

### Log into mySQL Docker DB
mysql -P 32768 --protocol=tcp -u root -p

## mySQL cli commands
use group_calendar;  sets the database 
show tables;  displays all tables in the chosen database

## ideas
create map for events location - google api etc
using google api to dynamically populate addresses

## Things to fix
* the popup for the groups page on the + button

## To Do
* Create SQL for all tables - complete
* Draw all wireframes for all pages
* Create all HTML pages - wip
* Implement AJAX calls into all html pages
* connect all html pages - mostly done
* calendar
* api for other methods and other resources     /users     /events
* login/register page connection
* cookie sessions to hold the user id

Group A B C
help with other api methods
what to do with the calendar html page



## today
* create user manually
* sql to get user information
* api to get user information
* ajax call to interact with api

* write out 4 methods and paths
* 

## methods

GET Users/:UserID
select * where UserID = UserID

DELETE Users
request body = UserID : "UserID"     accepted in json

PUT Users
request body = pass through all parameters

POST Users
request body = pass through all parameters

## Hosting pages on a web server
done locally very basic http server
python -m SimpleHTTPServer 8000
this is required in order to make use of cookies cant be done when serving the html files directly through the browser



delete cookie when leaving.