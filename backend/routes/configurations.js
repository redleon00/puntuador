var router = require("express").Router();
const { register, list } = require('../controllers/ConfigurationController')


router.post('/register', register)
router.get('/', list)


module.exports = router;