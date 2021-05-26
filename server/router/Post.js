const router = require('express').Router()
const PostController = require('../controller/Post')
const verify = require('../token/jwt_verify')

// GET ALL POST.. 
router.get('/post/', PostController.getPostAll)
router.get('/post/:id/', PostController.getPostUser)
// create Post... 
router.post('/create/', verify,  PostController.createPost)
router.delete('/delete/post/:id/', verify, PostController.deletePost)
router.put('/post/update/:id/', verify , PostController.updatePost)
router.post('/post/:id/comment/', verify, PostController.createComment)
router.put('/post/editcomment/:id/:comment_id/', verify, PostController.EditComment)
router.get('/post/comment/:id/:comment_one/', verify, PostController.visaPostandComment)
router.delete('/post/comment/:id/:comment_delte/', verify, PostController.DeleteComment)
router.put('/post/addlike/:id/', verify, PostController.addLike)

router.get('/show/like/:id/', PostController.showLike)




module.exports = router