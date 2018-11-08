require('dotenv').config()
require('isomorphic-fetch')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const path = require("path")

const Resturant = require('../models/resturant')
const Ratings = require('../models/ratings')
const key = process.env.GOOGLE_APIKEY


module.exports = router => {
// ***** GET KEYS******
// router.get('/key', (req, res) => {
// 	res.send(key)
// })	
// ***** PAGE ROUTES START *****

// add resturant page
	router.get('/add_place', (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/public/add-a-place.html"))
	})

// find resturant page
	router.get('/find_place', (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/public/find-a-place.html"))
	})

// ****** MAP ROUTES *****
	router.get('/map/:neg/:lat/:neg/:lng', (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/public/map.html"))
	})
// ***** PARGE ROUTES END *****

// ****** RESTURANT ROUTES START ******
	// GET ALL RESTURANTS
	router.get('/resturants', async (req, res, next) => {
		try {
			const resturants = await Resturant.find({})
			res.send(resturants)
			next() 
		} 
		catch(err) {
			return next(new errors.InvalidContentError(err))
			
		}
	})

// GET A SINGLE RESTURANT 
	router.get('/resturant/:id', async (req, res, next) => {
		try{
			const resturant = await Resturant.findById(req.params.id)
			res.send(resturant)
			next()
		} 
		catch(err) {
			res.sendStatus(404)
			next(new Error(`There is no resturant with the id of ${req.params.id}`))
		}
	})

// ADD RESTURANTS
	router.post('/resturant', async (req, res, next) => {
		// check for JSON
		if(!req.is('application/json')) {
			throw new Error("Expects 'application/json'")
		}
		else {
			// DESTRUCTURE req.body
			const {name, street, city, state, zip} = req.body

			// get the coordinates to save into the data base
			const coordinates = await getCoordinates(req.body)
			// create new resturant 
			const resturant = new Resturant({
				name,
				street,
				city,
				state,
				zip, 
				latitude: coordinates.results[0].geometry.location.lat,
				longitude: coordinates.results[0].geometry.location.lng
			})
			try{
				const newResturant = await resturant.save()
				res.send(newResturant._id)
				next()
			}
			catch(err) {
				throw new Error(err.message)
			}
		}
	})

// UPDATE RESTURANT 
	router.put('/resturant/:id', async (req, res, next) => {
		// CHECK IF RECORD EXISTS
		const resturant = await Resturant.findById(req.params.id)
		// check for JSON
		if(!req.is('application/json')) {
			throw new Error("Expects 'application/json'")
		}
		// check to see if there is a resturant with the id
		else if(resturant === null) {
			res.sendStatus(404)
			next(new Error(`There is no resturant with the id of ${req.params.id}`))
		}
	
		else {
			try {
				const resturant = await Resturant.findOneAndUpdate({_id: req.params.id}, req.body)
				res.sendStatus(204)
				next()
			}
			catch(err) {
				res.sendStatus(404)
				next(new Error(`There is no resturant with the id of ${req.params.id}`))
			}
		}
			
	})
// DELETE RESTURANT
	router.delete('/resturant/:id', async (req, res, next) => {
		const resturant = await Resturant.findById(req.params.id)
		// check to see if there is a resturant with the id
		if(resturant === null) {
			res.sendStatus(404)
			next(new Error(`There is no resturant with the id of ${req.params.id}`))
		}
		try {
			const resturant = await Resturant.findOneAndDelete({_id: req.params.id})
			res.sendStatus(204)
			next()
		}
		catch(err) {
			res.sendStatus(404)
			next(new Error(`There is no resturant with the id of ${req.params.id}`))
		}
	})

// ****** RESTURANT ROUTES END ******

// ****** RATING ROUTES START ******

// RATE RESTURANT PAGE
	router.get('/rate_resturant/:id', (req, res) => {
		res.sendFile(path.join(__dirname, "../../client/public/rate-a-place.html"))
	})

	router.get('/resturant_ratings/:id', async (req, res, next) => {
		try{
			Resturant.findById(req.params.id)
				.populate('ratings')
					.then(allResturantRatings => {
						const rated = allResturantRatings.ratings
						let foodScore = 0
						let drinkScore = 0
						let atmosphereScore = 0
						let staffScore = 0
						let parkingScore = 0
						for(i = 0; i < rated.length; i++) {
							foodScore += +rated[i].food
							drinkScore += +rated[i].drinks
							atmosphereScore += +rated[i].atmosphere
							staffScore += +rated[i].staff
							parkingScore += +rated[i].parking
						}
						const resturantAverageRating = {
							food : (foodScore / i).toFixed(2),
							drinks : (drinkScore / i).toFixed(2),
							atmosphere : (atmosphereScore / i).toFixed(2),
							staff : (staffScore / i).toFixed(2),
							parking : (parkingScore / i).toFixed(2),
						}
						res.send(resturantAverageRating)
						next()
					})
		}
		catch{
			res.sendStatus(404)
			next(new Error(`There is no rating with the id of ${req.params.id}`))
		}
	})

// SEND RATING
	router.post('/rate_resturant/:id', (req, res) => {
		const {food, drinks, atmosphere, staff, parking} = req.body

		const rating = new Ratings ({
			food,
     		drinks,
			atmosphere,
      	staff,
      	parking
		})

		rating.save()
		try {
			Resturant.findById(req.params.id)
				.then(resturant => {
					resturant.ratings.push(rating)
					resturant.save()

					const coordinates = {
						latitude: resturant.latitude,
						longitude: resturant.longitude
					} 
					res.send(coordinates)
				})
		}
		catch (err){
			throw new Error(err)
		}
	})

// ****** RATING ROUTES END ******


// ***** GET COORDINATES *****
	const  getCoordinates = async (locationData) => {
		const street = locationData.street.split(' ').join('+')
		const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${locationData.city},+${locationData.state}&key=${key}`)
		const location = await response.json()
		return location
	}
// *** GET COORDINATES END *****

// ****** USER ROUTES START ******
	router.post('/location', async (req, res, next) => {
		try{
			const locationData = req.body
			const location = await getCoordinates(locationData)
			// res.send(location.results[0])
			if(location.results.length === 0) {
				res.sendStatus(404)
				next(new Error('That location was not found'))
			}
			else {
				res.send(location.results[0])
			}
		} 
		catch(err) {
			throw new Error(err)
		}
	})
// ****** USER ROUTES END ******
// ***** PAGE NOT FOUND *****
}