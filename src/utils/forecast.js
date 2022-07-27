const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d6598ad5eb1abbb475e35884f805c26b&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to process you weather request", undefined);
    } else if (body.error) {
      callback("Enter a Valid lat and long", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". the temperature is: " +
          body.current.temperature +
          " degrees out but it feels like: " +
          body.current.feelslike +
          " degrees out"
      );
    }
  });
};

module.exports = forecast;
