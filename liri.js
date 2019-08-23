// Read and set environment variables
require("dotenv").config();

// node packages
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
moment().format();
var fs = require('fs');

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
userInputs(action, inputParameter);

// Functions
function userInputs (action, inputParameter) {
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
        case 'do-what-it-says';
            showSomeInfo();
            break;
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
                    console.log("Event recorded");
                });
            }
        });
    }
}


// Function for music info: Spotify
function showSongInfo(inputParameter) {
    if(inputParameter === "") {
        inputParameter = "The Sign Ace of Base";
    }
    spotify.search({ 
        type: "track",
        query: inputParameter,
    },
    function(err, data) {
        if(err) {
            return console.log("Get better taste in music - your song is too obscure");
        }
        var results = data.tracks.item[0];
        var artist = results.artists[0].name;
        var name = results.name;
        var preview = results.preview_url;
        var album = results.album.name;
        var output = "\nArtist: " + artist + "\nSong Name: " + name + "\nPreview Link: " + preview + "\nAlbum: " + album;
        console.log(output);
        fs.appendFile("log.txt", output, "utf-8", function(err) {
            if(err) {
                console.log("An error ocurred");
            }
            console.log("Song recorded")
        })
    })
}


// Function for movie info: OMDBi
function showMovieInfo(inputParameter) {
    if (inputParameter === undefined) {
        inputParameter = "Mr Nobody"
        console.log("-------------------");
        console.log("If you haven't watched 'Mr. Nobody', then you should: http://www.imdb.com/title/tt0485947");
        console.log("It's on Netflix");
    }
    var queryURL = "http://www.omdbapi.com/?i=tt3896198&apikey=9d11b2c1"
    axios.get(queryURL)
    .then(function(response) {
       console.log(response.data.Title);
       results = response.data;
       var title = results.Title;
       var year = results.Year;
       ratingsArr = results.Ratings;
       var IMDB = ratingsArr;
        .filter(function(item) {
            return item.Source === "Internet Movie Database";
        })
        .map(function(item) {
            return item.Value.toString();
        });
    RT = RT.toString();
    country = results.Country;
    language = results.Language;
    plot = results.Plot;
    actors = results.Actors;
    var output = "\nTitle: " + title + "\nYear: " + year + "\nIMDB Rating: " + IMDB + "\nRotten Tomatoes Rating: " + RT + "\nCountry: " + country + "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors;
    console.log(output);
    fs.appendFile("log.txt", output, "utf-8", function(err) {
        if(err) {
            console.log("An error occurred");
        }
        console.log("Movie recorded");
    })
    })
}   

// Function for reading out of random.txt file
function showSomeInfo() {
    fs.readFile("./random.txt", "utf-8", function(err, data) {
        if(err) {
            console.log("An error occurred");
        }
        (command = data.substring(0, data.indexOf(","))),
            (userInputs = data.substring(data.indexOf(",") + 2, data.length - 1));
        userInputs();
    })
}