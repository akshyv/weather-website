const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//define path for express configs

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup hbs (handlebars and view location)
app.set("view engine", "hbs");
app.set("views", viewsPath); //if the folder name is views hbs takes that file directly we can skip line 8 and 12
hbs.registerPartials(partialsPath);

// setup static directory to setup
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ak",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "This is help message",
    name: "Ak",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some help",
    title: "Help",
    name: "Ak",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error);
      }

      res.send({
        forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMessage: "Help article not found",
    name: "Akshy3",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: 404,
    errorMessage: "Page not found",
    name: "Akshy4",
  });
});

app.listen(port, () => {
  console.log(`Server is up on the port ${port}`);
});
