// file obsolete, now using just server.js to connect

// original local conneciton
// module.exports = {
//   db: 'mongodb://localhost:27017/PlasmaDonations'
// };

// 1st attempt at atlas connection via mongoose
// const mongoose = require('mongoose');
// const connection = "mongodb+srv://MinhTrinh:Minhkien@cluster0-zwleo.mongodb.net/<dbname>?retryWrites=true&w=majority";
// mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
//     .then(() => console.log("Atlas Database Connected Successfully"))
//     .catch(err => console.log(err));