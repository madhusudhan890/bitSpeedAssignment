# bitSpeedAssignment
I will explain procedure i followed in order to succeed in my task based on files....

Prerequisites:

Node js  : 18.0
Mysql     : 8.0.33


Node Packages Used:
Express
Dotenv
mysql2
nodemon


Procedure:

---------------------------Index.js  File--------------------------------------

1.created a node server in port 3000 successfully using framework express.
2.configured the dotenv entension to store environment variables
3.Configured urlencode inorder to create communication between server and client
4.Integrated routes coming from different sources into express server


---------------------------Models Floder-----------------------------------------
-----------connection file------------
1.By using mysql2 node package ,successfully created local database connection
2.Exported the connection function to use it in other folders

-----------table file--------------
1.Successfully created a mysql table using database connection.


-------------------------services Folder-----------------------------------------
1.Imported all required links like database connection into folder to perform CRUD operations
2.Created a function identity to fullfill the conditions of the task
    a.Created 3 main functions like user_exit,user_phone,user_email
        In user_exit ,fetching data from database with email and phoneNumber given by client if user existed
        In user_phone,fetching data from databse with phoneNumber to see how many users are there with one phoneNumber
        In user_email,fetching data from databse with email to see how many users are there with one email
    b.if -else statements being used to satisfy the conditions>
        At first if condition,we checking if any user is existed with provided email and phoneNumber and throwing error of user is existed with same email and phoneNumber
        At second else-if condition,we looking into other conditions using if and else:
                    At first if condition we are checking if phoneNumber is being used more than twice and if used twice then thorwing error of phoneNumber being used more than twice
                    At second conditon we checking if phone number is used once and email is used once differently and if used ,updated second user as secondary preference to first phoneNumberUser
                    At last conditon ,if phoneNumber is used once and email is not associated with any other existing users,we are created new user
    c.At last condtion,if phoneNumber and email are not associated with any user either combainely or differently we are created a new user with preference of Primary.


----------------------------------Routes Folder--------------------------------------

1.Importing required packages like express and files like services
2.Created REST APIs using express Router function.
3.Exporting routes to index folder inorder to link it with server.




