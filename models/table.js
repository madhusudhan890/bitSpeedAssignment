const connection = require("./connection")


const table =
    `
    CREATE TABLE IF NOT EXISTS contact (
        id SERIAL PRIMARY KEY,
        phoneNumber varchar(16),
        email varchar(32),
        linkedId int default null,
        linkPrecedence enum('primary','secondary'),
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        is_deleted VARCHAR(16) default null
    )
    `   

 async function creatTable(){
    try {
        let d = await connection()
        let createTale= d.execute(table)
        if(createTale)   return "table created"
    } catch (error) {
        throw error
    }
}

module.exports = creatTable