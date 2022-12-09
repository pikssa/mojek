const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authorization')
const userController = require('../controller/userController');



router.post('/register',userController.createUser) 

router.post('/login', userController.loginUser)



router.put('/user/:userId/profile', middleware.authorization ,userController.updateUserList)

router.get('/user/:userId',middleware.authorization ,userController.sipCalculatipon)










module.exports = router