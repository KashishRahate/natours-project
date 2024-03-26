/*  eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2FzaGlzaC1yYWhhdGUiLCJhIjoiY2x1NnFlZThhMjMyODJtcGQzOWRweHg5cyJ9.egDl9U4e_IX2bN3Xy7hjqA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kashish-rahate/clu6u2gbi00eb01p69eh04n90',
    scrollZoom: false,
    // center: [-118.3281236, 33.7433727],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
