const mongoose = require("mongoose");
const packagesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true
  },
  phone: {
    type: String,
    required: true,
  },
  departure: {
    type: String
  },

  passengers: {
    type: String
  },
  date: {
    type: String
  },
});

module.exports=mongoose.model('packages',packagesSchema)