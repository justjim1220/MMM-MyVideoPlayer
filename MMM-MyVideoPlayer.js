
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
		initialLoadDelay: 5150
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

	getInfo: function () {
		this.sendSocketNotification("GET_VIDEO");
	},

	socketNotificationReceived: function (notification, payload) {
		if (notification === "BUTTON_PRESSED") {
			this.processInfo(payload);
		}
		this.updateDom(this.config.initialLoadDelay);
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		var menu = document.createElement("span");
		menu.className = "navMenu";
		menu.id = this.identifier + "_menu";
		menu.style.flexDirection = this.config.direction;

		// set a timer for 1 second from now to cehck for and add handlers for all our buttons
		setTimeout(this.addHandlers, 1000);

		wrapper.innerHTML = `<video controls poster="modules/MMM-MyVideoPlayer/posters/MM2splash.png" width='720' height="405" id="player"></video>
			<div id="videoSelect">
				<button data-video-src="modules/MMM-MyVideoPlayer/videos/one.mp4" class="button">
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

		console.log(wrapper.innerHTML);

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
		}

		// not found, wait a little more
		else {
			Log.log("restarting timer");
			setTimeout(self.addHandlers,1000)
		}

		//video ended event
		var video = document.querySelector("video");
		video.addEventListener("ended", function () {
			video.load();
			video.controls = false;
		});
	},
});