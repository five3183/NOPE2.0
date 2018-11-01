require('dotenv').config()
require('isomorphic-fetch')
const path = require("path")
const express = require('express')
const router = express.Router()

const key = process.env.GOOGLE_APIKEY

// GET COORDINATES
const  getCoordinates = async (locationData, street) => {
   const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${locationData.city},+${locationData.state}&key=${key}`)
   
   const responseCoords = await response.json()
   
   return responseCoords
}

/* ***USER ROUTES*** */
router.post('/location', (req, res) => {
   const locationData = req.body
   const street = locationData.street.split(' ').join('+')
   getCoordinates(locationData, street)
      .then(response => {
         const coordinates = response.results[0].geometry.location
         console.log(coordinates)
      })
      .catch(err => console.log(err))

})

module.exports = router