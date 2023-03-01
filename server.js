const express = require("express");
// const hostname = "127.0.0.1";
const session = require('express-session');
const app = express();
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { spawn } = require('child_process');
// const {client} = new Client();
const port = process.env.PORT || 8005;


const appwrite = require('node-appwrite');
const client = new appwrite.Client();

client.setEndpoint('https://localhost/v1') ;
client.setProject('63fce2a7840fdaf53786') 
client.setKey('029ef6787a90de4d03bc9cfe844bc78f51147b16c50387bc4377ab5645f045a9f1f14dcaa5e33dcb9d04d91648cc4cbe092ffb869a6a23f89f1e9a0a0b2b5b5c41bc0f85deba4134ddb7a83dc2072e3777a5b76a6bfeea34fab81d0ad647c9c73342ff3f635eafedc9df2f15338e3609ec20a6bf58e584cae442788508bffc1a');                // Your project ID


// const {Appwrite} = require('appwrite');

// const appwrite = new Appwrite();

// appwrite.setEndpoint('https://localhost/v1');
// appwrite.setProject('63fce2a7840fdaf53786');
// appwrite.setKey('029ef6787a90de4d03bc9cfe844bc78f51147b16c50387bc4377ab5645f045a9f1f14dcaa5e33dcb9d04d91648cc4cbe092ffb869a6a23f89f1e9a0a0b2b5b5c41bc0f85deba4134ddb7a83dc2072e3777a5b76a6bfeea34fab81d0ad647c9c73342ff3f635eafedc9df2f15338e3609ec20a6bf58e584cae442788508bffc1a');

// appwrite.launch().then(() => {
//   console.log('Appwrite server started');
// }).catch((error) => {
//   console.error('Failed to start Appwrite server', error);
// });

app.use(express.static(path.join(__dirname, '')));

app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", `https://${process.env.PORT}-zakhoudache-jisrpharmac-q94cj5igwn9.ws-eu88.gitpod.io`);
  res.header("Access-Control-Allow-Origin", "https://jisr-pharmacy.up.railway.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get("/", (req, res) => {
  res.send("fffffffffffffffff")
})

app.listen(process.env.PORT||8005,() => {
  console.log(`Server running at http://localhost:${8005}`);
});

