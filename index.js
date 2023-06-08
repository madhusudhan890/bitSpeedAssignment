const dotenv = require("dotenv")
dotenv.config();

const express = require('express');
const creatTable = './models/table'
const app = express()
const routes = require("./routes/routes")
const path = require("path")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");

app.use("/api/v1/",routes)

const PORT = 4000
app.listen(PORT,() => {
    console.log(`server is running at port ${PORT}`)
})