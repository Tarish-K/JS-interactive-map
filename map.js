// map object


const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// build leaflet map
	buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		// create and add geolocation marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>You are here</b><br></p1>')
		.openPopup()
	},

	// add business markers
	addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}

// get coordinates via geolocation api
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// get foursquare businesses
async function getFoursquare(business) {
    let clientId = '3J5YYNCNKZRXEAIRVG3SBTUIGGHSSZLSUYVGAL4IPG0EPA34'
    let clentSecret = 'IPGTGUNL5IUETNNIQXNVXWQD2AB1QDIWZZY0B5UXB0NHPDQU'
    let limit = 5
    let lon = myMap.coordinates[1]
    let lan = myMap.coordinates[0]
    let response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?client_id=${clientId}&client_secret=${clentSecret}&v=20180323&limit=${limit}&ll=${lan},${lon}&query=${business}`
    )
    let data = await response.json()
    console.log(data)
    


}
// process foursquare array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}


// event handlers
// window load
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})





// const api = 'fsq36fj9Pbxp4UOs+hzqu7isWEhXLnwtlIn4gJUhf/4kjNE='

// var map = L.map('map').setView([40.718614, -73.996182], 16);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 15,
//     attribution: '© OpenStreetMap'

// }).addTo(map);

// var marker = L.marker([40.718614, -73.996182]).addTo(map);
// var marker2 = L.marker([40.724116, -73.986666]).addTo(map);
// var marker3 = L.marker([40.723221, -73.998156]).addTo(map);
// var marker4 = L.marker([40.717105, -73.986910]).addTo(map);
// var marker5 = L.marker([40.722988, -73.990591]).addTo(map);

// marker.bindPopup('<h2>Burger</h2>')
// marker2.bindPopup('<h2>Ice cream</h2>')
// marker3.bindPopup('<h2>Hotdog</h2>')
// marker4.bindPopup('<h2>Pizza</h2>')
// marker5.bindPopup('<h2>Drinks</h2>')

// window.onload = async () => {
// 	const coords = await getCoords()
// 	console.log(coords)
// 	myMap.coordinates = coords
// 	myMap.buildMap()
// }
// document.getElementById('submit').addEventListener('click', async (event) => {
// 	event.preventDefault()
// 	let business = document.getElementById('business').value
// 	console.log(business)
// })


