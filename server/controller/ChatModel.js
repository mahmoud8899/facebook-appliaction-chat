const ChatModel = require('../model/ChatModel')
const ObjectId = require('mongoose').Types.ObjectId



// create Chat to two users.. 
exports.createChat = async (req, res) => {

    const { userId, lastId } = req.body
    try {
        let chat = await ChatModel.findOne({
            users: [userId, lastId]
        })

        if (chat) {
            return res.status(404).json({ message: 'wE have some Chat...' })
        } else {

            let chat = await ChatModel.create({
                users: [
                    userId,
                    lastId,
                ],
                lastMessag: ''
            })


            const saveChat = await chat.save()

            return res.status(201).json(saveChat)

        }
    }
    catch (error) {

        return res.status(404).json({ message: error.message })
    }
}


// send message .. 
exports.sendMessage = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
     
    return res.status(404).json({ message: `not id ${req.params.id}` })

    const { sender, text } = req.body

    try {
        let chat = await ChatModel.findById({ _id: req.params.id })


        if (chat) {

            const addsendMessage = {
                sender,
                text,
                date: Date.now()
            }

            chat.messag.push(addsendMessage)
            chat.lastMessag = text

            const savesend = await chat.save()

            return res.status(201).json(savesend)

        } else {
            return res.status(404).json({ message: 'not id' })
        }

    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}



// userid 
exports.userIdCheckIn = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(404).json({ message: `Not id ${req.params.id}` })

    try {
        let chat = await ChatModel.find({ users: req.params.id })
        if (chat) {
            return res.json(chat)
        } else {
            return res.json({ message: 'not User... ' })
        }
    } catch (error) {
        return res.status(401), json({ message: error.message })
    }
}



// show chat .id 
exports.visaChat = async (req,res)=>{

    if(!ObjectId.isValid(req.params.id)) 
    return res.status(404).json({message : `not id ${req.params.id}`})

        try{
            let chat = await ChatModel.findById({_id : req.params.id})
            if(chat) return res.status(200).json(chat)
            else return res.status(404).json({message : 'not chat '})
        }
        catch(error){
            return res.status(404).json({message : error.messag})
        }
}




