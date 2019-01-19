# MMM-MyVideoPlayer
A simple video player for MagicMirror in which you provide the videos. Home videos included!

The MMM-MyVideoPlayer module is a <a href=https://github.com/MichMich/MagicMirror/wiki/3rd-Party-Modules>3<sup>rd</sup> Party Module</a> of the <a href=https://github.com/MichMich/MagicMirror/tree/developMagicMirror>MagicMirror<sup>2</sup></a> 

## Screenshots
![ScreenShot of poster](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(1).png)

![ScreenShot of button #1](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(2).png)

![ScreenShot of button #2](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(3).png)

![ScreenShot of button #3](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(4).png)

![ScreenShot of button #4](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(5).png)

![ScreenShot of button #5](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(6).png)

![ScreenShot of button #2](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(7).png)

![ScreenShot of button #3](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(8).png)

![ScreenShot of button #4](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(10).png)

![ScreenShot of button #5](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(11).png)


## Using the module...

To use this module, add it to the modules array in the 'config/config.js' file:
```
modules: [
	{
	disabled: false,
	module: "MMM-MyVideoPlayer",
	position: "middle_center",
	config:
	    {
		initialLoadDelay: 5150,
		videoDir: "videos",
		posterDir: "posters",
		posterSize: {width:45, height:25},
		menuDirection: "row",
		playerSize: {width:480, height:270},
		playerBackground:"MM2splash.png"

	    }
	},
    ]
```

## Install...

cd ~/MagicMirror/modules
git clone https://github.com/justjim1220/MMM-MyVideoPlayer.git
cd MMM-MyVideoPlayer
npm install

## Configurations...

can add as many videos as you like.
** All videos must be placed in the videos directory & All posters must be placed inside the posters directory **
the player will show the buttons in the order of how thery are in the poster dirsctory.
0 through 9, or a,b,c (recommended).
video names should coincide with the button names. 
may need to adjust the sizes of buttons - width of video player divided by number of buttons

Hope you all like it!

========================================================================================================================================

## Acknowledgements...
for @Sputnik & @remylpat for reqesting to have this module created!!!

I want to thank @cowboysdude, as I got the basic idea from one of his modules!!!

And, @sdetweil for giving me hints on tweaks to get it up and running right!!!

Enjoy!
