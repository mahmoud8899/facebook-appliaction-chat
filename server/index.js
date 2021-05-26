const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const path = require('path')

mongoose.connect(process.env.MONGOOSE_URL,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, info) => {
    if (!err) console.log('mongoose......')
  })

const PORT = process.env.PORT || 4000
app.use([
  express.json(),
  express.urlencoded({ extended: true }),
])


app.get('/*', function (req, res, next) {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});

app.use(morgan('dev'))
// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);





app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
// router..... 
const AuthRoute = require('./router/Auth')
const PostRoute = require('./router/Post')
const Uploading = require('./router/upload')
const StoryRouter = require('./router/story')
const ChatRouter = require('./router/ChatModel')
app.use('/api/', Uploading)
app.use('/api/', AuthRoute)
app.use('/api/', PostRoute)
app.use('/api/', StoryRouter)
app.use('/chat/', ChatRouter)


const http = require('http').createServer(app)


const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
})



let users = [];
const nowSend = require('./socketUser/SendMessage')
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};



io.on('connection', (socket) => {
  console.log('Login user' + socket.id)

  socket.on('join', async (userId) => {
    addUser(userId, socket.id)
    io.emit('getUser', users)
    console.log(users)
  })



  // send Message..... new. 
  socket.on('loadingSend', async ({ senderId, text, lastUser, chatId }) => {


    const { error, savesend } = await nowSend(senderId, text, chatId)


    if (!error) {

      socket.emit('SendMes', savesend)

      const user = await getUser(lastUser)
      if (user) {
        io.to(user.socketId).emit('LastMess', { senderId, text })
        console.log('okej')
        console.log('user', user.socketId)
      } else {
        console.log('not Here: ' + text)
      }
    }
  })




  socket.on("callUser", (data) => {

    const user = getUser(data.userToCall)

    if(user){
      io.to(user.socketId)
      .emit("callUser", { 
        signal: data.signalData, 
        from: data.from, 
        name: data.name 
      })

      console.log('user.socketId',user.socketId)
    }else{
      console.log('not user...')
    }


  })

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal)
  })





  socket.on('disconnect', () => {
    removeUser(socket.id)
    io.emit('getUser', users)
    console.log('Logo Ut..')
  })

})



http.listen(PORT, function () {
  console.log('listening on port 4000')
})
