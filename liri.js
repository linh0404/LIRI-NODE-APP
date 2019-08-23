// Read and set environment variables
require("dotenv").config();

// NPM
var axios = require('axios');
var moment = require("moment");
moment().format();
var fs = require("fs");



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
        case 'spotify-this-song':
            showSongInfo(inputParameter);
            break;
        case 'movie-this':
            showMovieInfo(inputParameter);
            break;
        // case 'do-what-it-says';
        //     showSomeInfo();
        //     break;
        default:
            console.log("Invalid Option. Please type any of the following options: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says");
    }
}

// Function for concert info: BandsInTown
function showConcertInfo(inputParameter) {
    if (inputParameter === "") {
        console.log("What do you want to look up?");
    } else {
        var queryURL = "https://rest.bandsintown.com/artists/" + inputParameter + "/events?app_id=codingbootcamp";
        console.log(queryURL);
        axios.get(queryURL)
        .then(function(response) {
            var results = response.data;
            for (i = 0; i < results.length; i++) {
                var venue = results[i].venue.name;
                if (results[i].venue.city === "Australia") {
                    var location = results[i].venue.city + ", " + results[i].venue.location;
                } else {
                    results[i].venue.city + ", " + results[i].venue.country;
                }
                var date = moment(results[1].datetime);
                date = date.format("DD/MM/YY");
                var output = "\nVenue: " + venue + "\nLocation: " + location + "\nDate: " + date;
                console.log(output);
                fs.appendFile("log.txt", output, "utf-8", function(err) {
                    if(err) {
                        console.log("An error ocurred");
                    }
                    console.log("Results recorded");
                });
            }
        });
    }
}


// // Function for music info: Spotify
// function showSongInfo(inputParameter) {

// }


// // Function for movie info: OMDBi
// function showMovieInfo(inputParameter) {
//     if (inputParameter === undefined) {
//         inputParameter = "Mr Nobody"
//         console.log("-------------------");
//         console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947");
//         console.log("It's on Netflix");
//     }
//     var queryURL = "http://www.omdbapi.com/?i=tt3896198&apikey=9d11b2c1"
//     axios.get(queryURL)
//     .then(function(response) {
//         console.log("Title: " + movies.Title);
//     })
// }   else {
//     console.log("Error occurred");
// }

// // Function for reading out of random.txt file
// function showSomeInfo() {
    
// }