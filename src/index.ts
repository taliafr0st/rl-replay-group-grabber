const express = require('express');
const cors = require('cors');
const app = express();

var listener = app.listen(3000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 3000
});

app.use(cors({
    origin: '*'
}));
app.use(express.static('./'))