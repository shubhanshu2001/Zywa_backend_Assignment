// MongoDB Schemas
const mongoose = require('mongoose');

const cardStatusSchema = new mongoose.Schema({
    cardID: String,
    userMobile: String,
    status: String,
    timestamp: Date,
  });
  module.exports = mongoose.model('cardStatus', cardStatusSchema);