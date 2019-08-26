var spotifyAPI = require("node-spotify-api");
require('dotenv').config();

var spotify = new spotifyAPI({
    id: process.env.ClIENT_ID,
    secret: process.env.ClIENT_SECRET,
});




//Spotify song search 

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

const choose = function(caseData, functionData){
    switch(caseData){
        case 'my-movie' : getMovie(); break;
        case 'spotify_song': getSpotifySong(functionData); break;
        default: console.log ("LiriBot cannot help you with that");
    }
}

const runIt = function (argumentOne, argumentTwo){
    choose (argumentOne, argumentTwo);
};

runIt(process.argv[2], process.argv[3]);