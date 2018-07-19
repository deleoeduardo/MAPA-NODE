/*
 * Declaracion de variables globales.
*/
var selected_shape,
    shapes = [],
    infowindow = null,
    map_in,
    drawman = new google.maps.drawing.DrawingManager({drawingControlOptions: {drawingModes: ['polygon', 'polyline']}});

/*
 * Recibe una zona como parametro. 
 * Devuelve su centro.
*/
function polygonCenter(polygon) {
    var lowx,
        highx,
        lowy,
        highy,
        lats = [],
        lngs = [],
        vertices = polygon.getPath();
    
    for (var i = 0; i < vertices.length; i++) {
        lngs.push(vertices.getAt(i).lng());
        lats.push(vertices.getAt(i).lat());
    }
    
    lats.sort();
    lngs.sort();
    lowx = lats[0];
    highx = lats[vertices.length - 1];
    lowy = lngs[0];
    highy = lngs[vertices.length - 1];
    center_x = lowx + ((highx - lowx) / 2);
    center_y = lowy + ((highy - lowy) / 2);
    return (new google.maps.LatLng(center_x, center_y));
};

/*
 * Conversor de coordenadas dependiendo la UG.
*/
function Conversor(x, y, UG) {
    var coordWGS84 = [];
    var primera;
    
    switch (UG){
      case 'NEUQUEN':
        //NQN
        primera='+proj=tmerc +lat_0=-90 +lon_0=-69 +k=1 +x_0=2500000 +y_0=0 +ellps=intl +towgs84=10.04,163.97,131.72,0,0,0,0 +units=m +no_defs';
        break;
      case 'GOLFO SAN JORGE':
        //GSJ
        primera = '+proj=tmerc +lat_0=-90 +lon_0=-69 +k=1 +x_0=2500000 +y_0=0 +ellps=intl +towgs84=-232.57,6.66,173.93,0,0,0,0 +units=m +no_defs';
        break;
      case 'ACAMBUCO':
        //ACA
        primera = '+proj=tmerc +lat_0=-90 +lon_0=-63 +k=1 +x_0=4500000 +y_0=0 +ellps=intl +towgs84=-148.00,136.00,90.00,0,0,0,0 +units=m +no_defs';
        break;
    }    
    var segunda = '+proj=longlat +datum=WGS84 +no_defs'
  
    coordWGS84 = proj4(primera, segunda, [x, y]);
    return new google.maps.LatLng(coordWGS84[1], coordWGS84[0]);
};

/*
*/
function byId(element) { 
    return document.getElementById(element); 
};

function clearSelection() {
    if (selected_shape) {
        selected_shape.set((selected_shape.type 
                            === 
                            google.maps.drawing.OverlayType.MARKER)
                            ? 'draggable' : 'editable', false);
    }
    selected_shape = null;
};

/*
*/
function setSelection(shape) {
    clearSelection();
    selected_shape = shape;
    
    if (selected_shape.type === google.maps.drawing.OverlayType.MARKER){ 
    
        selected_shape.set('draggable', false);
        drawWellChart(selected_shape);
    
    } else if (selected_shape.type === google.maps.drawing.OverlayType.POLYGON) {
    
        selected_shape.set('editable', true)
    
        if (selected_shape.tag !== undefined) {
            
            if (infowindow) {
              infowindow.close();
            }
        
            infowindow = new google.maps.InfoWindow({
                content: selected_shape.tag,
                position: polygonCenter(selected_shape)
            });
        
            infowindow.open(map_in, selected_shape);
        
        }
    
    } else {
    
        selected_shape.set('editable', true)
    
    }
};





