
// RESTURANT INFO ELEMENTS
const sendResturant = document.getElementById('send-resturant')


// RESTURANT RATING ELEMENTS
const postResturantData = (resturant => {
	fetch(`${window.location.pathname}/api/resturant/rate`, {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(resturant)
   })
   .then(response => response.json())
   .then(err => console.log(err))
})


sendResturant.addEventListener('click', () => {
   // GET RESTURANT INFO from form
   const name = document.getElementById('resturant-name').value.trim()
   const street = document.getElementById('resturant-street').value.trim()
   const city = document.getElementById('resturant-city').value.trim()
   const state = document.getElementById('resturant-state').value.trim()
   const zip = document.getElementById('resturant-zip').value.trim()

   // GET RESTURANT RATING from form
   const food = document.querySelector('input[name=food]:checked').value
   const drinks =  document.querySelector('input[name=drinks]:checked').value
   const atmosphere = document.querySelector('input[name=atmosphere]:checked').value
   const staff = document.querySelector('input[name=staff]:checked').value
   const parking = document.querySelector('input[name=parking]:checked').value

   // CREATE resturant object
   const resturant = {
      name,
      street,
      city,
      state,
      zip,
      food,
      drinks,
      atmosphere,
      staff,
      parking
   }
   console.log(resturant)
   postResturantData(resturant)
})