const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
  const { email, book, chapter, category } = req.body;

  // Assuming 'suggestions.html' is in the same directory as this script
  const htmlFilePath = './suggestions.html';
  const html = fs.readFileSync(htmlFilePath, 'utf8');

  var nodeMailer = require('nodemailer');

  var jsdom = require('jsdom');

  // Create dom from the html content
  var dom = new jsdom.JSDOM(html);

  // Access the dom and get text from an element
  var emailAddress = email;
  var bookName = book;
  var startingChapter = chapter;
  var categoryText = category;

  var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'achuworifung@gmail.com',
      pass: 'Santanfoothills47'
    }
  });

  var mailOptions = {
    from: 'achuworifung@gmail.com',
    to: 'achuclinton47@gmail.com',
    subject: 'Biblical story suggestion',
    text: `Email: ${emailAddress}\nBook: ${bookName}\nStarting Chapter: ${startingChapter}\nCategory: ${categoryText}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Form submitted successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
