var map = L.map('map').setView([4.583333, -74.066667], 5);
//map.scrollWheelZoom.disable();
//L.tileLayer('sat_tiles/{z}/0/{y}/0/{x}.png').addTo(map);
L.tileLayer('sat_tiles/{z0}/{x0}/{x1}/{y0}/{y1}.png').addTo(map); //gMapCatcher
//L.tileLayer('openstreetmap/{z}/{x}/{y}.png').addTo(map);
//L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
//  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
//    maxZoom: 16
//}).addTo(map);
//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//    maxZoom: 18,
//    id: 'your.mapbox.project.id',
//    accessToken: 'your.mapbox.public.access.token'
//}).addTo(map);

function onEachFeatureRegion(feature, layer) {
  layer._leaflet_id = feature.properties.name + "-c";
  
  layer.on("mouseover", function(e) {
//    layer.bindPopup(feature.properties.name);
    layer.setStyle(highlightStyle);
//    console.log('Ov'+e.type);
  });
  
  layer.on("mouseout", function(e) {
//    layer.closePopup();
    layer.setStyle({
      color: "000",
      "fillColor": feature.properties.color,
      "fillOpacity": 0.8,
      "weight": 1,
      "opacity": 1
    });
//    console.log('Ou'+e.type);
  });
  layer.on("click", function (e) {
    $("#map-menu").show();
    $("#title-m").html(feature.properties.name);
    $("#body-m").html("<div>" +feature.properties.name+"</div>");
  });
}

var highlightStyle = {
  "color": "#fff",
  "fillColor": "#ffdd00",
  "fillOpacity": 0.8,
  "weight": 1,
  "opacity": 1
};

var ciatCountriesLayer = L.geoJson(putumayo, {style: function(feature) {
    return {
      color: "000",
      "fillColor": feature.properties.color,
      "fillOpacity": 0.8,
      "weight": 1,
      "opacity": 1
    };
  }, onEachFeature: onEachFeatureRegion}).addTo(map);

map.fitBounds(ciatCountriesLayer.getBounds());

function closeMapProject(){
  $("#map-menu").html("");
}

$("#closed").on("click", function(){
  $("#map-menu").hide();
//  console.log('ccc');
});