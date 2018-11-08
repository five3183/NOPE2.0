// SEND BUTTON
const rateResturant = document.getElementById('send-rating')
const ratingHeader = document.getElementById('rating-header')

const resturantData = window.location.pathname.split('/')

const id = resturantData[2]

const checkIfNegative = (number) => {
	if(number < 0) {
		const isNegative = true
		return isNegative
	}else {
		const isNegative = false
		return isNegative
	}
}


const postResturantRating = (rating => {
	fetch(`/rate_resturant/${id}`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(rating)
   })
   .then(response => response.json())
   .then(locationData => {
		let latitude = locationData.latitude
		let longitude = locationData.longitude
		let name = locationData.name

      const latitudeIsNegative = checkIfNegative(latitude)
      const longitudeIsNegative = checkIfNegative(longitude)

// CONVERT lat/lng to abs value
      if(latitudeIsNegative === true) {
			latitude = Math.abs(latitude)
		} 
		
      if(longitudeIsNegative === true) {
			longitude = Math.abs(longitude)
      } 

      window.location.assign(`/map/${latitudeIsNegative}/${latitude}/${longitudeIsNegative}/${longitude}/`)
	})
})

rateResturant.addEventListener('click', () => {
// GET RESTURANT RATING from form
   const food = document.querySelector('input[name=food]:checked').value
   const drinks =  document.querySelector('input[name=drinks]:checked').value
   const atmosphere = document.querySelector('input[name=atmosphere]:checked').value
   const staff = document.querySelector('input[name=staff]:checked').value
   const parking = document.querySelector('input[name=parking]:checked').value

// Create rating object
   const rating = {
      food,
      drinks,
      atmosphere,
      staff,
      parking
   }
   postResturantRating(rating)
})
