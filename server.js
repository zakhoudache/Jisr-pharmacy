const express = require("express");
const hostname= "127.0.0.1";

const session = require('express-session');
const app = express();
const path = require("path");
var sharedData;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match 
  // the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("ngrok-skip-browser-warning","true")
  next();
  });
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const fs = require("fs");

const axios = require("axios");

app.listen(8002,()=> {
    
  console.log(`Server running at http://localhost:${8002}`);
});

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));




app.post('/chifa',async (req, res, next)=>{
  let dir = `public\\Images\\${req.body.fileName}`;
  let imageChifa = req.body.imageChifa;

  let fileName = req.body.fileName;
  let  imagePath = path.join(dir, `Chifa@${fileName}.jpg`);
 console.log(dir,imageChifa,fileName);

req.session.fileName = fileName;
req.session.dir = dir;
req.session.imageChifa = imageChifa;
req.session.imagePath = imagePath;

      sharedData= { dir : `public\\Images\\${req.body.fileName}`,
        
                      imageChifa : req.body.imageChifa,
                      imageChifa : req.body.imageChifa,
                      fileName : req.body.fileName,
                      imagePath :path.join(dir, `Chifa@${(fileName)}.jpg`)
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


    app.get('/counter',function(req,res) {
      let counter=5;
      console.log(counter);
        res.sendStatus(200);

    })  

    app.get(`/public/Images/${req.session.fileName}/Chifa@${req.session.fileName}${counter}.jpg`, function (req, res){

      fetch(`http://127.0.0.1:5500/public/Images/${req.session.fileName}/Chifa@${req.session.fileName}${counter}.jpg`, {
  "headers": {
    "ngrok-skip-browser-warning": true,
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "fr-FR,fr;q=0.9,ar;q=0.8,en-US;q=0.7,en;q=0.6",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    'Access-Control-Allow-Origin': '*'
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});

      console.log(`/public/Images/${req.session.fileName}/Chifa@${req.session.fileName}${counter}.jpg`)
      res.sendStatus(200);
      

  })

    const writeToFile = (text) => {
      fs.appendFile('ListFilename.txt', text + '\n', (err) => {
        if (err) throw err;
        console.log('The text was appended to file!');
      });
    };
    writeToFile(imagePath);

    console.log(`Here from /chifa: Data has been retrieved from the session: fileName - ${fileName}, imagePath - ${imagePath}, dir - ${dir}, imageChifa - ${imageChifa}`)
    
    axios({
      method: 'get',
      url: imageChifa,
      responseType: 'stream'
    })
      .then(function (res) {

         res.data.pipe(fs.createWriteStream(imagePath));
          
      });

      console.log('_________________________________________________________________Post(/chifa)________________________________________________________________________________________________')
    console.log('_________________________________________________________________Post(/chifa)________________________________________________________________________________________________')
      
  })





// app.post('/chifa/getFileName', (req, res) => {
 
//     let dir = `public\\Images\\${req.body.fileName}`;
  
//   let imageChifa = req.body.imageChifa;
//   let  fileName = req.body.fileName;
//   let imagePath = path.join(dir, `Chifa@${(fileName)}.jpg`);

//     req.session.fileName = fileName;
//     req.session.dir = dir;
//     req.session.imageChifa = imageChifa;
//     req.session.imagePath = imagePath;
    
//     console.log('fileName:', ( imagePath));
//     let counter =0
//     while (fs.existsSync(imagePath)) {
//       counter += 1;
//       imagePath = path.join(dir, `Chifa@${(fileName)}${(counter)}.jpg`);
      
//     }
//     res.send(`Data has been retrieved from the session: fileName - ${fileName}, imagePath - ${imagePath}, dir - ${dir}, imageChifa - ${imageChifa}`);
//     console.log(`Here in post/chifa/getFileNamme: Data has been retrieved from the session: fileName - ${fileName}, imagePath - ${imagePath}, dir - ${dir}, imageChifa - ${imageChifa}`);
//     axios({
//       method: 'get',
//       url: imageChifa,
//       responseType: 'stream',
//       Headers:{
//         "Content-Type": "text/json"
//       }
//     })
//       .then(function (axiosRes) {

//         axiosRes.data.pipe(fs.createWriteStream(imagePath));        
//       });
      
//       console.log('______________________________________________________________Post(/chifa/getFileName)___________________________________________________________________________________________________')
//       console.log('______________________________________________________________Post(/chifa/getFileName)___________________________________________________________________________________________________')

//   }
  
//   );
  
  
  





  app.get('/pharma', function (req, res)  {
    
    fetch("http://127.0.0.1:5500/Pharmacywindow.html", {
  "headers": {
    "ngrok-skip-browser-warning": true,


    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "fr-FR,fr;q=0.9,ar;q=0.8,en-US;q=0.7,en;q=0.6",
    "cache-control": "max-age=0",
    "if-modified-since": "Sat, 11 Feb 2023 14:02:32 GMT",
    "if-none-match": "W/\"fad-18640c8e2ed\"",
    "sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Google Chrome\";v=\"109\", \"Chromium\";v=\"109\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    'Access-Control-Allow-Origin': '*'
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
    // app.set("images","./public/images");
    const filePath = path.join(__dirname, "" ,"Pharmacywindow.html");
    res.sendFile(filePath);
    

  })

  

  