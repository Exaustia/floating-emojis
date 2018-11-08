
# FloatingEmojis

  
  
Lib to move images automatically

Easy to use and a lot of settings

  
  

# Documentation

  

How to call ?

Call  `<FloatingEmojisContainer emojis={emojis} />`

  

What is emojis ?

    emojis = {
	    img: img you need see
	    numberOfEmojis: Number emojis you need to see (you can send multiple emojis with the same img)
    }

  
**Settings :**

  - animationDuration

- animationTimingFunction

- animationRepeat

- animationDirection

- marginLeft

- startHeight

  
  

**Default Settings :**

  

    FloatingEmojisContainer.settingsEmojis = { 
	    repeat: 1, 
	    duration: 8,
	    direction: 'normal',
	    size: 2,
	    animation: 'linear'
    }

