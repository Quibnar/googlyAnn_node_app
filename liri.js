require("dotenv").config()

var Spotify = require('node-spotify-api')
var keys = require("./keys.js")
var axios = require("axios")


var spotify = new Spotify(keys.spotify);

var fun = process.argv[2]

var val

if (process.argv[3]) {
    val = process.argv[3].split().join(' ')
}
function recur() {

    switch (fun) {
        case 'concert-this':

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

            spotify.search({ type: 'track', query: val, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log("Artist: " + data.tracks.items[0].artists[0].name)
                    console.log("Song: " + data.tracks.items[0].name)
                    console.log("Preview: " + data.tracks.items[0].href)
                    console.log("Album: " + data.tracks.items[0].album.name)
                }
            });
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

            var fs = require("fs");

            fs.readFile("random.txt", "utf8", function (error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                var dat = data.split(",")
                fun = dat[0]
                val = dat[1]

                recur()

            });

            break;
        default:
    }
}

recur()