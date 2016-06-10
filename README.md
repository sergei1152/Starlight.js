#Starlight.js
######A twinkling visual effect javascript library [View Demo](http://sergei1152.github.io/Starlight.js/)

A highly configurable javascript library for creating "twinkling star" effects. You can easily customize
every aspect of it to fit the needs of your website. You can apply the effect to more than one element as well.
Great for banners!

####Requirements: JQuery

# Installation
Download the zip and copy the `starlight.js` file from the `starlight` folder then include the script in the document head:
```
	<script src="starlight/starlight.js"></script>
```

# Usage
```js
  $('.starlight').starlight(options);
```

`'.starlight'` is the identifier of the element you want to add the star field to. Options is an optional javascript object with parameters explained below:

# Options
|Option|Type|Default|Description|
|---|---|---|---|
|shape|string|'square'|Could be either `"circle"` or `"square"`|
|initial_size|string|'12px'|initial size of the stars|
|final_size|string|'64px'|final size of the stars after expansion|
|expand_speed|string|'1s'|how fast the stars get bigger, in milliseconds|
|fade_delay|string|'0.5s'|how long until the star fades out|
|fade_duration|string|'0.5s'|how long the star fades for|
|colors|array|["hsla(62, 50%,50%, 0.5)", "rgba(255,255,255,0.5)","hsla(180, 72%, 52%, 0.5)"]|The variety of colors of the stars. Can be any CSS complient color (eg. HEX, rgba, hsl)|
|frequency|integer|100|how often a new wave of stars pop-out (in milliseconds. Bigger==longer)|
|density|integer|1|how many stars pop out per wave|
|keep_lit|boolean|false|whether the stars disappear after they are created|
|rotation|boolean|true|whether the stars rotate through out their expansion|
|coverage|integer|1|how much of the element's area the stars will show up in (0-1 e.g. `0.75` will cover 75%)|
|custom_svg|string|""|if you want to use a custom svg with a shape of a star instead (not supported yet)|
|expand_transition_timing|string|"linear"|could be ease, ease-in, ease-out, etc|
|expand_delay|string|"0s"|how long until the star starts to expand|
|rotation_transition_timing|string|"linear"|could be ease, ease-in, ease-out, etc|
|rotation_angle|string|"360deg"|up to how much to rotate to|
|rotation_duration|string|"1s"|how long the rotation will take place|
|rotation_delay|string|"0s"|how long until rotation starts|
|fade_transition_timing|string|"linear"|could be ease, ease-in, ease-out, etc|
|z_index|integer|0|CSS z-index of star|

#Licence
[MIT](https://raw.githubusercontent.com/sergei1152/Starlight.js/master/LICENCE)
