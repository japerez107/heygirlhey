require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require('moment');

var fs = require("fs");

var command = process.argv[2];
var input = process.argv;


//switch/case statement

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


//search movies function 

function searchMovies() {

  var movieName = "";

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
//function to search bands in town for events 
function searchBandsintown() {

  //using similar code to search movies
  var bandName = "";

  for (var i = 3; i < input.length; i++) {

    if (i > 3 && i < input.length) {
      bandName = bandName + "+" + input[i];
    }
    else {
      bandName += input[i];
    }
  }
  var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp";

  console.log(queryURL);

  axios.get(queryURL)
    .then(function (events) {
      console.log("Venue: " + events.data[0].venue.name);
      console.log("Location: " + events.data[0].venue.city);
      console.log("Date: " + moment(events.data[0].datetime).format('MM/DD/YYYY'));

    });
}

//Spotify search 
function searchSpotify() {

  // this information was found from npm 
  var spotify = new Spotify( keys.spotify
  //   id: keys.spotify["spotify"].id,
  //   secret: keys.spotify["spotify"].secret
  // }
  );
  // var spotify = new Spotify(keys.spotifyKeys);

  //using similar code to what i used in search movie 
  var songName = "";

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {

      // for (var i = 3; i < input.length; i++) {

      //   if (i > 3 && i < input.length) {
      //     songName = songName + "+" + input[i];
      //   }
      //   else {
      //     songName += input[i];

      //   }
      // }
      console.log("Artist: " + songName.tracks.items[0].artists[0].name);
      console.log("Song: " + songName.tracks.items[0].name);
      console.log("URL: " + songName.tracks.items[0].preview_url);
      console.log("Album: " + songName.tracks.items[0].album.name);
    }

    else {
      return console.log('Error occurred: ' + err);
    }

    // console.log("Artist: " + songName.tracks.items[0].artists[0].name);
    // console.log("Song: " + songName.tracks.items[0].name);
    // console.log("URL: " + songName.tracks.items[0].preview_url);
    // console.log("Album: " + songName.tracks.items[0].album.name);
  });
};



function doIt() {

  //looked at inclass assignemt read example
  fs.readFile("random.txt", "utf8", function (error, data) {

    if (error) {
      return console.log(error);
    }

    var text = data.split(",")

    for (var i = 0; i < text.length; i++) {
    console.log(text[i]);
    }

  });

}
