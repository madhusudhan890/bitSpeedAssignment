const {Router} = require("express");
const router = Router()
const user_contacts = require("../services/services")


router.post("/identity",user_contacts.identity)

module.exports = router






