// UI ELEMENTS
const sendUser = document.getElementById('send-location')

const postUserLocationData = (user => {
	fetch(`/api/user/location`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
   })
   .then(response => response.json())
   .then(err => console.log(err))
})


sendUser.addEventListener('click', () => {
   let userLocation = {
      street : document.getElementById('location-street').value.trim(),
      city : document.getElementById('location-city').value.trim(),
      state : document.getElementById('location-state').value.trim(),
   }
   // TO DO: Send user data to server
   console.log(userLocation)
   postUserLocationData(userLocation)
})
