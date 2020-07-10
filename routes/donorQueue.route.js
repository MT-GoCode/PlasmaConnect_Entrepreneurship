let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// donorQueue Model
let donorQueueSchema = require('../models/DonorQueue');

// Test Atlas
// use https://www.digitalocean.com/community/tutorials/nodejs-crud-operations-mongoose-mongodb-atlas for all crud operations with atlas and mongoose
// router.get('/foods', async (req, res) => {
//   const foods = await donorQueueSchema.find({});

//   try {
//     res.send(foods);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// router.post('/food', async (req, res) => {
//   const food = new donorQueueSchema(req.body);
//   // console.log()
//   try {
//     await food.save();
//     res.send(food);
//   } catch (err) {
//     console.log('err')
//     res.status(500).send(err);
//   }
// });

// CREATE donorQueue
router.post('/create-donor-queue', async (req, res, next) => {
  // Adds to Atlas
  const donor = new donorQueueSchema(req.body);

  try {
    await donor.save();
    res.send(donor);
  } catch (err) {
    console.log('Error when creating new DonorQueue')
    console.log(err)
    res.status(500).send(err);
  }
});

router.route('/researchSearch').get((req, res) => {
  console.log(req.body);
  donorQueueSchema.find({}, 'FirstName LastName Email PhoneNumber State ZipCode', function(error, data) {
    if (error) {
      return next(error)
    } else {
      res.json(data);
      console.log(data);
    }
  })
})

// router.get("/donateSearch", (req, res) => {
//   console.log(req.query)

//   // req.query.Zip
//   donorQueueSchema.find( 
//     req.query
//   , 'FirstName LastName Email PhoneNumber State ZipCode City', function(error, data) {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data);
//       console.log(data);
//     }
//   })
// })
// READ donorQueue
// router.route('/').get((req, res) => {
//   donorQueueSchema.find((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })
// bodyParser = require('body-parser').json();
// router.get('/', bodyParser, function(req, res, next) {
//   //var Keywords = req.body.Keywords;
//   console.log(req.headers);
//   console.log(req.body);
//   next();
// });

router.post("/donateSearch", (req, res) => {
  console.log(req.body);

  
  donorQueueSchema.find( req.body
    // {State: req.body.desiredState,
    // City: req.body.desiredCity,
    // ZipCode: req.body.desiredZip,
    // DonateConsent: 'true'}
  , 'FirstName LastName Email PhoneNumber State ZipCode City', function(error, data) {
    if (error) {
      return next(error)
    } else {
      res.json(data);
      console.log(data);
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