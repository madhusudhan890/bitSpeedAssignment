const connect = require("./models/connection")


async function dam(table){
   return new Promise((resolve,reject)=>{
        connect.query(table,function(err,result){
            if(err) return reject(err)
            else return resolve(result)
        })
    });
};

exports.testing = async (req,res)=>{
    const table = `SELECT * FROM contact`
    // console.log(connect)
    let result =[]
    let d = await dam(table)
    console.log(d,"d")
    res.send(d)
}