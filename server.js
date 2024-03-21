if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let request = require('request');
let url = require('url');
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const email = process.env.SENDER_EMAIL;
const pass = process.env.SENDER_PASSWORD;

app.use(cors());
app.use(express.urlencoded());
app.use(express.json()); // Add this line to parse JSON data
app.use(express.static('public'));

// Route to handle form submissions
app.post('/submit-data', function (req, res, next) {
  const formData = req.body;
    
    sendTheMail(formData.email, formData.Book, formData.Chapters,formData.category);
    res.status(200).redirect('/sugestion.html');
    
  });
  
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  

  function sendTheMail(useremail,book,chapter,category)
  {
    
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


//bible api methods
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
        story +=  info[i].text ;
      }
      story += '</div>';

      resolve(story);
    });
  });
}

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

//production script
app.use(express.static('./public/index.html'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public','index.html'));
});