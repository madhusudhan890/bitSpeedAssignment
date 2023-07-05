const {Router} = require("express");
const router = Router()
const user_contacts = require("../services/services")

const test = require("../dam")

router.get("/identify",user_contacts.getIdentity)
router.post("/identify",user_contacts.identity)
router.get("/",test.testing)

module.exports = router






