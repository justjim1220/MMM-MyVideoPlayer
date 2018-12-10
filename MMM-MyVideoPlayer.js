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
		initialLoadDelay: 6250,

		videos: ["video_one", "Rx_by_Theory", "3", "fourth_video", "Hallelujah"],

		showBorder: true,
		minWidth: "212px",
		minHeight: "50px",
		direction: "row",
		buttons: {
			"video_one": {
				text: "Video 1"
			},
			"Rx_by_Theory": {
				text: "Video 2"
			},
			"3": {
				text: "Video 3"
			},
			"fourth_video": {
				text: "Video 4"
			},
			"Hallelujah": {
				text: "Video 5"
			}
		}
	},

	requiresversion: "2.1.0",

	getStyles: function () {
		return ["MMM-MyVideoPlayer.css"];
	},

	// Override the default NotificationRecieved function
	// notificationReceived: function(notification, payload, sender) {
	//	if (notification === "CHANGED_VIDEO") {
	//	  this.selected = payload.to;
	//	  this.updateDom(0);
	//	}
	//},

	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);

		//this.scheduleUpdate();

		"use strict";
	},

	// Override dom generator.
	getDom: function () {
		var wrapper = document.createElement("div");

		var videos = this.config.videos;

		if (videos == "") {
			wrapper.classList.add("font");
			wrapper.innerHTML = "Please add videos to your config array as explained in Readme";
		} else if (videos != "") {
			wrapper.innerHTML = `<video controls height='600' width='1066' id="video"><source src="file:///E:/MagicMirror-test/modules/MMM-MyVideoPlayer/videos/${videos}.mp4" type="video/mp4"></video>`;
		}
		console.log(wrapper.innerHTML);

		var menu = document.createElement("span");
		menu.className = "navMenu";
		menu.id = this.identifier + "_menu";
		menu.style.flexDirection = this.config.direction;

		for (var name in this.config.buttons) {
			menu.appendChild(this.createButton(this, name, this.config.buttons[name]));
		}
		wrapper.appendChild(menu);

		return wrapper;
	},

	createButton: function (self, name, data) {
		var item = document.createElement("span");
		item.id = self.identifier + "_button_" + name;
		item.className = "navBtn";
		item.style.minWidth = self.config.minWidth;
		item.style.minHeight = self.config.minHeight;
		item.style.flexDirection = self.config.direction;

		item.addEventListener("play", function() {
			item.play();
		}, false);

		if (self.selected === name) {
			item.onclick = function() {
				item.play();
				item.pause();
				item.controls="controls";
			}
		}

		if (!self.config.showBorder) {
			item.style.borderColor = "black";
		}

		if (data.text) {
			var text = document.createElement("span");
			text.className = "navText";
			text.innerHTML = data.text;

			item.appendChild(text);
		}
		return item;
	}
});