//liri logic
// Letables for require methods---------------------------------
const twitterKeys=require("./keys.js");
const Twitter=require("twitter");
const spotify=require("node-spotify-api");
let client = new Twitter(twitterKeys);
//console.log(twitterKeys);
//console.log(client);

// -------------------------------------------------------------
//saves user data entry on the command line to a const
const userCommand = process.argv[2]
//--------------------------------------------------------------
//console.log(userCommand);
//--------------------------------------------------------------
//Processes user command and decides which code to run
switch (userCommand){
	case "my-tweets":
		//code;
		client.get('search/tweets', {q: 'jimblowman'}, function(error, tweets, response){
			if(error){
				console.log(error);
			}
			else{
				console.log(tweets);
				//console.log(response);
			}
		});
		break;
	case "spotify-this-song":
		//code
		break;
	case "movie-this":
		//code
		break;
	case "do-what-it-says":
		//cdoe;
		break;
	default:
		//code
}