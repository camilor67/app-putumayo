//jQuery(document).ready(function($) {
var imap;

$(".nav-tab").click(function() {
  var elementClicked = this;
  $(elementClicked).addClass("ind-sel").siblings().removeClass("ind-sel");
  $('#' + $(elementClicked).attr("id") + '-content').show().siblings().hide();
});

$("#about").click(function() {
  $(".main .anav").removeClass("nav-selected");
  $("#about").addClass("nav-selected");
  $("#about-content").show().siblings().hide();
});
$("#region").click(function() {
  $(".main .anav").removeClass("nav-selected");
  $("#region").addClass("nav-selected");
  $("#region-content").show().siblings().hide();
  imap = initMap();
});
$("#agreement").click(function() {
  $(".main .anav").removeClass("nav-selected");
  $("#agreement").addClass("nav-selected");
  $("#agreement-content").show().siblings().hide();
});

$("#putumayo-nav").click(function() {
  $(".anavm").removeClass("nav-selected");
  $("#putumayo-nav").addClass("nav-selected");
  $("#putumayo-cont").show().siblings().hide();
  selectMunicipio (imap, 'putumayo');
});
$("#orito-nav").click(function() {
  $(".anavm").removeClass("nav-selected");
  $("#orito-nav").addClass("nav-selected");
  $("#orito-cont").show().siblings().hide();
  selectMunicipio (imap, 'orito');
});
$("#asis-nav").click(function() {
  $(".anavm").removeClass("nav-selected");
  $("#asis-nav").addClass("nav-selected");
  $("#asis-cont").show().siblings().hide();
  selectMunicipio (imap, 'asis');
});
$("#caicedo-nav").click(function() {
  $(".anavm").removeClass("nav-selected");
  $("#caicedo-nav").addClass("nav-selected");
  $("#caicedo-cont").show().siblings().hide();
  selectMunicipio (imap, 'caicedo');
});
$("#miguel-nav").click(function() {
  $(".anavm").removeClass("nav-selected");
  $("#miguel-nav").addClass("nav-selected");
  $("#miguel-cont").show().siblings().hide();
  selectMunicipio (imap, 'miguel');
});
$("#guamuez-nav").click(function() {
  $(".anavm").removeClass("nav-selected");
  $("#guamuez-nav").addClass("nav-selected");
  $("#guamuez-cont").show().siblings().hide();
  selectMunicipio (imap, 'guamuez');
});

$('#donwload-doc').click(function(e) {
  e.preventDefault();  //stop the browser from following
//    window.location.target = '_blank';
//    window.location.href = 'Informe_final_Putumayo.docx';
  window.open('Informe_final_Putumayo.docx');
});
//});
//var map;
function selectMunicipio (obj, mun) {
  obj["map"].fitBounds(imap[mun].getBounds());
  var mStyle = {
    color: "#fff",
    "fillColor": "000",
    "fillOpacity": 0,
    "weight": 1,
    "opacity": 1
  };
  
  var highlightStyleo = {
    "color": "#fff",
    "fillColor": "#cb3232",
    "fillOpacity": 0.8,
    "weight": 1,
    "opacity": 1
  };
  
  $.each(obj, function(i, val) {
    if (i==mun && i != 'putumayo') {
      obj[i].setStyle(highlightStyleo);
    } else if (i != 'map' && i != 'putumayo') {
      obj[i].setStyle(mStyle);
    }
//    $("#" + i).append(document.createTextNode(" - " + val));
//    obj["orito"].setStyle(highlightStyleo);
  });
}

function initMap() {
  var map = L.map('map', {
    center: [4.583333, -74.066667],
    zoom: 5,
    zoomControl: false,
//    maxZoom: 9,
//    minZoom: 1,
    scrollWheelZoom: false,
    dragging: false
  });
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
  var myDefaultStyle = {
    "color": "#fff",
    "fillColor": "#cb3232",
    "fillOpacity": 0,
    "weight": 1,
    "opacity": 0
  };

  var mStyle = {
    color: "#fff",
    "fillColor": "000",
    "fillOpacity": 0,
    "weight": 1,
    "opacity": 1
  };

  var colombiaLayer = L.geoJson(colombia, {style: myDefaultStyle});

  var lputumayo = L.geoJson(putumayo, {style: function(feature) {
      return {
        color: "000",
        "fillColor": feature.properties.color,
        "fillOpacity": 0.8,
        "weight": 1,
        "opacity": 1
      };
    }, onEachFeature: onEachFeatureRegion}).addTo(map);
  var lorito = L.geoJson(vorito, {style: mStyle, onEachFeature: onEachFeatureVereda}).addTo(map);
  var lasis = L.geoJson(vasis, {style: mStyle, onEachFeature: onEachFeatureVereda}).addTo(map);
  var lcaicedo = L.geoJson(vcaicedo, {style: mStyle, onEachFeature: onEachFeatureVereda}).addTo(map);
  var lmiguel = L.geoJson(vmiguel, {style: mStyle, onEachFeature: onEachFeatureVereda}).addTo(map);
  var lguamuez = L.geoJson(vguamuez, {style: mStyle, onEachFeature: onEachFeatureVereda}).addTo(map);

  map.setMaxBounds(colombiaLayer.getBounds());
  map.fitBounds(lputumayo.getBounds());
  return {"map": map, "orito": lorito, "asis": lasis, "caicedo": lcaicedo, "miguel": lmiguel, "guamuez": lguamuez, "putumayo": lputumayo};
}

