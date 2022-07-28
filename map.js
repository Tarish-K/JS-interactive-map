const api = 'fsq36fj9Pbxp4UOs+hzqu7isWEhXLnwtlIn4gJUhf/4kjNE='

var map = L.map('map').setView([40.718614, -73.996182], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '© OpenStreetMap'

}).addTo(map);

var marker = L.marker([40.718614, -73.996182]).addTo(map);
var marker2 = L.marker([40.724116, -73.986666]).addTo(map);
var marker3 = L.marker([40.723221, -73.998156]).addTo(map);
var marker4 = L.marker([40.717105, -73.986910]).addTo(map);
var marker5 = L.marker([40.722988, -73.990591]).addTo(map);

marker.bindPopup('<h2>Burger</h2>')
marker2.bindPopup('<h2>Ice cream</h2>')
marker3.bindPopup('<h2>Hotdog</h2>')
marker4.bindPopup('<h2>Pizza</h2>')
marker5.bindPopup('<h2>Drinks</h2>')

window.onload = async () => {
	const coords = await getCoords()
	console.log(coords)
	myMap.coordinates = coords
	myMap.buildMap()
}
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	console.log(business)
})