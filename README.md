# MMM-MyVideoPlayer
A simple video player for MagicMirror

The MMM-MyVideoPlayer module is a <a href=https://github.com/MichMich/MagicMirror/wiki/3rd-Party-Modules>3rd Party Module</a> of the <a href=https://github.com/MichMich/MagicMirror/tree/developMagicMirror>MagicMirror</a> 

## Screenshots
ScreenShot of the output of the module: 

![ScreenShot of the Developer's Tools Error](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(438).png)



ScreenShot of the Developer's Tools Error: 

![ScreenShot of the output of the module](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(439).png)


## Using the module...

To use this module, add it to the modules array in the 'config/config.js' file:
```
modules: [
    {
	disabled: false,
	module: "MMM-MyVideoPlayer",
	position: "bottom_center",
	config:
	    {
		initialLoadDelay: 5150,
		height: "600px", // video player height
		width: "1066px", // video player width
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
	    }
	},
    ]
```

## Install...
```
cd ~/MagicMirror/modules
git clone https://github.com/justjim1220/MMM-MyVideoPlayer.git
```

## Other Info...
```
can add as many videos as you like.
the buttons are set up for 5 videos,
may need to adjust the sizes of them - width of video player divided by number of buttons
the videos must coincide with the buttons.
videos must be named in single words or with the underscore "_" between the words. 
IE: "video_one"
 
Hope you all like it!
```



## Acknowledgements...
I want to thank @cowboysdude, as I got the basic idea from one of his modules!!!

And @tosti007 as I used some of the code from his MMM-TouchNavigation to help me create the buttons!

Enjoy!
