let axios = require('axios')
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
// let dbConfig = require('./database/db');
var parseString = require('xml2js').parseString; 

// Mongoose Atlas connection
mongoose.connect("mongodb+srv://MinhTrinh:Minhkien@cluster0-zwleo.mongodb.net/PlasmaConnect?retryWrites=true&w=majority", {
  useNewUrlParser: true
}).then(() => console.log("Atlas Database Connected Successfully"))
  .catch(err => console.log(err));


// Mongo Client //////////////
const MongoClient = require('mongodb').MongoClient;


/////////////////////

// Connecting mongoDB Database local
// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//   useNewUrlParser: true
// }).then(() => {
//   console.log('Database sucessfully connected!')
// },
//   error => {
//     console.log('Could not connect to database : ' + error)
//   }
// )
// 

// Express Route
const donorQueueRoute = require('./routes/donorQueue.route')

const app = express();
app.use(express.json()); // Make sure it comes back as json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/donorQueue', donorQueueRoute)

/*express index.js*/
const path = require('path');
/*Adds the react production build to serve react requests*/
app.use(express.static(path.join(__dirname, "./client/build")));

/*React root*/
app.get("*", (req, res, next) => {
  console.log('request from: ', req.protocol + '://' + req.get('host') + req.originalUrl)
  // console.log('hostname: ' + req.hostname)
  // console.log('hostname check: ' + (req.hostname.includes("localhost")))
  if (!req.hostname.includes("localhost")) {
    const index = path.join(__dirname, "./client/build/index.html");
    res.sendFile(index);
  }
  else {
    next()
  }
  

});



app.get("/getcenters", (req, res) => {
  console.log('getting centers right now')
  axios.get('https://www.donatingplasma.org/index.php?option=com_storelocator&view=map&format=raw&searchall=1')
      .then(data => {
        console.log('successful center fetch', typeof(data.data))
        // console.dir(data.data)
        parseString(data.data, function (err, result) {
          let json = JSON.stringify(result)
          
          res.send(json);
        });
        // res.send(data.data)
            // let final = [res.data[res.data.length - 2], res.data[res.data.length - 3]];
    });
  
  // const client = new MongoClient('mongodb://localhost:27017');

  // client.connect(function(err) {
  //   // assert.equal(null, err);
  //   console.log("Connected successfully to MongoClient server");

  //   const db = client.db('PlasmaDonations');
  //   var collection = db.collection('PlasmaDonationCenters');

  //   collection.find().toArray(function(err, data) {
  //     res.json(data)
  //   })

  //   client.close();

  // });


  // var collection = db.collection('PlasmaDonationCenters');
  //   res.json(collection)
  //   // collection.find().toArray(function(err, kittens) {
  //   //     // here ...
  //   // });    
  // });
})
app.get("/gethospitals", (req, res) => {
  console.log('getting hospitalss right now')
  axios.get('https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Hospitals_1/FeatureServer/0/query?where=1%3D1&outFields=ID,NAME,ADDRESS,CITY,STATE,ZIP&outSR=4326&f=json')
      .then(data => {
        console.log('successful hospital fetch', typeof(data.data))
        // console.log(data.data)
        res.send(data.data)
    });
})

// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });

const fs = require('fs');
const fileName = "./client/package.json"
const file = require(fileName);

file.proxy = process.env.PORT || 4000;

fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
  if (err) return console.log(err);
  console.log(JSON.stringify(file));
  console.log('writing to ' + fileName);
});


app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