app.post('/chifa', async (req, res, next) => {
  let fileName = req.body.fileName;
  let dir = `\\src\\public\\Images\\${fileName}`;
  let imageChifa = req.body.imageChifa;
  let imagePath = path.join(dir, `Chifa@${fileName}.jpg`);
console.log(imagePath)
  req.session.fileName = fileName;
  req.session.dir = dir;
  req.session.imageChifa = imageChifa;
  req.session.imagePath = imagePath;

  sharedData = { 
    dir: `src\\public\\Images\\${fileName}`,
    imageChifa: imageChifa,
    fileName: fileName,
    imagePath: imagePath
  };

  res.send('Data saved');

  if (!imageChifa) {
    return res.status(400).send({ error: 'imagedata is required' });
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let counter = 0;
  while (fs.existsSync(imagePath)) {
    counter += 1;
    imagePath = path.join(dir, `Chifa@${fileName}${counter}.jpg`);
  }

  const writeToFile = (text) => {
    
    fs.appendFile('src/public/static/ListFilename.txt', text + '\n', (err) => {
      if (err) throw err;
      console.log(`I'm ${req.session.fileName} My path's text was appended to ListFilename.txt ! and here it is : ${text}`);
    });
  };
  writeToFile(imagePath);

  axios({
    method: 'get',
    url: imageChifa,
    responseType: 'stream'
  })
    .then(function (res) {
      res.data.pipe(fs.createWriteStream(imagePath));
    });
});


app.post('/ordonnance', async (req, res, next) => {
  let fileName = req.body.fileName;
  let dir = `src\\public\\Images\\${fileName}`;
  let imageOrdonnance = req.body.imageOrdonnance;
  let imagePath = path.join(dir, `Ordonnance@${fileName}.jpg`);
console.log(imagePath, dir,`Ordonnance@${fileName}.jpg`)
  req.session.fileName = fileName;
  req.session.dir = dir;
  req.session.imageOrdonnance = imageOrdonnance;
  req.session.imagePath = imagePath;

  sharedData = { 
    dir: `src\\public\\Images\\${fileName}`,
    imageOrdonnance: imageOrdonnance,
    fileName: fileName,
    imagePath: imagePath
  };

  res.send('Data saved');

  if (!imageOrdonnance) {
    return res.status(400).send({ error: 'imagedata is required' });
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let counter = 0;
  while (fs.existsSync(imagePath)) {
    counter += 1;
    // const filePath = path.join(__dirname, 'src/public/static');
    imagePath = path.join(dir, `Ordonnance@${fileName}${counter}.jpg`);
  }

  const writeToFile = (text) => {
    // const filePath = path.join(__dirname, 'src/public/static', 'home.html');
    fs.appendFile('src/public/static/ListFilenameOrdonnance.txt', text + '\n', (err) => {
      if (err) throw err;
      console.log(`I'm ${req.session.fileName} My path's text was appended to ListFilenameOrdonnance.txt ! and here it is : ${text}`);
      // console.log('The text was appended to file!');
    });
  };
  writeToFile(imagePath);

  axios({
    method: 'get',
    url: imageOrdonnance,
    responseType: 'stream'
  })
    .then(function (res) {
      res.data.pipe(fs.createWriteStream(imagePath));
    });
});



//   // Initialize Firebase
//   const serviceAccount = require('C:\\Users\\MCS\\OneDrive\\Desktop\\Jisr pharmacy\\firstprojectt-2c1de-firebase-adminsdk-c2kai-5df1d0560e.json');
  
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://firstprojectt-2c1de-default-rtdb.firebaseio.com'
//   });
  
app.post('/Postaddr',async (req, res, next) => {
  let Adr = req.body.Adr;
  req.session.Adr=Adr;

  sharedData = { 
    Adr: Adr
  };

  res.send('Data saved');
  console.log(Adr)
  
  

  const message = {
    chatfuel_token: 'HAEZnzGAbTVZeN8RYbFodOdq3cFYBBmb6eFc34SnStOPonQcmk5brpWhgvNhaWgg', // the token for the sending chatbot
    chatfuel_message_tag: 'CHATFUEL_MESSAGE_TAG', // the message tag for the message (optional)
    chatfuel_block_id: '63f4f7841d0ea92711afe86b', // the ID of the block in the receiving chatbot to trigger
    chatfuel_user_id: '6155861414436575', // the user ID of the user to send the message to in the receiving chatbot
    custom_payload: { message: Adr } // the message you want to send
  };
  console.log(message.custom_payload.message)
  res.end(`lets send ${message.custom_payload.message}`);
  

  // // Store the message sent by the first Chatfuel chatbot in Firebase
  // admin.database().ref('messages').set({
  //   message: message
  // });
  
  // // Retrieve the stored message in your webhook
  // admin.database().ref('messages').once('value')
  //   .then((snapshot) => {
  //     const message = snapshot.val().message;
  //     console.log(message);
  //     // Use the message in your webhook logic to trigger the desired action
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  
  // Define the URL for the receiving chatbot's JSON API
  const url = `https://api.chatfuel.com/bots/63f49b619557a962ef4bfc7b/users/${message.chatfuel_user_id}/send?chatfuel_token=${message.chatfuel_token}&chatfuel_block_id=${message.chatfuel_block_id}`;
  
  // Send the message using a POST request
  request.post({
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message.custom_payload)
  }, (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
    }
  });
  
  console.log(Adr)
  // console.log(adresse)
 
  // console.log(res)



const sourceBotId = '63c96ca2da47e24595aa18fa';
const userId = '6155861414436575';

const options = {
  url: `https://api.chatfuel.com/bots/${sourceBotId}/users/${userId}`,
  method: 'GET',
  json: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

request(options, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const attributes = body.attributes;
    // The `attributes` object contains all the attributes for the specified user
    // You can now use this object to set the same attributes in the destination chatbot
  }
});




}
)


// console.log(sharedData)
  

// let $table = $("<table></table>");



app.get('/pharma', function(req, res) {
  loadTextFile(function(err, html) {
    if (err) {
      // Handle any errors that occur in the loadTextFile function
      return res.status(500).send(err.message);
    }
    
    // Call createTableRow function passing the html as an argument
    let tableRow = createTableRow(html);
    
    // Send the resulting HTML to the client
    res.send(tableRow);
  });
});
  

