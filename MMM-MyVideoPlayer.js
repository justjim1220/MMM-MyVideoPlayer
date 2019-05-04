
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
		videoDir: "videos",
		posterDir: "posters",
		posterSize: {width:90, height:51},
		menuDirection: "row",	
		playerSize: {width:930, height:523},
		playerBackground: "MVPsplash.png",
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

	buildPosterHash: function(posters) {
		self.Hash={};		
		for(var i=0; i<posters.length; i++) {
		    var work = posters[i];
		    self.Hash[work.substring(0, work.indexOf('.'))] = work;
		}
	},


	createVideoButton: function(video, height, width) {
			let button = document.createElement("button");
			button.className = "button";
		    button.setAttribute("data-video-src", "modules/" + self.name + "/" + this.config.videoDir + "/" + video);
		    button.addEventListener("click", self.swapVideo);
		    
			let img = document.createElement("img");
			img.src = "modules/" + self.name + "/" + this.config.posterDir + "/" + self.Hash[video.substring(0, video.indexOf('.'))];
			img.width = width;
			img.height = height;
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

			//<video controls 
			let video=document.createElement("video");
				video.width = self.config.playerSize.width;
				video.height = self.config.playerSize.height;
				video.id = "player";
				video.poster = "modules/" + this.name + "/" + self.config.playerBackground;
				video.addEventListener("ended", function() {
					video.load();
					video.controls = false;
				});
				self.player = video;
			wrapper.appendChild(video);
			let videoselect = document.createElement("div");
			   videoselect.id = "videoSelect";
			wrapper.appendChild(videoselect);
	     		for(var i=0; i<self.videos.length ;i++){
			   videoselect.appendChild(this.createVideoButton(self.videos[i], self.config.posterSize.height, self.config.posterSize.width, video));
			}

			console.log(wrapper.innerHTML);
		}
		return wrapper;
		
	},

	swapVideo: function () {
		Log.log("in handler for button="+this.getAttribute("data-video-src"));
		self.player.src = this.getAttribute("data-video-src");
		self.player.load();
		self.player.controls = true;
		self.player.play();
	},
});
