const express = require('express');
const app = express();
require('dotenv').config();
const {SERVER_PORT, SESSION_SECRET} = process.env
const session = require('express-session')

// Controllers
const mc = require('./controllers/messagesCtrl.js')

// Middleware setup
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.use((req, res, next) => {
    let badWords = ['knucklehead', 'jerk', 'internet explorer'];
    if (req.body.message) {
        for (let i = 0; i < badWords.length; i++) {
            let regex = new RegExp(badWords[i], 'g');
            req.body.message = req.body.message.replace(regex, '****');
        }
        next();
    } else {
        next();
    }
});

// Endpoints
app.get('/api/messages', mc.getAllMessages)
app.get('/api/messages/history', mc.history)

app.post('/api/message', mc.createMessage)

// Listen
app.listen(SERVER_PORT, ()=> console.log(`Listing on server port ${SERVER_PORT}`))