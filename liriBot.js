const axios = require("axios");
require('dotenv').config();
// console.log(process.env);

const argument = process.argv;

let movie = "";


for (let i = 2; i < argument.length; i++) {

  if (i > 2 && i < argument.length) {
    movie = movie + "+" + argument[i];
  }
  else {
    movie += argument[i];

  }
}

const apikey = process.env.OMDB_APIKEY;
const queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + apikey;

console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("Rated: " + response.data.Rated);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
    console.log("IMDB Rating: " + response.data.imdbRating);
  }
);

//Spotify 
// const require = ("node-spotify-api");

// const spotify = new Spofity ({
//     id: "spotify api id",
//     secret: "spotify client secret"
// });

// spotify.request("")