function onEachFeatureVereda(feature, layer) {
  var highlightStyle = {
    "color": "#fff",
    "fillColor": "#cb3232",
    "fillOpacity": 0.8,
    "weight": 1,
    "opacity": 1
  };
  layer._leaflet_id = feature.properties.name + "-c";

  layer.on("mouseover", function(e) {
//    layer.bindPopup(feature.properties.name);
    layer.setStyle(highlightStyle);
//    console.log('Ov'+e.type);
  });

  layer.on("mouseout", function(e) {
//    layer.closePopup();
    layer.setStyle({
      color: "#fff",
      "fillColor": "000",
      "fillOpacity": 0,
      "weight": 1,
      "opacity": 1
    });
//    console.log('Ou'+e.type);
  });
  layer.on("click", function(e) {
    $("#map-menu").show();
    $("#title-m").html(feature.properties.name);
    $("#body-m").html("<div>" + feature.properties.name + "</div>");
  });
}

function onEachFeatureRegion(feature, layer) {
  var highlightStyle = {
    "color": "#fff",
    "fillColor": "#ffdd00",
    "fillOpacity": 0.8,
    "weight": 1,
    "opacity": 1
  };
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
  layer.on("click", function(e) {
    $("#map-menu").show();
    $("#title-m").html(feature.properties.name);
    $("#body-m").html("<div>" + feature.properties.name + "</div>");
  });
}

function closeMapProject() {
  $("#map-menu").html("");
}

$("#closed").on("click", function() {
  $("#map-menu").hide();
});

var lineOpt = {
  width: 500,
  height: '300px',
  fullWidth: true,
  chartPadding: {
    right: 40
  }
}

var loptions = {
  width: 500,
  height: '300px',
  distributeSeries: true
};

var options = {
  width: 500,
  height: '300px',
  // Default mobile configuration
  stackBars: true,
  axisX: {
    labelInterpolationFnc: function(value) {
      return value.split(/\s+/).map(function(word) {
        return word[0];
      }).join('');
    }
  },
  axisY: {
    offset: 20
  }
};

var responsiveOptions = [
  // Options override for media > 400px
  ['screen and (min-width: 400px)', {
      reverseData: true,
      horizontalBars: true,
      axisX: {
        labelInterpolationFnc: Chartist.noop
      },
      axisY: {
        offset: 60
      }
    }],
  // Options override for media > 800px
  ['screen and (min-width: 800px)', {
      stackBars: false,
      seriesBarDistance: 10
    }],
  // Options override for media > 1000px
  ['screen and (min-width: 1000px)', {
      reverseData: false,
      horizontalBars: false,
      seriesBarDistance: 15
    }]
];

new Chartist.Bar('#putu-geo-chart', {
  labels: ['Orito', 'P. Asís', 'P. Caicedo', 'San Miguel', 'V. Guamuez'],
  series: [
    [17731, 28003, 2975, 3351, 12615],
    [1383, 937, 1119, 1142, 2844],
    [20405, 16805, 6487, 10752, 17499]
  ]
}, options, responsiveOptions);

new Chartist.Bar('#putu-demo-chart', {
  labels: ['Orito', 'P. Asís', 'P. Caicedo', 'San Miguel', 'V. Guamuez'],
  series: [
    [12329, 5434, 2025, 1327, 2788],
    [2, 3, 0, 0, 1],
    [2988, 3305, 572, 621, 782]
  ]
}, options, responsiveOptions);

new Chartist.Bar('#putu-demo-chart', {
  labels: ['Orito', 'P. Asís', 'P. Caicedo', 'San Miguel', 'V. Guamuez'],
  series: [
    [12329, 5434, 2025, 1327, 2788],
    [2, 3, 0, 0, 1],
    [2988, 3305, 572, 621, 782],
    [22711,34588,6167,11269,27285]
  ]
}, options, responsiveOptions);

new Chartist.Bar('#putu-ame-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [13, 9, 10, 30, 59]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#putu-ame2-chart', {
  labels: ['Accidente', 'Av. Torrencial', 'Deslizamiento', 'Escape', 'Incendio', 'I. Forestal', 'Inundacion', 'Sequía', 'Vendaval', 'Otro'],
  series: [2, 4, 10, 1, 8,1,70,1,23,1]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#putu-efec-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [
    [10, 17, 55, 15, 284]
  ]
}, options, responsiveOptions);

