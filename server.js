if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let request = require('request');
let url = require('url');
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

// app
//code for the api



function getBibleVerse(verse) {
  return new Promise((resolve, reject) => {
    let option = {
      url: 'http://labs.bible.org/api/',
      qs: {
        'passage': verse,
        'type': 'json',
        'formatting':'full'
      }
    };

    request(option, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        reject('Error fetching Bible verse.');
        return;
      }

      let story = "<div>";
      let info = JSON.parse(body);
      for (let i = 0; i < info.length; i++) {
        // story += '<p>'+ info[i].text + '</p>';
        story +=  info[i].text ;
      }
      story += '</div>';
      console.log(story);

      resolve(story);
    });
  });
}

// Example of using the getBibleVerse function with a Promise
// getBibleVerse('Genesis 1:1-3')
//   .then(story => {
//     console.log('Story:', story);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });


// Example usage:
// getBibleVerse('Genesis 6:1-22');

app.post('/verse', async function(req, res, next) {
  try {
    let verse = req.body.verse;
    
    let story = await getBibleVerse(verse);
    res.json({ message: story });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// app.listen(3000);