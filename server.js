if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const email = process.env.SENDER_EMAIL;
const pass = process.env.SENDER_PASSWORD;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json()); // Add this line to parse JSON data

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route to handle form submissions
app.post('/submit-data', function (req, res, next) {
    const formData = req.body;
    
    // Log the received data
    // console.log('Received data:', formData);

    //get individual data
    console.log('from body', formData.email);

    // Send a response back to the client
    // res.json({ status: 'success', message: 'Data received successfully' });
   

    sendTheMail(formData.email, formData.Book, formData.Chapters,formData.category);
    res.status(200).redirect('/sugestion.html');
    // res.redirect('./sugestion.html');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

function sendTheMail(useremail,book,chapter,category)
{
    //getting an invalid log in check password
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: pass
  }
});

var mailOptions = {
  from: email,
  to: email,
  subject: 'Here is a suggestion',
  text: 
  `
  email: ${useremail}
  book: ${book}
  chapter: ${chapter}
  category:${category}
  `
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}