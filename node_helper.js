var fs = require('fs');
const path = require('path');
const NodeHelper = require('node_helper');
var self;

module.exports = NodeHelper.create({
    // data defaults
    defaults:{
	videoDir:"videos",
	posterDir:"posters",
    },
    self:0,

    // functions from here on
    start: function() {
	self=this;
        console.log("Starting module: " + this.name);
    },

    getVideos: function(){
      var files = fs.readdirSync(self.config.videoDir);
      return files;
    },
    getPosters: function(){
      var files = fs.readdirSync(self.config.posterDir);
      return files;
    },

    socketNotificationReceived: function(notification, payload) {
	if (notification === 'CONFIG') {
	    this.config = payload;
	   console.log("config payload received");
	   self.config.videoDir=path.join(__dirname.toString(),self.config.videoDir);
	   self.config.posterDir=path.join(__dirname.toString(),self.config.posterDir);
	}
	else if (notification === 'GET_VIDEOS') {
	   self.sendSocketNotification("Videos",self.getVideos());
	}
	else if (notification === 'GET_POSTERS') {
 	  self.sendSocketNotification("Posters",self.getPosters());
	}
    },
})
