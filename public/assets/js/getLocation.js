// UI ELEMENTS
const userStreet = document.getElementById('location-street').value
const userCity = document.getElementById('location-city').value
const userState = document.getElementById('location-state').value
const userZip = document.getElementById('location-zip').value
const userSend = document.getElementById('send-location')


userSend.addEventListener('click', () => {
   let userLocation = {
      userStreet,
      userCity,
      userState,
      userZip
   }
   // TO DO: Send user data to server
   console.log(userLocation)
})
