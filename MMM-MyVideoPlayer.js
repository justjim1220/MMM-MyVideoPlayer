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
    videos: [""],
  },

  requiresversion: "2.1.0",

  getStyles: function() {
    return ["MMM-MyVideoPlayer.css"];
  },

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
    videos = videos[Math.floor(Math.random() * videos.length)];

    if (videos == "") {
      wrapper.classList.add("font");
      wrapper.innerHTML = "Please add videos to your config array as explained in Readme";
    } else if (videos != "") {
      wrapper.innerHTML = `<video controls height='1200' id="video"><source src="modules/MMM-MyVideoPlayer/videos/${videos}.mp4" type="video/mp4"></video>`;
    }
    console.log(wrapper.innerHTML);

    return wrapper;
  },

  /*
  getInfo: function() {
      this.sendSocketNotification('GET_INFO');
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "MVP_RESULTS") {
      this.processInfo(payload);
      this.updateDom(this.config.animationSpeed);
    }
    this.updateDom(this.config.initialLoadDelay);
  },

  scheduleUpdate: function() {
      setInterval(() => {
        this.getInfo();
        console.log("updating Video Player...");
      }, this.config.updateInterval);
      this.getInfo(this.config.initialLoadDelay);
  },

  notificationReceived: function(notification) {
    if (notification === "HIDE_MVP") {
      this.hide(1000);
    } else if (notification === "SHOW_MVP") {
      this.show(1000);
    }
  },
  */

});
