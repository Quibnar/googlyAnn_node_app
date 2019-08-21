require("dotenv").config();

var keys = require("./keys.js");
var axios = require("axios");

//var spotify = new Spotify(keys.spotify);

//console.log(spotify);

var fun = process.argv[2]
var val = process.argv[3]

switch (fun) {
    case 'concert-this':
        console.log("Get Concert " + val);

        var queryURL = "https://rest.bandsintown.com/artists/" + val + "/events?app_id=codingbootcamp";

        axios.get(queryURL).then(
            function (response) {
                //Venue Name
                console.log("Venue: " + JSON.stringify(response.data[0].venue.name));
                console.log("Country: " + JSON.stringify(response.data[0].venue.country));
                console.log("datetime: " + JSON.stringify(response.data[0].datetime));
            }
        );

        break;

    case 'spotify-this-song':
        console.log("Get Song " + val);
        //Query Spotify API
        break;
    case 'movie-this':
        console.log("Get Movie " + val);
        axios.get("http://www.omdbapi.com/?t=" + val + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log("Title: " + JSON.stringify(response.data.Title));
                console.log("Year: " + JSON.stringify(response.data.Year));
                console.log("IMDB Rating: " + JSON.stringify(response.data.imdbRating));
                console.log("Rotten Tomatoes: " + JSON.stringify(response.data.Ratings[2].Value));
                console.log("Country: " + JSON.stringify(response.data.Country));
                console.log("Plot: " + JSON.stringify(response.data.plot));
                console.log("Actors: " + JSON.stringify(response.data.Actors));
            }
        );
        break;
    case 'do-what-it-says':
        console.log("Do what you say " + val);

        break;
    default:
}