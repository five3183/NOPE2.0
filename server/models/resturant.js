const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ResturantSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   street: {
      type: String,
      required: true
   },
   city: {
      type: String,
      required: true
   }, 
   state: {
      type: String, 
      required: true
   },
   zip: {
      type: String,
      required: true
   },
   latitude: {
      type: String,
      required: true
   },
   longitude: {
      type: String, 
      required: true
   },
   ratings:[{
      type: Schema.Types.ObjectId,
      ref: 'Ratings'
   }]
})

const Resturant = module.exports = mongoose.model('Resturant', ResturantSchema)