// map class initialize
var map = L.map('map').setView(
    [-1.8019477027440953, 120.05916354120448], 5);
map.zoomControl.setPosition('topright');

// Adding BaseMpas Tilelayer
// Esri Satellite
var esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri'
}).addTo(map);

// Google Maps (Streets)
var googleStreet = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.google.com/permissions/geoguidelines.html">Google</a> '
});

// Google Maps (Satellite)
var googleSatellite = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.google.com/permissions/geoguidelines.html">Google</a>'
});

// Open Street Maps
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
});

// Mapbox
var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXVhcmllZmFobHVuMTMxMyIsImEiOiJjbTFiajJvenEwYmcxMmtzNjRmemo0a2xrIn0.EKPGeGMUtse3tNmmzwVMhw'
});

// Adding a dark map base layer (darkBaseMap)
var darkBaseMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://carto.com/attributions">catro</a>'
});

//Addming marker in the center of map
var singleMarker = L.marker([-1.8019477027440953, 120.05916354120448])
    .bindPopup('')
    .openPopup();

//add map scale
L.control.scale().addTo(map);

//Map coordinate display
map.on('mousemove', function (e) {
    $('.coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`)
})

//Geojson load
var marker = L.markerClusterGroup();
var taji = L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name)
    }
});
taji.addTo(marker);
marker.addTo(map);


// LBaseMaps layer control
var baseMaps = {
    'Esri Satellite': esriSatellite,
    'Google Satellite': googleSatellite,
    'Google Street': googleStreet,
    'Mapbox': mapbox,
    'OSM': osm,
    'Dark Maps': darkBaseMap
};

var overlayMaps = {
    'GeoJSON Markers': marker,
    'Single Marker': singleMarker
}

L.control.layers(baseMaps, overlayMaps,
    { collapsed: true,
        position: 'topleft'
        }).addTo(map);
