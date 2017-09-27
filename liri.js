//liri logic
// Letables for require methods---------------------------------
const twitterKeys=require("./keys.js").twitterKeys;
const spotifyKeys=require("./keys.js").spotifyKeys;
const Twitter=require("twitter");
const request=require('request');
const Spotify=require("node-spotify-api");
let client = new Twitter(twitterKeys);
//console.log(twitterKeys);
//console.log(client);

// -------------------------------------------------------------
//saves user data entry on the command line to a const
const userCommand = process.argv[2]; //returns what command the user wants to impement
const userSel = function(){//function returns what the user enters as an argurment for their command
	let userString="";
	for(i=3;i<process.argv.length;i++){
		userString+=(process.argv[i]+" ");
	}
	return userString.trim();
};
//--------------------------------------------------------------
//console.log(userCommand);
//--------------------------------------------------------------
//Processes user command and decides which code to run
switch (userCommand){
	case "my-tweets":
		//code;
		console.log("Searching for my tweets...");
		client.get('search/tweets', {q: 'jimblowman'}, function(error, tweets, response){
			if(error){
				console.log(error);
			}
			else{
				console.log("My Tweets:");
				for(i=0;i<tweets.statuses.length;i++)
				console.log('------------------------------------------------------------\nThis Tweet posted: '+tweets.statuses[i].created_at+'\nThis Tweet read: '+tweets.statuses[i].text);
				//console.log(response);
			};
		});
		break;
	case "spotify-this-song":
		//code
		let songString = userSel();
		if(songString!=""){
			console.log("Searching for your song...");
			//code for spotify call
			let spotify = new Spotify(spotifyKeys);
			spotify.search({type: 'track', query: songString, limit:1}).then(function(response){
				console.log('The artists name(s): '+response.tracks.items[0].artists[0].name+'\nSong Title: '+response.tracks.items[0].name+'\nPreview Link: '+response.tracks.items[0].preview_url+'\nAlbum: '+response.tracks.items[0].album.name);
			}).catch(function(error){
				console.log("I'm sorry, due to an error your request can not be completed"+'\n'+error);
			});
		}
		else{console.log("I'm sorry, you must enter a choice if you would like to return results")};
		break;
	case "movie-this":
		//code
		let movieString = userSel();
		if(movieString!=""){
			console.log("Searching for your movie...");
			//code for spotify call
			request("http://www.omdbapi.com/?t="+movieString+"&y=&plot=short&apikey=40e9cece", (error,response,body)=>{
				if(!error&&response.statusCode===200){//Checking for successfull communication
					const movieData=JSON.parse(body);//Forming useful data structure
					if(movieData.Title!==undefined){//Testing for title existence
						/*console.log(movieData);*/
						console.log('Title: '+movieData.Title+'\nReleased: '+movieData.Released+'\nIMDB Rating: '+movieData.imdbRating+'\nRotten Tomatoes: '+movieData.Ratings[1].value+'\nProduced in: '+movieData.Country+'\nMovie Language: '+movieData.Language+'\nPlot: '+movieData.Plot+'\nActors: '+movieData.Actors);
					// console.log(JSONParse.Title+" was released on "+JSONParse.Released);//Providing title and release date
				 	}
					else{
						console.log("No movie by that name was found");//Providing message about movie not found
					};
				}
				else{
					console.log("I'm sorry, due to an error your request can not be completed"+'\n'+error);
				};
			});
		}
		else{
			console.log("You'll probably enjoy this movie: ")

		};
		break;
	case "do-what-it-says":
		//cdoe;
		break;
	default:
		//code
}