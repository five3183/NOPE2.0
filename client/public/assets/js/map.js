const locationData = window.location.pathname.split('/')

// Pull the coordinates out of the URL
const latitude = Number(locationData[3])
const longitude = Number(locationData[5])

//pull the 
const latitudeIsNegative = locationData[2]
const longitudeIsNegative = locationData[4]

// check to see if the coordinate should be negated
const checkNegation =  (negator, coord) => {
	if(negator === 'true') {
		const newNumber = -coord
		return newNumber
	} else {
		return coord
	}
}

const adjustedLatitude =  checkNegation(latitudeIsNegative, latitude)
const adjustedLongitude =  checkNegation(longitudeIsNegative, longitude)

var map

const getResturantsfromDatabase = async () => {
	const allResturants = await fetch('/resturants')
	const resturants = await allResturants.json()
	return resturants
}
const getAverageRatingsfromDatabase = async (id) => {
	const allRatings = await fetch(`/resturant_ratings/${id}`)
	const averageRatings = await allRatings.json()
	return averageRatings
}
const checkIfBusy = (busyData) => {
	if(busyData === true) {
		const icon = 'red'
		return icon
	}
	else {
		const icon = 'green'
		return icon
	}
}
const changeToBusy = (resturantIdNumber) => {
	const isBusy = true
	fetch(`/resturant/${resturantIdNumber}`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({isBusy})
	})
	location.reload()
}
const changeToQuiet = (resturantIdNumber) => {
	const isBusy = false
	fetch(`/resturant/${resturantIdNumber}`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({isBusy})
	})
	location.reload()
}
const checkForRating = (ratingData) => {
	if(ratingData === null || ratingData === 'undefined' || ratingData === 'NaN') {
		ratingData = 'NYR'
		return ratingData
	}else {
		return ratingData
	}
}

const addLocationMarker =  (resturantData) => {
	// Check to see if a resturant is busy to assign the proper marker
	const icon = checkIfBusy(resturantData.resturant.isBusy)
	const resturantID = `'${resturantData.resturant._id}'`
	
	const zTimefromDatabase = new Date(resturantData.resturant.updatedAt)
	const zTimeToString = new String(zTimefromDatabase)
	const splitZTimeString = zTimeToString.split(" ")
	
	// Take the pieces need to have date and time stamp
	const date = `${splitZTimeString[1]} ${splitZTimeString[2]} ${splitZTimeString[3]} @ ${splitZTimeString[4]} EST`

	// Get the coordiantes to pass for marker loaction
	coordinates = {
		lat: Number (resturantData.coordinates.lat),
		lng: Number (resturantData.coordinates.lng)
	}

	const marker = new google.maps.Marker({
		position: coordinates,
		icon: {
			path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
			strokeColor: icon,
			scale: 4
		},
		map: map
	})
	const {food, drinks, atmosphere, staff, parking} = resturantData.displayRating

	const checkedFood = checkForRating(food)
	const checkedDrinks = checkForRating(drinks)
	const checkedAtmosphere = checkForRating(atmosphere)
	const checkedStaff = checkForRating(staff)
	const checkedParking = checkForRating(parking)


	const displayInfo = new google.maps.InfoWindow({
		content:
		`
			<h5>${resturantData.resturant.name}</h5>
			<hr>
			<p class="text-center"><a href="/rate_resturant/${resturantData.resturant._id}">Rate this place</a></p> 
			<div class="ratings text-center">
				<span class="badge badge-pill badge-primary">Food: ${checkedFood}/5</span>
					<span class="badge badge-pill badge-primary">Drinks: ${checkedDrinks}/5</span>
					<span class="badge badge-pill badge-primary">Atmosphere: ${checkedAtmosphere}/5</span>
					<br>
					<span class="badge badge-pill badge-primary">Staff: ${checkedStaff}/5</span>
					<span class="badge badge-pill badge-primary">Parking: ${checkedParking}/5</span>
			</div>
			<br>
			<div class="text-center">
				<button type="button" class="btn btn-outline-success btn-sm" id="quiet-btn" onclick=changeToQuiet(${resturantID})>Quiet</button>
				<button type="button" class="btn btn-outline-danger btn-sm" id="busy-btn" onclick=changeToBusy(${resturantID})>Busy</button>
			</div>
				<br>
		<hr>
		<div class="text-center">
				<span class="text-center">Last Updated: ${date}</span>
		</div>
		`
	})

	marker.addListener('click', () => {
		displayInfo.open(map, marker)
	})
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: adjustedLatitude, lng: adjustedLongitude},
		zoom: 15
	});

	getResturantsfromDatabase()
		.then(resturants =>  {
			resturants.forEach(resturant => {
				const coordinates = {
					lat: resturant.latitude,
					lng: resturant.longitude
				}
				getAverageRatingsfromDatabase(resturant._id)
					.then(displayRating =>{
						const resturantInfo = {
							resturant,
							displayRating,
							coordinates
						}
						addLocationMarker(resturantInfo)
					})
			});
		})
}