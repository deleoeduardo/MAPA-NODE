

function initialize() {
    map_in = new google.maps.Map(byId('map_in'), {
                                zoom: 9,
                                center: new google.maps.LatLng(-45.7775112, -68.7557955),
                                mapTypeId: 'terrain'
                            }),
        
    google.maps.event.addListener(map_in, 'mousemove', function (event) {
        byId('latitude').value = event.latLng.lat();
        byId('longitude').value = event.latLng.lng();
    });

    drawman.setMap(map_in);
}

google.maps.event.addDomListener(window, 'load', initialize);
