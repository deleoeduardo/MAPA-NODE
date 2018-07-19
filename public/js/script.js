$(function() {
    $('#show_zones').on('click', function(event) {
        event.preventDefault();
        window.location = window.location + "zones/getZones";
    });
    $('#save_zones').on('click', function(event) {
        event.preventDefault();
        window.location = window.location + "zones/saveZones";
    });

    // Cambia el color a la zona seleccionada.
    $("#custom").spectrum({
        color: "#f00",
        replacerClassName: "styling",
        change: function (color) {
            if (selected_shape != null) {
                selected_shape.setOptions({ fillColor: color.toHexString() });
            }
        }
    });
    var t = $("#custom").spectrum("get");
    
});