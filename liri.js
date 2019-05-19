require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');

var fs = require("fs");

var command = process.argv[2];
var input = process.argv;


//using a switch/case statement 

switch (command) {
  case "concert-this":
    searchBandsintown();
    break;

  case "spotify-this-song":
    searchSpotify();
    break;

  case "movie-this":
    searchMovies();
    break;

  case "do-what-it-says":
    doIt();
    break;
}



//Spotify search 
function searchSpotify() {
  // this information was found 
  var spotify = new Spotify({
    id: ac963f821fa1455dbb656d506ea5d2ee,
    secret: d0dd627148754fe9bc0d6529d12526c8
  });

  spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);
  });
};

//function to search bands in town for events 
function searchBandsintown() {

  var bandsintown = require('bandsintown')(APP_ID);

  bandsintown
    .getArtistEventList()
    .then(function (events) {
      // return array of events
    });
}


function searchMovies() {

  var movieName = "";
  // Loop through all the words in the node argument
  // And do a little for-loop magic to handle the inclusion of "+"s
  for (var i = 3; i < input.length; i++) {

    if (i > 3 && i < input.length) {
      movieName = movieName + "+" + input[i];
    }
    else {
      movieName += input[i];

    }
  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
  );

}


function doIt() {

}
