// Read and set environment variables
require("dotenv").config();

// NPM
var axios = require('axios');




// var to capture user inputs
var action = process.argv[2];
var nodeArgs = process.argv;
var inputParameter = "";

for (var i = 2; i < nodeArgs.length; i++) {

    if (i > 2 && i < nodeArgs.length) {
      inputParameter = inputParameter + "+" + nodeArgs[i];
    } else {
      inputParameter += nodeArgs[i];
    }
  }

// Execute function
UserInputs(action, inputParameter);

// Functions
function UserInputs (action, inputParameter) {
    switch(action) {
        case 'concert-this':
            showConcertInfo(inputParameter);
            break;
        // case 'spotify-this-song':
        //     showSongInfo(inputParameter);
        //     break;
        // case 'movie-this':
        //     showMovieInfo(inputParameter);
        //     break;
        // case 'do-what-it-says';
        //     showSomeInfo();
        //     break;
        default:
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }
}

// Function for concert info: BandsInTown
function showConcertInfo(inputParameter) {
    var queryURL = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
    console.log(queryURL);
    axios.get(queryURL)
    .then(function(response) {
        console.log("Venue name: " + response);
        // console.log("Venue location: " + venue.city);
        // console.log("Event date: " + datetime);
    })
    .catch(function(error) {
        console.log(error);
    })
}

// Function for music info: Spotify



// Function for movie info: OMDBi