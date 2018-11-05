// const errors = require('restify-errors');

// module.exports = server => {
//    server.get('/user', (req, res, next) => {
// 		res.send({msg:'test'})
// 		next()
// 	})
// }


require('dotenv').config()
require('isomorphic-fetch')
// const path = require("path")
// const express = require('express')
// const router = express.Router()

const key = process.env.GOOGLE_APIKEY

// // GET COORDINATES
const  getCoordinates = async (locationData) => {
   const street = locationData.street.split(' ').join('+')
   const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${locationData.city},+${locationData.state}&key=${key}`)
   const responseCoords = await response.json()
   return responseCoords
}

// /* ***USER ROUTES*** */
// router.post('/location', (req, res) => {
//    const locationData = req.body
//    getCoordinates(locationData)
//       .then(response => {
         const coordinates  = response.results[0].geometry.location
         console.log(coordinates)
         res.send(coordinates)
//       })
//       .catch(err => console.log(err))
// })

// module.exports = router