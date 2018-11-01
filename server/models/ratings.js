const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
   food: {
      type: String,
      required: true
   }, 
   drinks: {
      type: String,
      required: true
   },
   atmosphere: {
      type: String,
      required: true
   },   
   staff: {
      type: String,
      required: true
   },   
   parking: {
      type: String,
      required: true
   }
})

const Ratings = module.exports = mongoose.model('Rating', RatingSchema)