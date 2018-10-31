// RESTURANT INFO ELEMENTS
const resturantName = document.getElementById('resturant-name').value
const resturantStreet = document.getElementById('resturant-street').value
const resturantCity = document.getElementById('resturant-city').value
const resturantState = document.getElementById('resturant-state').value
const resturantZip = document.getElementById('resturant-zip').value
const sendResturant = document.getElementById('send-resturant')

// RESTURANT RATING ELEMENTS



sendResturant.addEventListener('click', () => {
   let resturant = {
      resturantName,
      resturantStreet,
      resturantCity,
      resturantState,
      resturantZip,
      // rating info
      food: document.querySelector('input[name=food]:checked').value,
      drinks : document.getElementById('drinks').value,
      atmosphere : document.getElementById('atmosphere').value,
      staff : document.getElementById('staff').value,
      parking : document.getElementById('parking').value
   };
   // TO DO: Send user data to server
   console.log(resturant)
})