//Requirements
require('dotenv').config();
const spotifyAPI = require("node-spotify-api");
const request = require('request');

/////////////////////////////////////////////////////     MOVIE SEARCH SECTION     /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const apikey = process.env.OMDB_APIKEY;

const getMovie = function(filmName) {
  request("http://www.omdbapi.com/?t=" + filmName + "&y=&plot=short&apikey=" + apikey, function(error, response, body){
    if (!error && response.statusCode == 200) {
      const jsonData = JSON.parse(body);
      console.log("Title: " + jsonData.Title);
      console.log("Release Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log('\n------------------------------\n')


    }
  });
}

/////////////////////////////////////////////////////     SPOTIFY SONG SECTION     /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var spotify = new spotifyAPI({
    id: process.env.ClIENT_ID,
    secret: process.env.ClIENT_SECRET,
});

const getArtist = function (artist){
    return artist.name;
}

const getSpotifySong = function (song) {

    spotify.search({ type: 'track', query: song}, function (err, data) {
        if (err) {
            console.log("Error occurred: " + err);
            return;
        }
        // console.log(data.tracks.items[0]);
        const songs = data.tracks.items;
        for (let i=0; i<songs.length; i++){
            console.log(i);
            console.log('Artist: ' + songs[i].artists.map(getArtist));
            console.log('Song name: ' + songs[i].name);
            console.log('Preview song: ' + songs[i].preview_url);
            console.log('Album: ' + songs[i].album.name);
            console.log('\n------------------------------\n')
        }
    });
    
}


///////////////////////////////////////////////////     SWITCH STATEMENT SECTION     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const choose = function(caseData, functionData){
    switch(caseData){
        case 'get-movie' : getMovie(functionData); break;
        case 'get-song': getSpotifySong(functionData); break;
        default: console.log ("LiriBot cannot help you with that");
    }
}

const runIt = function (argumentOne, argumentTwo){
    choose (argumentOne, argumentTwo);
};

runIt(process.argv[2], process.argv[3]);