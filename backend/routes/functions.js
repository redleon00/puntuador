var router = require("express").Router();
const { generate, generateGroup, generateRace, generateSupreme, generateEx, generateExCeba, generateMestizas, generateGroupMestizas, generateRaceMestizas, getAnimalsExcel, getAnimalsExcel2, genCria, betterTitsComp, milkerComp, resultCategory, resultGroup, resultRace,resultSupreme } = require('../controllers/FunctionsController')

router.get('/generate', generate)
router.get('/generateGroup', generateGroup)
router.get('/generateRace',generateRace)
router.get('/generateSupreme',generateSupreme)
router.get('/generateEx',generateEx)
router.get('/generateExCeba',generateExCeba)
router.get('/generateMestizas',generateMestizas)
router.get('/generateGroupMestizas',generateGroupMestizas)
router.get('/generateRaceMestizas',generateRaceMestizas)
router.get('/getAnimalsExcel',getAnimalsExcel)
router.get('/getAnimalsExcel2',getAnimalsExcel2)
router.get('/genCria',genCria)
router.get('/betterTitsComp',betterTitsComp)
router.get('/milkerComp',milkerComp)
router.get('/resultCategory',resultCategory)
router.get('/resultGroup', resultGroup)
router.get('/resultRace', resultRace)
router.get('/resultSupreme',resultSupreme)
module.exports = router;