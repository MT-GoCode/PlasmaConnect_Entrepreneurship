let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// donorQueue Model
let donorQueueSchema = require('../models/DonorQueue');

// CREATE donorQueue

router.route('/researchSearch').get((req, res) => {
  console.log(req.body);
  donorQueueSchema.find({}, function (error, data) {
    if (error) {
      return next(error)
    } else {
      res.json(data);
      console.log(data);
    }
  })
})
// let connect = async () => {
//   await client.connect().then(() => {
//     console.log("Connected correctly directly to Atlas server");
//     const db = client.db(dbName);
//     db.DonorQueue.createIndex({
//       location : "2dsphere"
//     })
//   }).catch((err) => {
//     console.log(err)
//   })

// }
const { MongoClient } = require("mongodb");
const { query } = require('express');

// Replace the following with your Atlas connection string                                                                                                                                        

const url = "mongodb+srv://MinhTrinh:Minhkien@cluster0-zwleo.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(url, { useUnifiedTopology: true });

// The database to use
const dbName = "PlasmaConnect";

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected correctly to Atlas");
//     const db = client.db(dbName);

//     // // Use the collection "people"
//     // const col = db.collection("DonorQueue");
//     // db.collection("DonorQueue").createIndex({
//     //   location: "2dsphere"
//     // })

//     // return col
//     var createLandmarkDoc = function (name, lng, lat) {
//       return {
//           FirstName : name,
//           location : {
//               type : "Point",
//               coordinates : [lng, lat]
//           }
//       };
//     };
//     var addNewLandmark = function(name, lng, lat){
//       donorQueueSchema.create(createLandmarkDoc(name, lng, lat));
//     };
    
//     donorQueueSchema.remove({});
//     // Step 1: Add points.
//     addNewLandmark("Washington DC", 38.8993487, -77.0145665);
//     addNewLandmark("White House", 38.9024593, -77.0388266);
//     addNewLandmark("Library of Congress", 38.888684, -77.0047189);
//     addNewLandmark("Patuxent Research Refuge", 39.0391718, -76.8216182);
//     addNewLandmark("The Pentagon", 38.871857, -77.056267);
//     addNewLandmark("Massachusetts Institute of Technology", 42.360091, -71.09416);
    
//     // Step 2: Create index
//     // donorQueueSchema.ensureIndex({
//     //   location : "2dsphere"
//     // });
    

//   } catch (err) {
//     console.log(err.stack);
//   }
// }
// run()

// donorQueueSchema.remove({});
// var donor = new donorQueueSchema({
//   FirstName: "Skeletor",
//   location: {
//    type: "Point",
//    coordinates: [-112.110492, 36.098948, ]
//   },
//  });
//  donorQueueSchema.create(donor);
// donorQueueSchema.save((err, message) => {
//   if (err) console.log(err);
//   console.log(message);
//  });


 


let milesToRadian = function (miles) {
  let earthRadiusInMiles = 3959;
  return miles / earthRadiusInMiles;
};

router.post("/testergeo", async (req, res) => {
  let query = {
    location: {
     $near: {
      $maxDistance: 1609.34*parseInt(req.body.Range),
      $geometry: {
       type: "Point",
       coordinates: [-117.817344, 33.6461824]
      }
     }
    }
   }
   console.log(query)
  donorQueueSchema.find(query).find((error, results) => {
    if (error) console.log(error);
    res.send(results)
   });
})



router.post("/donateSearch", (req, res) => {
  console.log('query request body: ', req.body)
  let query = {
    location: { // just set up the range query. if any others need to be set up like this, use ternaries
      $near: {
       $maxDistance: 1609.34*parseInt(req.body.Range),
       $geometry: {
        type: "Point",
        coordinates: req.body.location
       }
      }
     }

  }
  for (let i in Object.keys(req.body)) { // filtering out keys with empty items
    let key = Object.keys(req.body)[i]
    
    if (req.body[key]) {
      if (key == 'Range' || key == "location") { // already taken care of
        continue
      }
      // if (key == 'AgeBelow') {
      //   if (query.hasOwnProperty('Age')) {
      //     query['Age']['$gte'] = parseInt(req.body[key])
      //   }
      //   else {
      //     query['Age'] = { $gte: parseInt(req.body[key]) }
      //   }
      // }
      // else if (key == 'AgeAbove') {
      //   if (query.hasOwnProperty('Age')) {
      //     query['Age']['$lte'] = parseInt(req.body[key])
      //   }
      //   else {
      //     query['Age'] = { $lte: parseInt(req.body[key]) }
      //   }
      // }

      else {
        query[key] = req.body[key]
      }

    }
  }
  console.log('query: ', query)
  donorQueueSchema.find(query
    , '', function (error, data) {
      if (error) {
        console.log(error)
      } else {
        console.log(data)
        res.json(data);
        // console.log(data);
      }
    })
})

/**
 * 'State': req.body.desiredState,
  'City': req.body.desiredCity,
  'ZipCode': req.body.desiredZip,
  'DonateConsent': 'true'
 */

// Get Single donorQueue
router.route('/edit-donorQueue/:id').get((req, res) => {
  donorQueueSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update donorQueue
router.route('/update-donorQueue/:id').put((req, res, next) => {
  donorQueueSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('donorQueue updated successfully !')
    }
  })
})

// Delete donorQueue
router.route('/delete-donorQueue/:id').delete((req, res, next) => {
  donorQueueSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;