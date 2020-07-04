let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// donorQueue Model
let donorQueueSchema = require('../models/DonorQueue');

// CREATE donorQueue
router.route('/create-donorQueue').post((req, res, next) => {
  donorQueueSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
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