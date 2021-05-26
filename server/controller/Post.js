const Post = require('../model/Post')
const Object = require('mongoose').Types.ObjectId
const User = require('../model/Auth')

//Post create.. 
exports.createPost = async (req, res) => {

    const { discription,  image, video } = req.body

    try {
        let post = new Post({
            discription,
            user: req.user._id,
            video,
            image: image,
           
        })
        const newPost = await post.save()
        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

// get all post... 
exports.getPostAll = async (req, res) => {



    let post = await Post.find({}).populate('user').sort({ createdAt: -1 });
    if (post) return res.json(post)
    else return res.status(404).json({ message: 'we have not Post now... ' })

}

// only post to User.... 
exports.getPostUser = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.param.id}` })


    let user = await User.findById(req.params.id)
    let post = await Post.find({ user }).populate('user').select('-password').sort({ createdAt: -1 })
    if (post) return res.json(post)
    else return res.status(404).json({ message: 'tomt...' })
}


// delete Post... 
exports.deletePost = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `id ${req.params.id}` })

    try {
        let post = await Post.findById(req.params.id)
        if (post) {

            await Post.deleteOne({ _id: req.params.id })
            return res.json({ message: 'okej remove Post.....' })
        } else {
            return res.status(404).json({ message: 'not....' })
        }



    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// update Post.... 
exports.updatePost = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID :${req.params.id}` })

    const { discription, date, image } = req.body

    try {
        let post = await Post.findById(req.params.id)
        if (post) {

            if (post.user._id.toString() === req.user._id.toString()) {

                post.discription = discription,
                    post.date = date,
                    post.user = req.user._id,
                    post.image = image

                await post.save()
                return res.status(201).json(post)

            } else {
                return res.status(404).json({ message: 'En Annna User..' })
            }
        } else {
            return res.status(404).json({ message: error.message })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// create comment... 
exports.createComment = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })
    const { comment, image } = req.body
    try {
        let post = await Post.findById(req.params.id)
        if (post) {

            const newcomment = {
                name: req.user.username,
                user: req.user._id,
                comment,
                image,
                image_user: req.user.image
            }

            post.commentus.push(newcomment)

            post.maxComment = post.commentus.length

            await post.save()

            return res.json(post)


        } else {
            return res.status(404).json({ message: 'we Have not Post...' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

// PUT  Edit Comment from Post... 
exports.EditComment = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID : ${req.params.id}` })

    const { comment, image } = req.body

    try {
        let post = await Post.findById({ _id: req.params.id })

        if (post) {

            if (post.user._id.toString() === req.user._id.toString()) {

                const newPost = post.commentus.find((postid) => postid._id.toString() === req.params.comment_id.toString())
                if (newPost) {
                    newPost.image = image,
                        newPost.comment = comment
                    await post.save()
                    return res.json(post)
                }
                else return res.json('no')

            } else {
                return res.status(404).json({ message: 'En Annan User...' })
            }



        } else {

            return res.status(404).json({ message: 'we Have not Post ....' })
        }
    } catch (error) {


        return res.status(404).json({ message: error.message })
    }



}


// Delete Comment from user.... 
exports.DeleteComment = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID : ${req.params.id}` })

    try {
        let post = await Post.findById({ _id: req.params.id })

        if (post) {



            const nowPostdelte = post.commentus.filter((postdelete) => postdelete._id.toString() !== req.params.comment_delte.toString())

            if (nowPostdelte) {

                post.commentus = nowPostdelte
                Number(post.maxComment.length - 1)
                await post.save()
                return res.json({ message: 'remove... Comment...' })
            } else {

                return res.status(404).json({ message: 'we have not somme Comment...' })
            }



        } else {

            return res.status(404).json({ message: 'we hAve not Post.' })
        }
    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}

// Delete Comment from user.... 
exports.visaPostandComment = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID : ${req.params.id}` })

    try {
        let post = await Post.findById({ _id: req.params.id })

        if (post) {
            const nowPostdelte = post.commentus.find((commentid) => commentid._id.toString() == req.params.comment_one.toString())

            if (nowPostdelte) {
                return res.json(nowPostdelte)
            } else {

                return res.status(404).json({ message: 'we have not somme Comment...' })
            }
        } else {

            return res.status(404).json({ message: 'we hAve not Post.' })
        }
    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}

// Add Like.... 
exports.addLike = async (req, res) => {

    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })

    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.user._id)) {
            await post.updateOne({ $push: { likes: req.user._id } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.user._id } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }

}


// show Like
exports.showLike = async (req,res)=>{
    if(!Object.isValid(req.params.id))
    return res.status(404).json({message: `Id ${req.params.id}`})

    try{
        let post = await Post.findById({_id: req.params.id})

        if(post){
            const showLike = await Promise.all(
                post.likes.map((lik)=>{
                    return User.findById(lik)
                })
            )

            let addLikeNew  = []

            showLike.map((newL)=>{
                const  {_id , username, image } = newL
                    addLikeNew.push({_id , username, image })
            })

            return res.json(addLikeNew)
   
            return res.json(showLike)
        }else{
            return res.json({message : 'Not Post...'})
        }


    }catch(error){
        return res.status(404).json({message : error.message})
    }
}




