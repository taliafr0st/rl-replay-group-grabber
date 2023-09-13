const auth = require('../auth/auth.json');

const express = require('express');
const app = express();

const cors = require('cors');

const discord = require('discord.js');
import ready from "./listeners/ready";
const client = new discord.Client({
    intents: []
});
ready(client);
client.login(auth['discord-token'])
//console.log(client);

var listener = app.listen(3000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 3000
});

app.use(cors({
    origin: '*'
}));
app.use(express.static('./'))