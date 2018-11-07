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
      // console.log(resturants)
      return resturants
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
   console.log(resturantIdNumber)
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
   console.log(resturantIdNumber)
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

const addLocationMarker =  (resturantData) => {
   // Check to see if a resturant is busy to assign the proper marker
   const icon = checkIfBusy(resturantData.resturant.isBusy)
   const resturantID = `'${resturantData.resturant._id}'`
   // TO DO:  convert time to something pretty
   const time = resturantData.resturant.updatedAt

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
   const displayInfo = new google.maps.InfoWindow({
      content:`
         <h5>${resturantData.resturant.name}</h5>
			<div class="ratings">
				Food:
				Drinks:
				Atmosphere:
				Staff:
				Parking:
			</div>
			<br>
         <div class="text-center">
            <button type="button" class="btn btn-outline-success btn-sm" id="quiet-btn" onclick=changeToQuiet(${resturantID})>Quiet</button>
            <button type="button" class="btn btn-outline-danger btn-sm" id="busy-btn" onclick=changeToBusy(${resturantID})>Busy</button>
			</div>
			<br>
         <span>Last Updated: ${time}</span>
      `
  })
  marker.addListener('click', () => {
     displayInfo.open(map, marker)
  })
}
function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: adjustedLatitude, lng: adjustedLongitude},
      zoom: 13
   });

   getResturantsfromDatabase()
      .then(resturants =>  {
         resturants.forEach(resturant => {
            console.log(resturant)
            const coordinates = {
               lat: resturant.latitude,
               lng: resturant.longitude
            }
            const resturantInfo = {
               resturant,
               coordinates
            }
            // console.log(resturantInfo.resturant)
            addLocationMarker(resturantInfo)
         });
      })
}