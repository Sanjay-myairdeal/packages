const mongoose = require("mongoose");
const packagesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    required: true,
  },

  passengers: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports=mongoose.model('packages',packagesSchema)