new Chartist.Bar('#orito-geo-chart', {
  labels: ['Cabecera', 'Centros Poblados', 'Rural disperso'],
  series: [17731,1383,20405]
}, loptions, responsiveOptions);

new Chartist.Bar('#asis-geo-chart', {
  labels: ['Cabecera', 'Centros Poblados', 'Rural disperso'],
  series: [28003,937,16805]
}, loptions, responsiveOptions);

new Chartist.Bar('#caicedo-geo-chart', {
  labels: ['Cabecera', 'Centros Poblados', 'Rural disperso'],
  series: [2975,1119,6487]
}, loptions, responsiveOptions);

new Chartist.Bar('#miguel-geo-chart', {
  labels: ['Cabecera', 'Centros Poblados', 'Rural disperso'],
  series: [3351,1142,10752]
}, loptions, responsiveOptions);

new Chartist.Bar('#guamuez-geo-chart', {
  labels: ['Cabecera', 'Centros Poblados', 'Rural disperso'],
  series: [12615,2844,17499]
}, loptions, responsiveOptions);

new Chartist.Bar('#orito-demo-chart', {
  labels: ['Indígenas', 'Raizal', 'Afrocolombiano', 'Otro'],
  series: [12329,2,2988,22711]
}, loptions, responsiveOptions);

new Chartist.Bar('#asis-demo-chart', {
  labels: ['Indígenas', 'Raizal', 'Afrocolombiano', 'Otro'],
  series: [5434,3,3305,34588]
}, loptions, responsiveOptions);

new Chartist.Bar('#caicedo-demo-chart', {
  labels: ['Indígenas', 'Raizal', 'Afrocolombiano', 'Otro'],
  series: [2025,0,572,6167]
}, loptions, responsiveOptions);

new Chartist.Bar('#miguel-demo-chart', {
  labels: ['Indígenas', 'Raizal', 'Afrocolombiano', 'Otro'],
  series: [1327,0,621,11269]
}, loptions, responsiveOptions);

new Chartist.Bar('#guamuez-demo-chart', {
  labels: ['Indígenas', 'Raizal', 'Afrocolombiano', 'Otro'],
  series: [2788,1,782,27285]
}, loptions, responsiveOptions);

new Chartist.Bar('#orito-ame-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [1, 1, 1, 4, 14]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#asis-ame-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [9, 6, 8, 15, 20]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#caicedo-ame-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [3, 1, 1, 3, 13]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#miguel-ame-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [0, 0, 0, 2, 6]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#guamuez-ame-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [0, 1, 0, 6, 6]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#orito-ame2-chart', {
  labels: ['Accidente', 'Av. Torrencial', 'Deslizamiento', 'Escape', 'Incendio', 'I. Forestal', 'Inundacion', 'Sequía', 'Vendaval', 'Otro'],
  series: [0, 1, 5, 0, 2,1,7,0,5,0]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#asis-ame2-chart', {
  labels: ['Accidente', 'Av. Torrencial', 'Deslizamiento', 'Escape', 'Incendio', 'I. Forestal', 'Inundacion', 'Sequía', 'Vendaval', 'Otro'],
  series: [1,0,5,0,5,0,35,1,10,1]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#caicedo-ame2-chart', {
  labels: ['Accidente', 'Av. Torrencial', 'Deslizamiento', 'Escape', 'Incendio', 'I. Forestal', 'Inundacion', 'Sequía', 'Vendaval', 'Otro'],
  series: [1,0,0,0,0,0,16,0,4,0]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#miguel-ame2-chart', {
  labels: ['Accidente', 'Av. Torrencial', 'Deslizamiento', 'Escape', 'Incendio', 'I. Forestal', 'Inundacion', 'Sequía', 'Vendaval', 'Otro'],
  series: [0,1,0,1,1,0,3,0,2,0]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#guamuez-ame2-chart', {
  labels: ['Accidente', 'Av. Torrencial', 'Deslizamiento', 'Escape', 'Incendio', 'I. Forestal', 'Inundacion', 'Sequía', 'Vendaval', 'Otro'],
  series: [0,2,0,0,0,0,9,0,2,0]
  
}, loptions,responsiveOptions);

new Chartist.Bar('#orito-efec-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [
    [0, 0, 0, 0, 42],
  ]
}, options, responsiveOptions);

new Chartist.Bar('#asis-efec-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [
    [10,17,55,15,129],
  ]
}, options, responsiveOptions);

new Chartist.Bar('#caicedo-efec-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [
    [0,0,0,0,86],
  ]
}, options, responsiveOptions);

new Chartist.Bar('#miguel-efec-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [
    [0,0,0,0,23],
  ]
}, options, responsiveOptions);

new Chartist.Bar('#guamuez-efec-chart', {
  labels: ['70', '80', '90', '2000', '2010'],
  series: [
    [0,0,0,0,4],
  ]
}, options, responsiveOptions);
