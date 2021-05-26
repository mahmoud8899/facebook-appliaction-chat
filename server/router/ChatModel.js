const router  = require('express').Router()
const ControllerChat = require('../controller/ChatModel')


router.get('/chat/:id/', ControllerChat.visaChat)
// create chat.
router.post('/create/', ControllerChat.createChat)
router.post('/send/:id/', ControllerChat.sendMessage)
router.get('/chat/user/:id/', ControllerChat.userIdCheckIn)








module.exports = router