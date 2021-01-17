const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const env = require('./environment/environmentVariables');
const AuthRoutes = require('./routes/AuthRoutes');
const MessageRoutes = require('./routes/MessageRoutes');

const app = express();

mongoose.connect( '', 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
() => console.log('Connected to db!'));

const PORT = process.env.PORT || 3000

const server = http.createServer(app);
const io = socketio(server); 


const corsOptions = {
    exposedHeaders: 'authorization',
};
  
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/users/auth',AuthRoutes)
app.use('/api/messages',MessageRoutes)
app.use(errors());
io.on('connection', (socket) => {
    console.log('connected');
    socket.on('sendMessage', (message, callback) => {
        console.log('message', message);
        io.emit('message',message);
        callback();
    })

    socket.on('disconnect', (name) => {
            io.emit('message', { user: 'admin', text: `A user has left`})
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