// app.get('/pharma', function(req, res) {


//   function createTableRow(filenameC,filenameO, $linkCellChifa, $linkCellOrdonnance, $linkCellChifa_Ord) {


  

//   }
  

//   loadTextFile(function(err, $table) {
//     if (err) {
//       console.error(err);
//       return res.sendStatus(500);
//     }
//     res.send($table);
//   });


// function loadTextFile(callback) {
// });

  




// app.get('/pharma', function(req, res) {
//   // Call the loadtxtfile function to load data
//   var data = loadTextFile();
  
//   // Call the createTableRow function to create table rows
//   var tableRows = createTableRow(filenameC,filenameO);
  
//   // Send the table rows as response
//   res.send(tableRows);
// });


function loadTextFile() {
  // Implementation of loadtxtfile function goes here

  // your existing code here
  // ...
  
  let ajax1 = $.get("https://jisr-pharmacy.up.railway.app/ListFilename.txt");
  let ajax2 = $.get("https://jisr-pharmacy.up.railway.app/ListFilenameOrdonnance.txt");

  
  // Use .when() to wait for both AJAX requests to complete
  $.when(ajax1, ajax2).done(function(response1, response2) {
        
    // Get the last line from each response
    let lastLineC = response1[0].split("\n");
    let lastLineO = response2[0].split("\n");
    console.log(lastLineC)
    for  (let i = 0; i <lastLineC.length; i++) {
      // Add the last image to the added filenames list
      const filenameC = lastLineC[i];
      const filenameO = lastLineO[i];
  console.log(filenameC);
  console.log(filenameO);
    
      let $tableRow = $("<tr></tr>");
      let $textCell = $("<td></td>").text(filenameC + filenameO);
      let linkUrlC = `src/Site1/Accueil.html?linkUrlC=${filenameC}`;
      let $linkCellChifa = $("<td></td>").html(`<a href="${linkUrlC}">Go to Page Accueil-C.html</a>`);
      let linkUrlO = `src/Site1/Accueil.html?linkUrlO=${filenameO}`;
      let $linkCellOrdonnance = $("<td></td>").html(`<a href="${linkUrlO}">Go to Page Accueil-O.html</a>`);
      let linkUrl_C_O = `src/Site1/Accueil.html?linkUrlC=${filenameC}&linkUrlO=${filenameO}`;
  
      
  
      let $linkCellChifa_Ord = $("<td></td>").html(`<a href="${linkUrl_C_O}">Go to Page Accueil-C-O.html</a>`);
      $row =createTableRow(filenameC,filenameO, $linkCellChifa, $linkCellOrdonnance, $linkCellChifa_Ord);
      // $tableRow.createTableRow($textCell, $linkCellChifa, $linkCellOrdonnance, $linkCellChifa_Ord);
      // $table.find("tbody").prepend($row);
      $table.find("tbody").prepend($row);
  
  
      // Store the updated list of added filenames and image order in local storage
      let imageOrder = [];
      for (let i = 0; i < filenameC.length; i++) {
        imageOrder.push(filenameC[i]);
        imageOrder.push(filenameO[i]);
  
      }
    
    }
  });
  
  $table.append("<thead><tr><th>Image Paths</th><th>Go Chifa</th><th>Go Ordonnance</th><th>Go Chifa-Ordonnance</th></tr></thead>");
  $table.append("<tbody></tbody>");

  let html = `<html>
  <head>
  <style>
  #table-container {
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    font-family: sans-serif;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  thead tr {
    background-color: #1abc9c;
    color: #fff;
    text-align: left;
  }
  
  th,
  td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  a {
    text-decoration: none;
    color: #1abc9c;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  </style>

    <title>List of filenames</title>
  </head>
  <body>
    
  </body>
</html>`;
  
  // instead of appending the table to the body, pass it to the callback
  callback(null,html);
  
}

