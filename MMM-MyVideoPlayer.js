
/* Magic Mirror
 * Module: MMM-VideoPlayer
 *
 * By justjim1220 (Jim Hallock)
 * justjim1220@gmail.com
 *
 * MIT Licensed.
 *
 * Brought to you by the makers of Cheyenne Cigars
 * and my very own homemade Southern Sweet Tea.
*/
var modulename="MMM-MyVideoPlayer";

Module.register(modulename, {
	// Default module config.
	defaults: {
		initialLoadDelay: 5150,
		videoDir: "videos",  // optional
		posterDir: "posters",// optional
		posterSize: {width:75,height:42},
		menuDirection: "row",    // optional, menu direction	
		playerSize: {width:720,height:405},
	},

	self:null,
	player:null,
	videos:null,
	posters:null,


	requiresversion: "2.1.0",

	getStyles: function () {
		return ["MMM-MyVideoPlayer.css"];
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);
		self=this;
		"use strict";
		self.sendSocketNotification("CONFIG",self.config);
		self.getVideos();
		self.getPosters();
	},

	getVideos: function () {
		this.sendSocketNotification("GET_VIDEOS");
	},
	getPosters: function () {
		this.sendSocketNotification("GET_POSTERS");
	},

	socketNotificationReceived: function (notification, payload) {
		Log.log("notification recxeived="+notification);
		if (notification === "BUTTON_PRESSED") {
			this.processInfo(payload);
		}
		else if(notification=="Videos"){
		     this.videos=payload;
		     Log.log("videos files"+this.videos);
		}
		else if(notification=="Posters"){
		     this.posters=payload
		     Log.log("posters files"+this.posters);
		     self.updateDom(self.config.initialLoadDelay);
		}
		
	},

	createVideoButton: function(poster,video, height, width){
		/* create an object like this 
		<button data-video-src="modules/MMM-MyVideoPlayer/videos/one.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/one.jpg" width="75" height="42"></button>
		*/
	        let button=document.createElement("button");
		    button.setAttribute("data-video-src","modules/"+modulename+"/"+this.config.videoDir+"/"+video);
		    //button.class="button";
	            let img=document.createElement("img");
			/*you will need to add soem function here to make sure that the right image is selected for the video.
			i might create a hastable of the file name ('eight', and the file+ext ('eight.png')
			and then lookup in the hash using the video filename ('eight') to get the matching image */
			img.src="modules/"+modulename+"/"+this.config.posterDir+"/"+poster;
			img.width=self.config.posterSize.width;
			img.height=self.config.posterSize.height;
			button.appendChild(img);
		return button;
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		if(self.videos!=null){

		var menu = document.createElement("span");
		menu.className = "navMenu";
		menu.id = this.identifier + "_menu";
		menu.style.flexDirection = this.config.direction;
		wrapper.appendChild(menu);

		let video=document.createElement("video");
			video.width=self.config.playerSize.width;
			video.height=self.config.playerSize.height;
			video.id="player";
			video.poster=poster="modules/"+modulename+"/MM2splash.png";
			video.setAttribute("controls","true");
		wrapper.appendChild(video);
			//<video controls 
		let videoselect=document.createElement("div");
		   videoselect.id="videoSelect";
		wrapper.appendChild(videoselect);

     		for(var i=0;i<self.videos.length;i++){
		   videoselect.appendChild(this.createVideoButton(self.posters[i],self.videos[i], "75","42",));
		}
		
		/*wrapper.innerHTML = '<video controls poster="modules/MMM-MyVideoPlayer/posters/MM2splash.png" width='720' height="405" id="player"></video>
			
			 <div id="videoSelect">
				<button data-video-src="modules/MMM-MyVideoPlayer/videos/one.mp4" class=>"button"
					<img src="modules/MMM-MyVideoPlayer/posters/one.jpg" width="75" height="42"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/two.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/two.jpg" width="75" height="42"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/three.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/three.jpg" width="75" height="42"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/four.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/four.jpg" width="75" height="42"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/five.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/five.jpg" width="75" height="42"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/six.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/six.jpg" width="75" height="42"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/seven.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/seven.jpg" width="75" height="42"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/eight.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/eight.jpg" width="75" height="42"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/nine.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/nine.jpg" width="75" height="42"></button>
			</div>`;
		*/
		console.log(wrapper.innerHTML);
		// set a timer for 1 second from now to cehck for and add handlers for all our buttons
		setTimeout(this.addHandlers, 1000);
		}
		return wrapper;
		
	},

	swapVideo: function (button) {
		Log.log("in handler for button="+this.getAttribute("data-video-src"));
		self.player.src = this.getAttribute("data-video-src");
		self.player.load();
		self.player.play();
	},

	addHandlers: function() {
		Log.log("add Handlers called");
		// get the player object from the dom
		self.player = document.getElementById("player");

		// if present
		if(self.player != null)
		{
			//get all the buttons in the object
			var videoPlayButtons =document.getElementById("videoSelect").querySelectorAll("button");
						// set the click handler for the buttons
			for (var i = 0; i < videoPlayButtons.length; i++) {
				Log.log("adding button click handlers now");
				videoPlayButtons[i].addEventListener("click", self.swapVideo);
			}
			//var video = document.getElementById("player");
			player.addEventListener("ended", function () {
				video.load();
				video.controls = false;
			});
		}

		// not found, wait a little more
		else {
			Log.log("restarting timer");
			setTimeout(self.addHandlers,1000)
		}

		//video ended event

	},
});
