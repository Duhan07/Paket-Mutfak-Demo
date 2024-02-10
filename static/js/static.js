L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var geocoder = L.Control.Geocoder.nominatim();

var zoomElem = document.getElementById("zoom");
zoomElem.innerHTML = "zoom: " + map.getZoom();
map.on('zoomend', function() {
    var zoomLevel = map.getZoom();
    var zoomElem = document.getElementById("zoom");
    zoomElem.innerHTML = "zoom: " + zoomLevel;
})

map.addLayer(markers);

markers.on('clusterclick', function (event) {
    var childMarkers = event.layer.getAllChildMarkers();
    console.log('Küme içindeki marker sayısı: ' + childMarkers.length);
});


markers.on('click', function (event) {
    var marker = event.layer;
    var latLng = marker.getLatLng();

    geocoder.reverse(latLng, map.options.crs.scale(map.getZoom()), function (results) {
        if (results.length > 0 && results[0].name) {
            var konumBilgisi = "Konum: " + latLng.lat.toFixed(5) + ", " + latLng.lng.toFixed(5);
            konumBilgisi += "<br>Adres: " + results[0].name;

            
            marker.bindPopup(konumBilgisi).openPopup();
            updateTableRow(latLng.lat, results[0].name);
        } else {
            var konumBilgisi = "Konum: " + latLng.lat.toFixed(5) + ", " + latLng.lng.toFixed(5);

            marker.bindPopup(konumBilgisi).openPopup();
            updateTableRow(latLng.lat, "Konum yok");
        }
    });
});



function updateTableRow(lat, konumBilgisi) {
    var row = document.getElementById("il_adi_"+lat);
    if (row) {
        var ilAdiId = 'il_adi_' + lat; 
        var ilAdiElement = document.getElementById(ilAdiId);
        if (ilAdiElement) {
            ilAdiElement.innerHTML = konumBilgisi;
        }
    }
}


var redIcon = new L.Icon({
    iconUrl: 'https://cdn.webrazzi.com/uploads/2020/08/paket-mutfak-547.png',
    iconSize: [70, 60],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.marker([40.998181, 29.152202], { icon: redIcon }).addTo(map)
    .bindPopup('Paket Mutfak')
    .openPopup();


var circle = L.circle([40.998181, 29.152202], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.1,
    radius: 1500
}).addTo(map);

// iki konum arasındaki mesafeyi hesaplar
function haversineDistance(lat1, lon1, lat2, lon2) {
    var R = 6371;

    var dLat = degToRad(lat2 - lat1);
    var dLon = degToRad(lon2 - lon1);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;

    return distance;
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

subCircle1LatLng = [41.00269, 29.14185];
subCircle2LatLng = [41.007231, 29.15279];
subCircle3LatLng = [40.991036, 29.159356];
subCircle4LatLng = [40.993012, 29.144592];
subCircle5LatLng = [41.001524, 29.163748];
subCircle6LatLng = [40.999684, 29.153046];

var subCircle1 = L.circle(subCircle1LatLng, {
    color: 'green',
    fillColor: 'green',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);

var subCircle2 = L.circle(subCircle2LatLng, {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);

var subCircle3 = L.circle(subCircle3LatLng, {
    color: 'yellow',
    fillColor: 'yellow',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);

var subCircle4 = L.circle(subCircle4LatLng, {
    color: 'black',
    fillColor: 'black',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);

var subCircle5 = L.circle(subCircle5LatLng, {
    color: 'orange',
    fillColor: 'orange',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);

var subCircle6 = L.circle(subCircle6LatLng, {
    color: 'purple',
    fillColor: 'purple',
    fillOpacity: 0.3,
    radius: 500
}).addTo(map);

var subCircleLocNum1 = 0;
var subCircleLocNum2 = 0;
var subCircleLocNum3 = 0;
var subCircleLocNum4 = 0;
var subCircleLocNum5 = 0;
var subCircleLocNum6 = 0;
    
subCircle1.on('click', function(event) {
    onSubCircleClick(event, subCircle1LatLng[0], subCircle1LatLng[1]);
    subCircleLocNum1 = subCircleLocNum;
    var customPopupContent = "<div style='background-color: green; color: white; padding: 10px;'>Konum Sayısı: " + subCircleLocNum + "</div>";
    subCircle1.bindPopup(customPopupContent);
    subCircleLocNum = 0;
});
subCircle2.on('click', function(event) {
    onSubCircleClick(event, subCircle2LatLng[0], subCircle2LatLng[1]);
    subCircleLocNum2 = subCircleLocNum;
    var customPopupContent = "<div style='background-color: blue; color: white; padding: 10px;'>Konum Sayısı: " + subCircleLocNum + "</div>";
    subCircle2.bindPopup(customPopupContent)
    subCircleLocNum = 0;
});
subCircle3.on('click', function(event) {
    onSubCircleClick(event, subCircle3LatLng[0], subCircle3LatLng[1]);
    subCircleLocNum3 = subCircleLocNum;
    var customPopupContent = "<div style='background-color: yellow; color: black; padding: 10px;'>Konum Sayısı: " + subCircleLocNum + "</div>";
    subCircle3.bindPopup(customPopupContent);
    subCircleLocNum = 0;
});
subCircle4.on('click', function(event) {
    onSubCircleClick(event, subCircle4LatLng[0], subCircle4LatLng[1]);
    subCircleLocNum4 = subCircleLocNum;
    var customPopupContent = "<div style='background-color: black; color: white; padding: 10px;'>Konum Sayısı: " + subCircleLocNum + "</div>";
    subCircle4.bindPopup(customPopupContent);
    subCircleLocNum = 0;
});
subCircle5.on('click', function(event) {
    onSubCircleClick(event, subCircle5LatLng[0], subCircle5LatLng[1]);
    subCircleLocNum5 = subCircleLocNum;
    var customPopupContent = "<div style='background-color: orange; color: white; padding: 10px;'>Konum Sayısı: " + subCircleLocNum + "</div>";
    subCircle5.bindPopup(customPopupContent);
    subCircleLocNum = 0;
});
subCircle6.on('click', function(event) {
    onSubCircleClick(event, subCircle6LatLng[0], subCircle6LatLng[1]);
    subCircleLocNum6 = subCircleLocNum;
    var customPopupContent = "<div style='background-color: purple; color: white; padding: 10px;'>Konum Sayısı: " + subCircleLocNum + "</div>";
    subCircle6.bindPopup(customPopupContent);
    subCircleLocNum = 0;
});


var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("Konum: " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);

function ZoomTo() {
    var geom = this.closest("tr").dataset.geometry;
    var latLng = geom.replace(/[() ]/g, '');
    var coordinates = latLng.split(',');

    var lat = parseFloat(coordinates[0]);
    var lng = parseFloat(coordinates[1]);

    map.setView([lat, lng], 20);
}
