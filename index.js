const dotenv = require("dotenv")
dotenv.config();

const express = require('express');
const creatTable = './models/table'
const app = express()
const routes = require("./routes/routes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1",routes)
// app.use(creatTable)
app.use("/",(req,res)=>{
    res.json({
        status:"success",
        message:"please go to /identity route for task info"
    })
});



const PORT = 4000
app.listen(PORT,() => {
    console.log(`server is running at port ${PORT}`)
})