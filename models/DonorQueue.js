const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let donorQueueSchema = new Schema({
  FirstName: {
    type: String
  },
  LastName: {
    type: String
  },
  DateofSymptoms: {
    type: Date
  },
  BloodType: {
    type: String
  },
  Email: {
    type: String
  },
  PhoneNumber: {
    type: Number
  },
  StreetAddress1: {
    type: String
  },
  StreetAddress2: {
    type: String
  },
  State: {
    type: String
  },
  ZipCode: {
    type: Number
  },
  DonateConsent: {
    type: String
  },
  ResearchConsent: {
    type: String
  },

}, {
    collection: 'DonorQueue'
  })

module.exports = mongoose.model('DonorQueue', donorQueueSchema)