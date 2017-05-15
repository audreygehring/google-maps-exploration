var map;
function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.3601, lng: -71.0589},
    scrollwheel: false,
    zoom: 14
  });

  // Create drop-down selection items from sampleData array
  var select = document.getElementById("selectLocation");
  for (let i = 0; i < sampleData.length; i++) {
    var option = sampleData[i].name;
    var element = document.createElement("option");
    element.textContent = option;
    element.value = option;
    // Add each child "option" element to the selectLocation tag
    select.appendChild(element);
    // Add event listener to add marker for location at selected index of drop-down menu
    // subtracted 1 since drop-down element index starts at 1 vs sampleData's start at 0
    select.addEventListener("change", function() {
      addMarker(sampleData[select.selectedIndex - 1]);
    }, false);
  }

  // Function to add marker to the map - takes in proper location object
  var markerArray = [];
  function addMarker(locationData) {
    var marker;
    // Remove existing marker if shown
    if (markerArray.length > 0) {
      marker = markerArray[0];
      marker.setMap(null);
      markerArray = [];
    }
    marker = new google.maps.Marker({
      position: {lat: locationData.location.lat, lng: locationData.location.lon},
      animation: google.maps.Animation.DROP,
      map: map
    });
    markerArray.push(marker);
    // Pan to new marker for visability
    map.panTo(marker.position);

    // Add listener for info windows
    marker.addListener('click', function () {
      addInfoWindow(marker, locationData);
    });
  }

  // Function to add info window to map marker
  function addInfoWindow(marker, locationData) {
    var infoContent;
    // Populate info window content based on information stored in data file
    if (locationData.details) {
      infoContent = `<strong>${locationData.name}</strong>` +
                    `<div><i>${locationData.details.description}</i></div>` +
                    `<div>Visit us at our <a href=${locationData.details.website} target="_blank">website!</a></div>`;
    } else {
      infoContent = `<strong>${locationData.name}</strong>` +
                    `<div><i>No other information at this time.</i></div>`;
    }
    var infoWindow = new google.maps.InfoWindow({
      content: infoContent,
      maxWidth: 200
    });
    // Add info window to map
    infoWindow.open(map, marker);
  }
}
