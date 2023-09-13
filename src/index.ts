import auth from './auth/auth.json';

const express = require('express');
const app = express();

const cors = require('cors');

const discordclient = require("./discordclient");

var listener = app.listen(3000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 3000
});

app.use(cors({
    origin: '*'
}));
app.use(express.static('./'))