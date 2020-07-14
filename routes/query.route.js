let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// donorQueue Model
let donorQueueSchema = require('../models/DonorQueue');

// CREATE donorQueue

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


router.post("/donateSearch", (req, res) => {
  // console.log(req.body);
  console.log('f')

  
  donorQueueSchema.find( //req.body
    {'FirstName': { $regex: "Minh", $options: "i" }}
    // {State: req.body.desiredState,
    // City: req.body.desiredCity,
    // ZipCode: req.body.desiredZip,
    // DonateConsent: 'true'}
  , 'FirstName LastName Email PhoneNumber StreetAddress State ZipCode City', function(error, data) {
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