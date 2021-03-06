const fs = require('fs')
const path = require('path')

const hbs = require('express-handlebars')
// const bodyParser = require('body-parser')
require('dotenv').config()

const express = require('express');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = 3000;

const connections = []

app.engine('hbs', hbs({ extname: 'hbs' }));
app.set('views', path.join(__dirname, '/src/views/'))
app.set('view engine', 'hbs')

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

app.use(express.static(__dirname + '/public/'))

app.get('/', (req, res, next) => {
    res.render('chat');
})

app.get('/chat', (req, res, next) => {
    res.render('chat');
})
app.get('/login', (req, res, next) => {
    res.render('login');
})
app.post('/chat', (req, res, next) => {
    res.redirect('chat')
});

io.on('connection', function(socket){
    connections.push(socket)

    socket.on('message', function(msg) {
        io.emit('message', msg);
    });

    io.sockets.emit('users', connections.length)
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        io.sockets.emit('users', connections.length)
    });
});

http.listen(process.env.PORT || 3000, function(){
    console.log(`listening on port ${port}`);
});