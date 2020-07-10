const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let donorQueueSchema = new Schema({
  FirstName: {type:String},
  LastName: {type:String},
  SocialSecurityNumber: {type:String},
  DateOfBirth: {type:String},
  Weight: {type:String},
  Email: {type:String},
  PhoneNumber: {type:String},
  StreetAddress: {type:String},
  City: {type:String},
  StateCode: {type:String},
  ZipCode: {type:String},
  Username: {type:String},
  Password: {type:String},
  DischargeForm: {type:String},
  COVID19TestResults: {type:String},
  Screening1: {type:String},
  DonateConsent: {type:String},
  ResearchConsent: {type:String}
  // FirstName: {
  //   type: String
  // },
  // LastName: {
  //   type: String
  // },
  // DateofSymptoms: {
  //   type: Date
  // },
  // BloodType: {
  //   type: String
  // },
  // Email: {
  //   type: String
  // },
  // PhoneNumber: {
  //   type: Number
  // },
  // StreetAddress1: {
  //   type: String
  // },
  // StreetAddress2: {
  //   type: String
  // },
  // State: {
  //   type: String
  // },
  // ZipCode: {
  //   type: Number
  // },
  // DonateConsent: {
  //   type: String
  // },
  // ResearchConsent: {
  //   type: String
  // },

}, {
    collection: 'DonorQueue'
  })

module.exports = mongoose.model('DonorQueue', donorQueueSchema)

