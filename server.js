let axios = require('axios')
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');
var parseString = require('xml2js').parseString; 


// Mongo Client //////////////
const MongoClient = require('mongodb').MongoClient;


/////////////////////

// Express Route
const donorQueueRoute = require('./routes/donorQueue.route')
// const H = require('./routes/donorQueue.route')

// Connecting mongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
  useNewUrlParser: true
}).then(() => {
  console.log('Database sucessfully connected!')
},
  error => {
    console.log('Could not connect to database : ' + error)
  }
)


const app = express();
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
app.get("*", (req, res) => {
  // console.log(req.hostname)
  if (req.hostname == "plasmaconnect.herokuapp.com") {
    const index = path.join(__dirname, "./client/build/index.html");
    res.sendFile(index);
  }
  
});

// app.get("/", (req, res) => {
//   console.log()
//   res.send( req.hostname)
//   // req.get('host') + ',' +
// });


// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

app.post("/getcenters", (req, res) => {
  axios.get('https://www.donatingplasma.org/index.php?option=com_storelocator&view=map&format=raw&searchall=1')
      .then(data => {
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

// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
