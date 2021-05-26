const ChatModel = require('../model/ChatModel')

// send message .. 
const nowSend = async (senderId, text,  chatId) => {


    try {
        let chat = await ChatModel.findById(chatId)


        if (chat) {

            const addsendMessage = {
                sender :senderId,
                text,
                date: Date.now()
            }

            chat.messag.push(addsendMessage)
            chat.lastMessag = text

            const savesend = await chat.save()

            return {savesend}

        } else {
            return {error : 'Not Fount...'}
        }

    } catch (error) {

        return {error : 'Not Fount...'}
    }
}



module.exports = nowSend