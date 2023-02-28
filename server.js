const express = require("express");
// const hostname = "127.0.0.1";
const session = require('express-session');
const app = express();
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const { spawn } = require('child_process');
// const {client} = new Client();


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


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://8003-zakhoudache-jisrpharmac-q94cj5igwn9.ws-eu88.gitpod.io");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));



app.listen(8003,() => {
  console.log(`Server running at http://localhost:${8002}`);
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
    fs.appendFile('ListFilename.txt', text + ' \n', (err) => {
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
    imagePath = path.join(dir, `Ordonnance@${fileName}${counter}.jpg`);
  }

  const writeToFile = (text) => {
    fs.appendFile('ListFilenameOrdonnance.txt', text + '\n', (err) => {
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




// const destinationBotId = '63f49b619557a962ef4bfc7b';

// const setOptions = {
//   // url: `https://api.chatfuel.com/bots/${destinationBotId}/users/${userId}`,

// url: 'https://api.chatfuel.com/bots/63c96ca2da47e24595aa18fa/users/6155861414436575/send', 

// method: 'POST',
// json: true,
// headers: {
//   'Content-Type': 'application/json'
// },
// body: message

// };

// request(setOptions, (error, response, body) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Attributes set successfully');
//   }
// });

}
)

app.get('/pharma', function (req, res){   

    const filePath = path.join(__dirname, "" ,"home.html");
    res.sendFile(filePath);
    

  })
// console.log(sharedData)
  

  
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
