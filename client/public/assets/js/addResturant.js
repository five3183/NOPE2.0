
// RESTURANT INFO ELEMENTS
const sendResturant = document.getElementById('send-resturant')

// RESTURANT RATING ELEMENTS
const postResturantData = (resturant => {
	fetch(`/resturant`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(resturant)
   })
   .then(response => response.json())
   .then(id => {
      window.location.assign(`/rate_resturant/${id}`)

   })
   .then(err => console.log(err))
})

sendResturant.addEventListener('click', () => {
   // GET RESTURANT INFO from form
   const name = document.getElementById('resturant-name').value.trim()
   const street = document.getElementById('resturant-street').value.trim()
   const city = document.getElementById('resturant-city').value.trim()
   const state = document.getElementById('resturant-state').value.trim()
   const zip = document.getElementById('resturant-zip').value.trim()

   // CREATE resturant object
   const resturant = {
      name,
      street,
      city,
      state,
      zip,
   }
   console.log(resturant)
   postResturantData(resturant)
})