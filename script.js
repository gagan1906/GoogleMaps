
// Initialize and add the map
let map;

async function initMap() {
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Try to get the user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userPosition = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                // The map, centered at the user's current location
                map = new Map(document.getElementById("map"), {
                    zoom: 10,
                    center: userPosition,
                    mapId: "YOUR_MAP_ID", // Replace with your actual Map ID
                });

                // The marker, positioned at the user's current location
                new AdvancedMarkerElement({
                    map: map,
                    position: userPosition,
                    title: "You are here",
                });

                // Add marker for Georgian College Barrie
                new AdvancedMarkerElement({
                    map: map,
                    position: georgianCollegePosition,
                    title: "Georgian College Barrie",
                });
            },
            () => {
                handleLocationError(true);
            }
        );
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false);
    }
}

function handleLocationError(browserHasGeolocation) {
    const errorMsg = browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : 'Error: Your browser doesn\'t support geolocation.';

    console.error(errorMsg);

    // The map, centered at Georgian College Barrie if geolocation fails
    const fallbackPosition = { lat: 44.4123, lng: -79.6689 };
    map = new Map(document.getElementById("map"), {
        zoom: 10,
        center: fallbackPosition,
        mapId: "AIzaSyB46KFYf6_QUv9GSNu7qw4uRBX7h1SnWf0", // Replace with your actual Map ID
    });

    // Add marker for Georgian College Barrie
    new AdvancedMarkerElement({
        map: map,
        position: fallbackPosition,
        title: "Georgian College Barrie",
    });
}

initMap();
