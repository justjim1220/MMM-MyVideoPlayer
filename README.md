# MMM-MyVideoPlayer
A simple video player for MagicMirror

The MMM-MyVideoPlayer module is a <a href=https://github.com/MichMich/MagicMirror/wiki/3rd-Party-Modules>3rd Party Module</a> of the <a href=https://github.com/MichMich/MagicMirror/tree/developMagicMirror>MagicMirror</a> 

## Screenshots
ScreenShot of the output of the module, no video playing: 

![ScreenShot of no video playing](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20( ).png)


ScreenShot of the output of the module, no video playing after button pressed: 

![ScreenShot of video playing](https://github.com/justjim1220/MMM-MyVideoPlayer/blob/master/Screenshot%20( ).png)



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

the player size has to be configered within the js file:

IE: line 40  --->  wrapper.innerHTML = `<video class='controls' height='675' width='1200' id="player"></video>
 
Hope you all like it!
```
========================================================================================================================================

## Acknowledgements...
for @Sputnik & @remylpat for reqesting to have this module created!!!

I want to thank @cowboysdude, as I got the basic idea from one of his modules!!!
And, @sdetweil for giving me hints on tweaks to get it up and running right!!!

Enjoy!
