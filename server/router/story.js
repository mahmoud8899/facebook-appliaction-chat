
const router = require('express').Router()
const verify = require('../token/jwt_verify')
const StoryController = require('../controller/story')



router.get('/allstory/', StoryController.viewStory)
router.post('/storyimage/', verify, StoryController.storyImagetime)










module.exports = router