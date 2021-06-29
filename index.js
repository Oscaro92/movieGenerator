const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false, type:"application/x-www-form-urlencoded"}))
app.use('/', require('./api/index'));
const Port = process.env.Port || 3000;

app.listen(Port, () => console.log("Et z'est barti sur le port : "+Port));

app.all('*', (req, res) => {
    res.end();
});