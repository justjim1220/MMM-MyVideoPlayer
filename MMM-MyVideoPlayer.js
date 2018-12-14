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
		showBorder: true,
		minWidth: "212px",
		minHeight: "50px",
		direction: "row",
	},

	requiresversion: "2.1.0",

	getStyles: function () {
		return ["MMM-MyVideoPlayer.css"];
	},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		"use strict";
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");

		wrapper.innerHTML = `<video class='controls' height='675' width='1200' id="player"></video>
			<div id="videoSelect">
				<button data-video-src="modules/MMM-MyVideoPlayer/videos/video_one.mp4" class="button">Video 1</button>
				<button data-video-src="modules/MMM-MyVideoPlayer/videos/two.mp4" class="button">Video 2</button>
				<button data-video-src="modules/MMM-MyVideoPlayer/videos/3.mp4" class="button">Video 3</button>
				<button data-video-src="modules/MMM-MyVideoPlayer/videos/fourth_video.mp4" class="button">Video 4</button>
				<button data-video-src="modules/MMM-MyVideoPlayer/videos/Rx_by_Theory.mp4" class="button">Video 5</button>
			</div>`;

		console.log(wrapper.innerHTML);

		function swapVideo() {
			player.src = this.getAttribute("data-video-src");
			player.load();
			player.play();
		}

		var videoPlayButtons = document.querySelectorAll("button"),
			player = document.getElementById("player");

		for (var i = 0; i < videoPlayButtons.length; i++) {
			videoPlayButtons[i].addEventListener("click", swapVideo);
		}

		var menu = document.createElement("span");
		menu.className = "navMenu";
		menu.id = this.identifier + "_menu";
		menu.style.flexDirection = this.config.direction;

		return wrapper;
	},
});
