# MMM-MyVideoPlayer
A simple video player for MagicMirror

The MMM-MyVideoPlayer module is a <a href=https://github.com/MichMich/MagicMirror/wiki/3rd-Party-Modules>3rd Party Module</a> of the <a href=https://github.com/MichMich/MagicMirror/tree/developMagicMirror>MagicMirror</a> 

## Screenshots
ScreenShot of the output of the module: 

![ScreenShot of the Developer's Tools Error](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20(438).png)



ScreenShot of the Developer's Tools showing No Errors.: 

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
		showBorder: true,
		minWidth: "212px",
		minHeight: "0px",
		direction: "row",
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
the buttons are set up so that the videos must coincide with the buttons. 
may need to adjust the sizes of them - width of video player divided by number of buttons
 
Hope you all like it!
```



## Acknowledgements...
I want to thank @cowboysdude, as I got the basic idea from one of his modules!!!

And @tosti007 as I used some of the code from his MMM-TouchNavigation to help me create the buttons!

Enjoy!
