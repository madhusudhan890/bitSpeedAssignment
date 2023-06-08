const {Router} = require("express");
const router = Router()
const user_contacts = require("../services/services")



router.get("/identify",user_contacts.getIdentity)
router.post("/identify",user_contacts.identity)

module.exports = router






