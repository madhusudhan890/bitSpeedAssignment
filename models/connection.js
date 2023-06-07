const mysql = require("mysql2/promise")

async function connect() {
  try {
  const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: "password",
  database: "project"
  });
  if (connection) {
  console.log('Database Connected');
  // console.log(connection);
  // return "connected"
  }
  return connection;
  } catch (error) {
  console.error('Error connecting to the database:', error);
  throw error;
  }
  }

module.exports= connect;
