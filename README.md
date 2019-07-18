# Starlight.js
###### A twinkling visual effect javascript library [View Demo](http://sergei1152.github.io/Starlight.js/)

A highly configurable javascript library for creating "twinkling star" effects. You can easily customize
every aspect of it to fit the needs of your website. You can apply the effect to more than one element as well.
Great for banners!

#### Requirements: JQuery

# Installation
Download the zip and copy the `starlight.js` file from the `starlight` folder then embed in your html: 
```
	<script src="starlight/starlight.js"></script>

	<div class="starlight"></div>
```

# Customization
Customizing the libary is very easy. Just edit the `user_configuration` options in the 
`starlight.js` file.

The options available are listed here:

### shape
Could be either `"circle"` or `"square"`
### initial_size
The starting size of the stars when they spawn (eg `"32px"`)
### final_size
The final size of the stars after expansion. Could also be the same as initial size if you don't want the stars to expand (eg `"64px"`)
### expand_speed
How long the stars take to expand/shrink (in CSS time. eg `"1s"`)
### fade_delay
The delay until the stars begin to fade out (in CSS time. eg `"1s"`)
### fade_duration
How long the star will take to fade out (in CSS time. eg `"0.5s"`)
### colors
Possible colors of the stars, each of which will be randomly chosen during spawning.  Can be any CSS complient color (eg. `"rgba(255,255,255,0.5)"`)
### frequency
Delay between star spawns in milliseconds(eg. `250`)
### density
How many stars will spawn per wave (eg `5`)
### keep_lit
`true` or `false`: Whether the stars will fade out
### rotation
`true` or `false` : Whether the stars will rotate
### coverage
How much of the element's area the stars will show up in (0-1 eg `0.75` will cover 75%)
### target_class
Elements that the stars will spawn in. Can be any class, element, or id (eg `".starlight"`)
### custom_svg
Not Supported Yet: If you want to use your own SVG instead of just a circle or a square

There are also more advanced settings that you can configure by modifying the `advanced_configuration` options.
Changing these settings isn't really necessary unless you don't like how some of the transitions play.

# Licence
[MIT](https://raw.githubusercontent.com/sergei1152/Starlight.js/master/LICENCE)
