require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
], function(Map, MapView, Graphic, GraphicsLayer) {

    const map = new Map({
        basemap: "streets-vector"
    });

    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-112.01, 43.50],
        zoom: 12
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const places = [
        { name: "Tautphaus Park", type: "Park", description: "A large local park.", lon: -112.001, lat: 43.479 },
        { name: "Museum of Idaho", type: "Museum", description: "A museum in Idaho Falls.", lon: -112.034, lat: 43.492 },
        { name: "Idaho Falls High School", type: "School", description: "A local high school.", lon: -112.003, lat: 43.500 },
        { name: "Walmart", type: "Store", description: "A large retail store.", lon: -111.989, lat: 43.466 },
        { name: "Russ Freeman Park", type: "Park", description: "A riverside park.", lon: -112.020, lat: 43.500 },
        { name: "ARTitorium", type: "Museum", description: "Interactive art museum.", lon: -112.037, lat: 43.492 },
        { name: "Skyline High School", type: "School", description: "A local school.", lon: -111.990, lat: 43.470 },
        { name: "Target", type: "Store", description: "Shopping center store.", lon: -111.989, lat: 43.514 },
        { name: "Community Park", type: "Park", description: "A public recreation area.", lon: -112.050, lat: 43.520 },
        { name: "Collector Corner Museum", type: "Museum", description: "Small local museum.", lon: -112.030, lat: 43.491 },
        { name: "BYU-Idaho Center", type: "School", description: "Nearby university area.", lon: -111.783, lat: 43.815 },
        { name: "Costco", type: "Store", description: "Warehouse store.", lon: -111.989, lat: 43.548 },
        { name: "Kate Curley Park", type: "Park", description: "Neighborhood park.", lon: -112.010, lat: 43.485 },
        { name: "Idaho Falls Public Library", type: "Museum", description: "Public learning center.", lon: -112.034, lat: 43.493 },
        { name: "Taylorview Middle School", type: "School", description: "A local school.", lon: -112.022, lat: 43.503 },
        { name: "WinCo Foods", type: "Store", description: "Grocery store.", lon: -111.990, lat: 43.525 },
        { name: "Freeman Trail Access", type: "Park", description: "Trail and outdoor access point.", lon: -112.018, lat: 43.503 },
        { name: "Bonneville County Historical Museum", type: "Museum", description: "History exhibits.", lon: -112.032, lat: 43.491 },
        { name: "Compass Academy", type: "School", description: "A local school.", lon: -112.015, lat: 43.510 },
        { name: "Fred Meyer", type: "Store", description: "Retail and grocery store.", lon: -111.985, lat: 43.514 }
    ];

    function getSymbol(type) {
        let color = "blue";

        if (type === "Park") color = "green";
        else if (type === "Museum") color = "purple";
        else if (type === "School") color = "orange";
        else if (type === "Store") color = "red";

        return {
            type: "simple-marker",
            color: color,
            size: "12px"
        };
    }

    function displayMarkers(selectedType) {
        graphicsLayer.removeAll();

        places.forEach(place => {
            if (selectedType === "All" || place.type === selectedType) {
                const point = {
                    type: "point",
                    longitude: place.lon,
                    latitude: place.lat
                };

                const popupTemplate = {
                    title: place.name,
                    content: `<b>Type:</b> ${place.type}<br><b>Description:</b> ${place.description}`
                };

                const graphic = new Graphic({
                    geometry: point,
                    symbol: getSymbol(place.type),
                    popupTemplate: popupTemplate
                });

                graphicsLayer.add(graphic);
            }
        });
    }

    displayMarkers("All");

    document.getElementById("categoryFilter").addEventListener("change", function() {
        displayMarkers(this.value);
    });
});
