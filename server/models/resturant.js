const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
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
   isBusy: {
      type: Boolean,
      default: false
   },
   ratings:[{
      type: Schema.Types.ObjectId,
      ref: 'Ratings'
   }]
})

ResturantSchema.plugin(timestamp)

const Resturant = mongoose.model('Resturant', ResturantSchema)

module.exports = Resturant