
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
		showBorder: true
	},

	self:null,
	player:null,

	requiresversion: "2.1.0",

	getStyles: function () {
		return ["MMM-MyVideoPlayer.css"];
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);
		self=this;
		"use strict";
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		wrapper.innerHTML = `<video controls poster="modules/MMM-MyVideoPlayer/posters/MM2splash.png" width='1200' height="675" id="player"></video>
			<div id="videoSelect">
				<button data-video-src="modules/MMM-MyVideoPlayer/videos/video_one.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/one.jpg" width="234" height="132"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/two.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/two.jpg" width="234" height="132"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/3.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/three.jpg" width="234" height="132"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/fourth_video.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/four.jpg" width="234" height="132"></button>

				<button data-video-src="modules/MMM-MyVideoPlayer/videos/Rx_by_Theory.mp4" class="button">
					<img src="modules/MMM-MyVideoPlayer/posters/five.jpg" width="234" height="132"></button>
			</div>`;

		console.log(wrapper.innerHTML);

		var menu = document.createElement("span");
		menu.className = "navMenu";
		menu.id = this.identifier + "_menu";
		menu.style.flexDirection = this.config.direction;

		// set a timer for 1 second from now to cehck for and add handlers for all our buttons
		setTimeout(this.addHandlers, 1000);

		return wrapper;
	},
	swapVideo: function (button) {
		Log.log("in handler for button="+this.getAttribute("data-video-src"));
		self.player.src = this.getAttribute("data-video-src");
		self.player.load();
		self.player.play();
	},

	addHandlers: function () {
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
		}
		// not found, wait a little more
		else {
			Log.log("restarting timer");
			setTimeout(self.addHandlers,1000)
		}

	},

});