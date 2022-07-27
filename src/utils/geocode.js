const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWtuYSIsImEiOiJja3BwOXp3dGIwMDA0MndvMXlnMmRqbDNjIn0.mCGkfa28qKOKMQQgy3xm9Q&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to process you geo map request", undefined);
    } else if (body.features.length === 0) {
      callback("Enter a Valid location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
