const mysql = require("mysql2")

// async function connect() {
//   try {
//   const connection = await mysql.createConnection({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
//   });
//   if (connection) {
//   console.log('Connected');
//   // console.log(connection);
//   // return "connected"
//   }
//   return connection;
//   } catch (error) {
//   console.error('Error connecting to the database:', error);
//   throw error;
//   }
//   }
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

module.exports= connection;
