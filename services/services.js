
const connect = require("../models/connection")
const createTable = require("../models/table")


exports.identity = async(req ,res)=>{
    try {
        const d =await connect()
        let table1 = await createTable()
        let user_exits = await user_exit(req.body.phoneNumber,req.body.email)
        let user_phone = await used_phoneNumber(req.body.phoneNumber)
        var user_email = await used_email(req.body.email)
        // console.log(user_email,"ddddddd")
        if(user_exits.status === "success"){
            // res.status(400).json({
            //     status:"fail",
            //     message:"There is already a user with these phoneNumber and email.Please use different PhoneNumber or email",
            //     data:user_exits
            // })
            let result
            if(user_exits){
                result = {
                status:400,
                message:"There is already a user with these phoneNumber and email.Please use different PhoneNumber or email",
                data: user_exits.data
                }

            }
            res.render("input.ejs",{data:result}) 
        }else if(user_phone.status === "success"){
                if(user_phone.data.length >1){
                   const primaryUser = user_phone.data[0]
                   const secondaryUser =  user_phone.data[1];

                 const response =    {
                        "contact":{
                            "primaryContatctId": primaryUser.id,
                            "emails": [primaryUser.email,secondaryUser.email],
                            "phoneNumbers": [primaryUser.phoneNumber],
                            "secondaryContactIds": [secondaryUser.id]
                        }
                    }
                    // res.status(400).json({
                    //     status:"fail",
                    //     message:"There is more than two users with these phoneNumber.Please use different PhoneNumber",
                    //     data:response
                    // })
                    let result
                    if(response){
                        result = {
                        status:400,
                        message:"There is more than two users with these phoneNumber.Please use different PhoneNumber",
                        data: response
                        }
    
                    }
                    res.render("input.ejs",{data:result}) 
                }else if(user_phone.data.length === 1 && user_email.data.length ===1){
                        const primaryUser = user_email.data[0]
                        const secondaryUser = user_phone.data[0]
                        const table = `UPDATE contact SET linkedId=?,linkPrecedence=? WHERE id=?`
                        const [rows,fields] = await d.execute(table,[primaryUser.id,"secondary",secondaryUser.id])
                      const response =    {
                         "contact":{
                             "primaryContatctId": primaryUser.id,
                             "emails": [primaryUser.email,secondaryUser.email],
                             "phoneNumbers": [primaryUser.phoneNumber,secondaryUser.phoneNumber],
                             "secondaryContactIds": [secondaryUser.id]
                         }
                     }
                        // res.status(200).json({
                        //     status:"success",
                        //     message:"user is being successfully updated",
                        //     data: response
                        // })
                        let result
                        if(response){
                            result = {
                            status:200,
                            message:"user is being successfully updated",
                            data: response
                            }
        
                        };
                        res.render("input.ejs",{data:result}) 
                }else{
                    const linkid = user_phone.data[0].id
                    const table=`INSERT INTO contact (phoneNumber,email,linkPrecedence,linkedId) VALUES (? ,?,?,?)`
                    const [rows,fields]=await  d.execute(table,[req.body.phoneNumber,req.body.email,"secondary",linkid])
                    const row = await d.execute(`SELECT * FROM contact WHERE id=?`,[rows.insertId])
                    // res.status(200).json({
                    //     status:"success",
                    //     message:"new user is being created successfully using new phoneNumber",
                    //     data: row[0]
                    // })
                    let result
                    if(row){
                        result = {
                        status:200,
                        message:"new user is being created successfully using new phoneNumber",
                        data: row[0]
                        }
    
                    }
                    res.render("input.ejs",{data:result}) 
                }
            

        }else{
                if(user_email.data.length > 1){
                    
                        let result = {
                        status:400,
                        message:"User email being assigned to more than 2 users already.Please use new email",
                        }
        
                   
                    res.render("input.ejs",{data:result}) 
                }else{
                const table=`INSERT INTO contact (phoneNumber,email,linkPrecedence) VALUES (? ,?,?)`
                const [rows,fields]=await  d.execute(table,[req.body.phoneNumber,req.body.email,"primary"])
                const row = await d.execute(`SELECT * FROM contact WHERE id=?`,[rows.insertId])
                // res.status(200).json({
                //     status:"success",
                //     message:"new user is being created successfully",
                //     data: row[0]
                // })
                let result
                if(row){
                    result = {
                    status:200,
                    message:"user created successfully",
                    data: row[0]
                    }
    
                }
                res.render("input.ejs",{data:result}) 
            }
        }


    } catch (error) {
        res.status(400).json(error.message)
    }
}


const user_exit = async(phoneNumber,email)=>{
    try {
        const d =await connect()
        if(!phoneNumber || !email){
            return "Please provide phoneNumber and email"
        }else{
            let [rows]=await d.execute('SELECT * FROM contact WHERE `phoneNumber` = ? AND `email` = ? ',[phoneNumber,email])
            if(rows.length >0) return {status:"success",data:rows}
            else return {status:"failure",data:rows}
        }
    } catch (error) {
        throw error
    }
}

const used_phoneNumber = async(phoneNumber)=>{
    try {
        const d =await connect()
        if(!phoneNumber){
            return "Please provide phoneNumber"
        }else{
            let [rows]=await d.execute('SELECT * FROM contact WHERE `phoneNumber` = ?',[phoneNumber])
            if(rows.length > 0) return {status:"success",data:rows}
            else return {status:"failure",data:rows}
        }
    } catch (error) {
        throw error
    }
}

const used_email = async(email)=>{
    try {
        const d =await connect()
        if(!email){
            return "Please provide email"
        }else{
            let result =await d.execute('SELECT * FROM contact WHERE `email` = ?',[email])
            if(result[0].length > 0) return {status:"success",data:result[0]}
            else return {status:"failure",data:result[0]}
        }
    } catch (error) { 
        throw error
    }
}

exports.getIdentity = async(req,res)=>{
    res.render("pages/output.ejs")
}