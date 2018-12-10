# MMM-MyVideoPlayer
A simple video player for MagicMirror

The MMM-MyVideoPlayer module is a <a href=https://github.com/MichMich/MagicMirror/wiki/3rd-Party-Modules>3rd Party Module</a> of the <a href=https://github.com/MichMich/MagicMirror/tree/developMagicMirror>MagicMirror</a> 

## Screenshots
![Shows the current error form console log](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(170).png)

![Shows what it looks like at this point](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(171).png)

![image placeholder == ](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/

## Using the module...

To use this module, add it to the modules array in the 'config/config.js' file:
```
modules: [
	{
			disabled: false,
			module: "MMM-MyVideoPlayer",
			position: "top_center",
			config: {
				videos: ["video_one", "two", "3", "fourth_video", "Rx_by_Theory"]
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
videos should be less than 25mb to upload to GitHub
can add as many videos as you like.
must be named in single words or with the underscore "_" between the words. 
IE: "video_one"
 
Hope you all like it!
```



## Acknowledgements...
I want to thank @cowboysdude, as I got the basic idea from one of his modules!!!

Enjoy!
