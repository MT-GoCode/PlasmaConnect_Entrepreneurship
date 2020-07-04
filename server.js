let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

// Express Route
const donorQueueRoute = require('./routes/donorQueue.route')

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
  const index = path.join(__dirname, "./client/build/index.html");
  res.sendFile(index);
});

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
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
