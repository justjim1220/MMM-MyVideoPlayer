
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


Module.register("MMM-MyVideoPlayer", {
	// Default module config.
	defaults: {
		initialLoadDelay: 5150,
		videoDir: "videos",  // optional
		posterDir: "posters",// optional
		posterSize: {width:75,height:42},
		menuDirection: "row",    // optional, menu direction	
		playerSize: {width:720,height:405},
		playerBackground:"MM2splash.png",
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
		Log.log("notification received="+notification);
		if (notification === "BUTTON_PRESSED") {
			this.processInfo(payload);
		}
		else if(notification=="Videos"){
		     this.videos=payload;
		     if(this.videos!=null){
		     	Log.log("videos files="+this.videos);
		     }
		     else
			Log.error("===>no video filenames returned, check the videosDir config entry");
		}
		else if(notification=="Posters"){
		     this.posters=payload
		     if(self.posters!=null){
			     Log.log("posters files="+this.posters);
			     self.buildPosterHash(this.posters);
			     self.updateDom(self.config.initialLoadDelay);
		     }
		     else
			Log.error("===>no video icon filenames returned, check the postersDir config entry");
		}
		
	},

	buildPosterHash: function(posters){
		self.Hash={};		
		for(var i=0;i<posters.length;i++){
		    var work=posters[i];
		    self.Hash[work.substring(0,work.indexOf('.'))]=work;
		}
	},


	createVideoButton: function(video, height, width){
		/* create an object like this 
		<button data-video-src="modules/MMM-MyVideoPlayer/videos/one.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/one.jpg" width="75" height="42"></button>
		*/
	        let button=document.createElement("button");
		    button.setAttribute("data-video-src","modules/"+self.name+"/"+this.config.videoDir+"/"+video);
		    button.addEventListener("click", self.swapVideo);
		    
		    //button.class="button";
	            let img=document.createElement("img");
			/*you will need to add some function here to organize the videos buttons in some order */

			img.src="modules/"+self.name+"/"+this.config.posterDir+"/"+self.Hash[video.substring(0,video.indexOf('.'))];
			img.width=width;
			img.height=height;
		    button.appendChild(img);
		return button;
	},


	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		// donn't do anything if video list not returned yet
		if(self.videos!=null){

			var menu = document.createElement("span");
			menu.className = "navMenu";
			menu.id = this.identifier + "_menu";
			menu.style.flexDirection = this.config.direction;
			wrapper.appendChild(menu);
				//<video controls 
			let video=document.createElement("video");
				video.width=self.config.playerSize.width;
				video.height=self.config.playerSize.height;
				video.id="player";
				video.poster="modules/"+this.name+"/"+self.config.playerBackground;
				video.addEventListener("ended", function () {
					video.load();
					video.controls = false;
				});
				self.player=video;
			wrapper.appendChild(video);
				// <div id="videoSelect">
			let videoselect=document.createElement("div");
			   videoselect.id="videoSelect";
			wrapper.appendChild(videoselect);
				//<button data-video-src="modules/MMM-MyVideoPlayer/videos/one.mp4" class=>"button"
				//		<img src="modules/MMM-MyVideoPlayer/posters/one.jpg" width="75" height="42"></button>
	     		for(var i=0;i<self.videos.length;i++){
			   videoselect.appendChild(this.createVideoButton(self.videos[i],self.config.posterSize.height, self.config.posterSize.width,video));
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
			// set a timer for 1 second from now to check for and add handlers for all our buttons
	// no longer needed.. handlers set in button create method
			//setTimeout(this.addHandlers, 1000);
		}
		return wrapper;
		
	},

	swapVideo: function () {
		Log.log("in handler for button="+this.getAttribute("data-video-src"));
		self.player.src = this.getAttribute("data-video-src");
		self.player.load();
		self.player.controls=true;
		self.player.play();
	},

	/*addHandlers: function() {
	// no longer needed 
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

	},*/
});
