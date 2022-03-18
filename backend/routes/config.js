var router = require("express").Router();

const { saveConfig  } = require('../controllers/ConfigController')

router.post('/saveconfig', saveConfig)

module.exports = router;