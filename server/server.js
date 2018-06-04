require('./config/config.js')

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/user'));


mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) throw err;

    console.log('BD on line!');
});


app.listen(process.env.PORT, () => {
    console.log(`Server is listen on port ${process.env.PORT}`);
})