function createTableRow(filenameC,filenameO) {
  // Implementation of createtablerow function goes here
  
    // Create the table row
    let $row = $("<tr></tr>");
  
    let $filenameCCell_OCell = $("<td></td>").text(filenameC+filenameO);
    $row.append($filenameCCell_OCell);
    // let filenameO = $("<td></td>");;
    // Add the filename to the table
    // let $textC = $("<td></td>").text($textCell);
    // $row.append($textC);
  
    // Add the links to the table
    let linkUrlC = `/src/Site1/Accueil.html?linkUrlC=\\${filenameC}`;
    let $linkC_Chifa = $("<td></td>").html(`<a href="${linkUrlC}">Go to Page Accueil-C.html</a>`);
    $row.append($linkC_Chifa);
  
    let linkUrlO = `/src/Site1/Accueil.html?linkUrlO=\\${filenameO}`;
    let $linkC_Ordonnance = $("<td></td>").html(`<a href="${linkUrlO}">Go to Page Accueil-O.html</a>`);
    $row.append($linkC_Ordonnance);
    // let linkUrl_C_O = `\\src\\Site1\\Accueil.html?linkUrlC=${imageOrder[i]}&linkUrlO=${imageOrder[i+1]}`;
  
    let linkUrl_C_O = `src/Site1/Accueil.html?linkUrlC=\\${filenameC}&linkUrlO=\\${filenameO}`;
    let $linkC_Chifa_Ord = $("<td></td>").html(`<a href="${linkUrl_C_O}">Go to Page Accueil-C-O.html</a>`);
    $row.append($linkC_Chifa_Ord);
    // Add the row to the table
    // $table.prepend($row);
      // }
  
    return $row;
  
}

  const request = require('request');

  // Define the message parameters
  




// Define endpoint for receiving incoming messages from Chatfuel
app.post('/incoming', (req, res) => {
  const userId = req.body.chatfuel_user_id;
  const botId = req.body.chatfuel_bot_id;
  const token = req.body.chatfuel_token;

  // Construct the message payload
  const payload = {
    chatfuel_token: token,

    chatfuel_block_name: 'incoming',
    chatfuel_attributes: {
      key1: 'A',
      key2: 'value2',
      // Add more attributes as needed
    }
  };

  // Send the message to the user on Messenger using the Chatfuel API
  axios.post(`https://api.chatfuel.com/bots/${botId}/users/${userId}/send`, payload)
    .then(response => {
      console.log(response.data);
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});


// const axios = require('axios');
const CHATFUEL_API_URL="26wcLX9twNghUuIZKOPJfGXpXzyKR8Ge0itPr42mMq6eJLSkpaTbUrXlRd5UV2WUjNiIT3UUTqbY4fELMDz6c7w6G5pJ11A4dfYKKEOrae2MoOg1XVV1EwTDyIHJBoNq";
const CHATFUEL_BOT_ID= "63c96ca2da47e24595aa18fa";
const CHATFUEL_TOKEN= "w2rN99XoauZQpJQLh7jo1J4DbEI7DMfqg79KuqxJmfROQAD0EuO2bynSEWKGILQo";

// Define the URL of the external API you want to query
const EXTERNAL_API_URL = 'https://firstprojectt-2c1de-default-rtdb.firebaseio.com/messages/message/custom_payload/message.json';

// Define a function to retrieve data from the external API
async function fetchData() {
  try {
    const response = await axios.get(EXTERNAL_API_URL);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Define a function to send a message back to the user with the retrieved data
async function sendChatfuelMessage(userId, text) {
  const url = `${CHATFUEL_API_URL}/${CHATFUEL_BOT_ID}/users/${userId}/send`;
  const body = { chatfuel_token: CHATFUEL_TOKEN, chatfuel_message_tag: 'MESSAGE_TAG', chatfuel_block_name: 'BLOCK_NAME', chatfuel_attributes: { text } };
  try {
    const response = await axios.post(url, body);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Define a function to handle the webhook request from Chatfuel
async function handleWebhook(request, response) {
  const userId = request.body['chatfuel_user_id'];
  const data = await fetchData();
  if (data) {
    const text = `Here's the data I retrieved: ${JSON.stringify(data)}`;
    await sendChatfuelMessage("63cad73df4951f7aebf1f1c4", "text");
  } else {
    await sendChatfuelMessage("63cad73df4951f7aebf1f1c4", 'Sorry, I was unable to retrieve the data.');
  }
  response.sendStatus(200);
}

// module.exports = handleWebhook;
