//liri logic
//-------------------------------------Consts for require methods and user inputs---------------------------------
const twitterKeys=require("./keys.js").twitterKeys;
const spotifyKeys=require("./keys.js").spotifyKeys;
const Twitter=require("twitter");
const request=require('request');
const Spotify=require("node-spotify-api");
const fs=require('file-system');
const client = new Twitter(twitterKeys);
// --------------------------------------------------------------Functions----------------------------------------
//function returns what the user enters as an argurment for their command
function userSel(){
	let userString="";
	for(i=3;i<process.argv.length;i++){
		userString+=(process.argv[i]+" ");
	}
	return userString.trim();
};

//function processes user command and decides which code to run
function run(userCommand, userSel){
	fs.appendFile("log.txt", '||User Values: '+userCommand+" "+userSel);//log user commands
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
			let songString = userSel;
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
			let movieString = userSel;
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
			//code;
			function readFile(){
				fs.readFile("random.txt", "utf8", function(err, data){
					if (err){
						return console.log(err);
					}
					else{
						var array = data.split(',');
						run(array[0], array[1]); //passes arguments to run function based on parsing the array			
					};
				});
			};
			readFile();
			break;
		default:
			console.log("This is not a valid command. Please try again");
	};
};

//-----------------------------------------------------------RunTime-------------------------------------------------------------

const userCommand = process.argv[2]; //returns what command the user wants to implement to a userCommand variable
run(userCommand, userSel()); //runs processing of user commands by passing userCommand as an argument and userSel() function which returns a value as an argument