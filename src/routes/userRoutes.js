const {Router} = require("express");
const {signup, login, profile} = require("../controller/userController")
const {checkUserLogin} = require("../middlewares/auth")
const router = Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/profile', checkUserLogin, profile)

module.exports = router