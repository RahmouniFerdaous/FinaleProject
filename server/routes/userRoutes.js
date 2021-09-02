const router = require('express').Router()
const userController = require('../controllers/userController')

const { validationCheck } = require('../middlewares/dataCheckMiddleware')
const { validationCheckRegister } = require('../middlewares/registerDataCheckMiddleware')

const { tokenMiddleware } = require('../middlewares/tokenMiddleware')

router.post('/register',validationCheckRegister,userController.register)

router.post('/login',validationCheck,userController.login)

router.get('/getprofile',tokenMiddleware, userController.getUserProfile)

router.put('/editprofile/:id',tokenMiddleware, userController.editProfile)

router.put('/updaterole/:id',tokenMiddleware,userController.updateRole)

module.exports=router