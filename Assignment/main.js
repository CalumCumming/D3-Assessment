//Draw map of UK
function initMap() {
  //Create a map centered around the UK
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 54.600017, lng: -3.177663},
    zoom:5.6
  })


//D3 program that consumes the feed
  d3.json("http://34.38.72.236/Circles/Towns/50", function(data) {
      console.log(data);
  });
  
//Plot the towns from the JSON feed onto the map
  d3.json("http://34.38.72.236/Circles/Towns/50")
      .then(data => {
          //Assuming the JSON contains a list of towns with lat and lng properties
          data.forEach(town => {
            const position = {lat: town.lat, lng: town.lng };

            //Create a marker for each town
            const marker = new google.maps.Marker({
              position: position,
              map: map,
              title:town.name,
              animation: google.maps.Animation.DROP             
            });

// Call a function to add info markers using JSON data

//fetch("http://34.38.72.236/Circles/Towns/50")
  //.then(response => response.json())
  //.then(data => {
    //data.ForEach(markerData => {
      //const marker = new google.maps.Marker({
        //position: { lat: markerData.lat, lng: markerData.lng },
        //map: map,
        //title: Town.name

        // Create an info marker (Creates just one town)
        // Addition of position changed info
        const infoWindow = new google.maps.InfoWindow({
          content: `<h2>${town.Town}</h2><p>Population: ${town.Population}</p>`
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });      
    })
  
//Ajax command (Doesn't add any new info to the map)
    $.ajax({
      url: 'http://34.38.72.236/Circles/Towns/50',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, place){
          var marker = new google.maps.Marker({
            position: {lat: place.lat, lng: place.lng},
            map: map,
            title: place.name,
          })
        })
      }
    })


// Catch error command
      .catch(error => {
          console.error("Failed to load data:", error);
      });
}

