const express = require('express');

const cors = require('cors');

const nodeMailer = require('nodemailer');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');

app.use(express.static('public'));


//each time someone visits the suggest route redirect them to index html

app.get('/suggest', (req, res) => {
    // res.redirect('/index.html');
    
    res.status(200).redirect('/index.html');
});

app.listen(3000);

