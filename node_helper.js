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

    // make Promise version of fs.readdir()
    readdirAsync : function(dirname) {
      return new Promise(function(resolve, reject) {
	 fs.readdir(dirname, function(err, filenames){
	    if (err) 
	        reject(err); 
	    else 
	        resolve(filenames);
	 });
      });
    },
    // functions from here on
    start: function() {
	self=this;
        console.log("Starting module: " + this.name);
    },

    getVideos: function(){
	try {
       var files=fs.readdirSync(self.config.videoDir)
	return files;      
	}
	catch(exception){
		console.log("videoDir error ="+exception.message);
	}
    },
    getPosters: function(){
	try {
	    var files=fs.readdirSync(self.config.posterDir)
	    return files;
	}
	catch(exception){
		console.log("posterDir error ="+exception.message);
	}
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
