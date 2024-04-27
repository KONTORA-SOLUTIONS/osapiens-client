export function downloadImage(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function calculateArea(map, zoom, width, height) {
  const EARTH_CIRCUMFERENCE = 40075000; // in meters
  const latitude = map.current.getCenter().lat; // Assuming you can get latitude like this
  const radians = latitude * (Math.PI / 180);

  const resolution =
    (EARTH_CIRCUMFERENCE * Math.cos(radians)) / (256 * Math.pow(2, zoom));
  const visibleWidth = resolution * width;
  const visibleHeight = resolution * height;

  return visibleWidth * visibleHeight; // returns area in square meters
}

export function getEdgeCoordinates(
  centerLat,
  centerLng,
  zoom,
  mapWidth = 512,
  mapHeight = 512
) {
  const EARTH_RADIUS = 6378137; // in meters
  const EARTH_CIRCUMFERENCE = 2 * Math.PI * EARTH_RADIUS;
  const radians = centerLat * (Math.PI / 180);
  const resolution =
    (EARTH_CIRCUMFERENCE * Math.cos(radians)) / (256 * Math.pow(2, zoom));

  const deltaX = (mapWidth / 2) * resolution;
  const deltaY = (mapHeight / 2) * resolution;

  // Using the haversine formula or similar to calculate the new latitude and longitude
  const latitudeChange = deltaY / EARTH_RADIUS;
  const longitudeChange =
    deltaX / (EARTH_RADIUS * Math.cos((Math.PI * centerLat) / 180));

  const north = centerLat + (latitudeChange * 180) / Math.PI;
  const south = centerLat - (latitudeChange * 180) / Math.PI;
  const east = centerLng + (longitudeChange * 180) / Math.PI;
  const west = centerLng - (longitudeChange * 180) / Math.PI;

  return {
    north,
    south,
    east,
    west,
  };
}
