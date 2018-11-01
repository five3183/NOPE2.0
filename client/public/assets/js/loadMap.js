const key = new Keys()
const body = document.body
const loadMap = document.getElementById('loadMap')

// CREATE script to load

const loadMapScript = () => {
   key.getKeys()
      .then(key => {
         const mapScriptTag = document.createElement('script')
         mapScriptTag.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${key.key.gMapApiKey}&callback=initMap`)
         body.insertBefore(mapScriptTag, loadMap)
      })
}

document.addEventListener('DOMContentLoaded', loadMapScript)