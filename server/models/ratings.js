const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingsSchema = new Schema({
   resturant: {
      type: Schema.Types.ObjectId,
      ref: 'Resturant'
   },
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
   },
   date: {
      type: Date,
      default: Date.now
   }
})

const Ratings = mongoose.model('Ratings', RatingsSchema)

module.exports = Ratings