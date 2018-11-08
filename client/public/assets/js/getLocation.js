// UI ELEMENTS
const sendUser = document.getElementById('send-location')

const checkIfNegative = (number) => {
	if(number < 0) {
		const isNegative = true
		return isNegative
	}else {
		const isNegative = false
		return isNegative
	}
}

const postUserLocationData = (user => {
	fetch(`/location`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
   })
      .then(response => response.json())
      .then(locationData => {
			
			let latitude = locationData.geometry.location.lat
			let longitude = locationData.geometry.location.lng
			const latitudeIsNegative = checkIfNegative(latitude)
			const longitudeIsNegative = checkIfNegative(longitude)

			if(latitudeIsNegative === true) {
				latitude = Math.abs(latitude)
			}
			if(longitudeIsNegative === true) {
				longitude = Math.abs(longitude)
			}

         window.location.assign(`/map/${latitudeIsNegative}/${latitude}/${longitudeIsNegative}/${longitude}/`)
      })
      .catch(err => console.log(err))
})


sendUser.addEventListener('click', () => {
   let userLocation = {
      street : document.getElementById('location-street').value.trim(),
      city : document.getElementById('location-city').value.trim(),
      state : document.getElementById('location-state').value.trim(),
   }
	postUserLocationData(userLocation)
})
