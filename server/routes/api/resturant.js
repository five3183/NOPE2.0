const express = require('express')
const router = express.Router()

const Resturant = require('../../models/resturant')
const Ratings = require('../../models/ratings')

/* *** RESTURANT ROUTES *** */
router.post('/rate', (req, res) => {
   console.log(req.body)  
})

module.exports = router