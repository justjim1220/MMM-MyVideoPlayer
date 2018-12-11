/* Magic Mirror
 * Module: MMM-VideoPlayer
 *
 * By justjim1220
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
		height: "600px",
		width: "1066px",
		controls: "controls",

		videos: [
			{
				"id": 1,
				"name": "video_one",
				"source": "./modules/MMM-MyVideoPlayer/videos/video_one.mp4"
			},
			{
				"id": 2,
				"name": "Rx_by_Theory",
				"source": "./modules/MMM-MyVideoPlayer/videos/Rx_by_Theory.mp4"
			},
			{
				"id": 3,
				"name": "three",
				"source": "./modules/MMM-MyVideoPlayer/videos/three.mp4"
			},
			{
				"id": 4,
				"name": "fourth_video",
				"source": "./modules/MMM-MyVideoPlayer/videos/fourth_video.mp4"
			},
			{
				"id": 5,
				"name": "Hallelujah",
				"source": "./modules/MMM-MyVideoPlayer/videos/Hallelujah.mp4"
			}
		],

		showBorder: true,
		minWidth: "212px",
		minHeight: "0px",
		direction: "row",
		buttons: {
			"One": {
				text: "Video 1"
			},
			"Two": {
				text: "Video 2"
			},
			"Three": {
				text: "Video 3"
			},
			"Four": {
				text: "Video 4"
			},
			"Five": {
				text: "Video 5"
			}
		}
	},

	requiresversion: "2.1.0",

	getStyles: function () {
		return ["font-awesome.css", "MMM-MyVideoPlayer.css"];
	},

	// Override the default NotificationRecieved function
	notificationReceived: function (notification, payload, sender) {
		if (notification === "CURRENT_VIDEO") {
			this.selected = payload.to;
			this.updateDom(0);
		}
	},

	// Define start sequence.
	start: function () {
		videos = [];
		for (var i = 0, len = videos.length; i < len; i++) {
			this.current_video = this.config.videos[i];
		}
		Log.info("Starting module: " + this.name);

		//this.scheduleUpdate();

		"use strict";
	},

	// Override dom generator.
	getDom: function () {

		var wrapper = document.createElement("div");

		var menu = document.createElement("span");
		menu.className = "navigation-menu";
		menu.id = this.identifier + "_menu";
		menu.style.flexDirection = this.config.direction;

		for (var name in this.config.buttons) {
			menu.appendChild(this.createButton(this, name, this.config.buttons[name]));
		}
		wrapper.appendChild(menu);

		return wrapper;
	},

	createPlayer: function (self, name, data) {
		for (var i = 0, len = videos.length; i < len; i++) {
			var plyr = document.createElement("span");
			plyr.id = self.identifier + "_videoPlayer_" + name;
			plyr.className = "videoplayer";
			plyr.style.width = self.config.width;
			plyr.style.height = self.config.height;
			plyr.controls = self.config.controls;
			plyr.source = "src=./modules/MMM-MyVideoPlayer/videos/";
			if (notificationReceived && videos === "") {
				wrapper.classList.add("font");
				wrapper.innerHTML = "Please add videos to your config array as explained in Readme";
			} else if (notificationReceived && videos !== "") {
				wrapper.innerHTML = plyr.source + self.config.videos[i].name + ".mp4"; type = video / mp4;
			}
			wrapper.appendChild(plyr);
		}
	},

	createButton: function (self, name, data) {
		var item = document.createElement("span");
		item.id = self.identifier + "_button_" + name;
		item.className = "navigation-button";
		item.style.minWidth = self.config.minWidth;
		item.style.minHeight = self.config.minHeight;

		if (self.selected === name) {
			item.addEventListener("click", function () {
				sendSocketNotification("CURRENT_VIDEO", name);
			});
		}

		if (!self.config.showBorder) {
			item.style.borderColor = "black";
		}

		if (data.text) {
			var text = document.createElement("span");
			text.className = "navigation-text";
			text.innerHTML = data.text;
			item.appendChild(text);
		}
		return item;
	}
});


/*

 <div class="videolist">
	<nav class="vids">
		<a class="link" href="https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4">test1</a>

		<a class="link" href="https://www.quirksmode.org/html5/videos/big_buck_bunny.mp4">test2</a>

		<a class="link" href="http://www.html5videoplayer.net/videos/toystory.mp4">test3</a>

		<a class="link" href="http://download.wavetlan.com/SVV/Media/HTTP/H264/Talkinghead_Media/H264_test4_Talkingheadclipped_mp4_480x320.mp4">test4</a>

		<a class="link" href="http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test5_voice_mp4_480x360.mp4">test5</a>

		<a class="link" href="http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test7_voiceclip_mp4_480x360.mp4">test6</a>

		<a class="link" href="http://download.wavetlan.com/SVV/Media/HTTP/H264/Other_Media/H264_test8_voiceclip_mp4_480x320.mp4">test7</a>

		<a class="link" href="http://download.wavetlan.com/SVV/Media/HTTP/MP4/ConvertedFiles/Media-Convert/Unsupported/dw11222.mp4">test8</a>

		<a class="link" href="http://download.wavetlan.com/SVV/Media/HTTP/MP4/ConvertedFiles/Media-Convert/Unsupported/test7.mp4">tsest9</a>
	</nav>


if (buttons !== "") {
	for (var i = 0, len = videos.length; i < len; i++) {
	  }
	}

*/