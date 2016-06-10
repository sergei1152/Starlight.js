/*Starlight.js: A sparkling visual effects library
Created by Serj Babayan
View on Github at https://www.github.com/sergei1152/Starlight.js
Licence: MIT
*/

//TODO Fix resizing issues
//TODO 1: ADD SVG support
//TODO 2: FIX the keep_list true and rotation false instant expand glitch

(function ( $ ) {
  //Handles the actual creation of the stars based on the frequency and density as defined by the user
  // $(document).ready(function(){
  $.fn.starlight = function(options) {
    var settings = $.extend({
      shape:"square", //could be "circle" or "square"
    	initial_size:"12px", //initial size of the stars
    	final_size:"64px", //final size of the stars after expansion
    	expand_speed:"1s", //how fast the stars get bigger, in milliseconds
    	fade_delay:"0.5s", //how long until the star fades out
    	fade_duration:"0.5s", //how long the star fades for
    	colors:["hsla(62, 50%,50%, 0.5)", "rgba(255,255,255,0.5)","hsla(180, 72%, 52%, 0.5)"], //The variety of colors of the stars. Can be any CSS complient color (eg. HEX, rgba, hsl)
    	frequency:100, //how often a new wave of stars pop-out (in milliseconds. Bigger==longer)
    	density: 1,//how many stars pop out per wave
    	keep_lit: false, //whether the stars disappear after they are created
    	rotation: true, //whether the stars rotate through out their expansion
    	coverage:1, //how much of the element's area the stars will show up in (0-1)
    	custom_svg:"", //if you want to use a custom svg with a shape of a star instead (not supported yet)
      //this is if you want to really customize how the stars appear
      expand_transition_timing: "linear", //could be ease, ease-in, ease-out, etc
    	expand_delay: "0s",  //how long until the star starts to expand
    	rotation_transition_timing: "linear",  //could be ease, ease-in, ease-out, etc
    	rotation_angle: "360deg", //up to how much to rotate to
    	rotation_duration: "1s", //how long the rotation will take place
    	rotation_delay: "0s", //how long until rotation starts
    	fade_transition_timing:"linear", //could be ease, ease-in, ease-out, etc
    	z_index:0 //the stars are absolutely positioned, so you can give them a z-index of whatever you wish
    }, options );
  	var id=0;

    //the star object with its position
    function Star(width,height){
    	//the offsets are required so that when a user specifies a coverage, the coverage is based around the center of the div, and not the top left
    	leftOffset=Math.round((width-width*settings.coverage)/2);
    	topOffset=(height-Math.round(height*settings.coverage))/2;
    	this.xposition=Math.floor(Math.random()*width*settings.coverage)+leftOffset;
    	this.yposition=Math.floor(Math.random()*height*settings.coverage)+topOffset;
    }

    //the star CSS properties
    Star.prototype.create=function(parent_element,id){
    	//The container is there so that when the stars expand they exapand around the center
    	var star=$('<div></div>');
    	var star_container=$('<div settings=\"starlight-star'+id+'\"></div>');
    	// star_container.attr("id","star"+id);
    	star_container.append(star);

    	//so the star stays centered as its container expands
    	star.css({
    		position: "absolute",
      	top: "-50%",
      	left: "-50%",
      	width:"100%",
      	height:"100%"
    	});

    	//the initial CSS properties of the star, including color, position, and size
    	star_container.css({
    		width:settings.initial_size,
    		height:settings.initial_size,
    		position:'absolute',
    		top:this.yposition,
    		left:this.xposition,
    		"z-index": settings.z_index
    	});

    	//sets transition css properties of the star
    	setTimeout(function(){
    		star_container.css({ //size expand properties
    			transition: "height "+settings.expand_speed+" "+settings.expand_transition_timing+" "+settings.expand_delay+","+
    						"width "+settings.expand_speed+" "+settings.expand_transition_timing+" "+settings.expand_delay,
    			width:settings.final_size,
    			height:settings.final_size
    		});

        //because transition properties override each other, have to create a variable for transition and append transitions on to it
        if(settings.rotation){ //rotation properties
          star.css({
            transform: "rotate("+settings.rotation_angle+")"
          });
          var transition=settings.rotation_duration+" "+settings.rotation_transition_timing+" "+settings.rotation_delay;
        }

        if(!settings.keep_lit) {//fading properties
          star.css({
            opacity: 0
            });
          if(transition){
            transition+=",opacity " + settings.fade_duration + " " + settings.fade_transition_timing + " " + settings.fade_delay;
          }
          else {
            var transition="opacity " + settings.fade_duration + " " + settings.fade_transition_timing + " " + settings.fade_delay;
          }

          	//removes the element from the dom after it fades out
    		setTimeout(function(){
    			star_container.remove();
    		},css_time_to_milliseconds(settings.fade_duration)+css_time_to_milliseconds(settings.fade_delay));
          }

        if(transition) {
          star.css({
            transition: transition
          });
        }

    		},10);

    	//sets shape and color of the star
    	if(settings.shape==='circle'){
    		star.css('border-radius','50%');
    	}
    	if(settings.custom_svg==='' || settings.custom_svg===false){
    		star.css('background-color',settings.colors[Math.floor(Math.random()*settings.colors.length)]); //picks one of the colors
    	}
    	parent_element.append(star_container);
    };

    //retrieved from https://gist.github.com/jakebellacera/9261266
    function css_time_to_milliseconds(time_string) {
      var num = parseFloat(time_string, 10),
          unit = time_string.match(/m?s/),
          milliseconds;

      if (unit) {
        unit = unit[0];
      }

      switch (unit) {
        case "s": // seconds
          milliseconds = num * 1000;
          break;
        case "ms": // milliseconds
          milliseconds = num;
          break;
        default:
          milliseconds = 0;
          break;
      }

      return milliseconds;
    }

  	//traverses all of the elements with a class of 'starlight'
  	this.each(function(index){
  		var currentElement=$(this);
  		var width=currentElement.width();
  		var height=currentElement.height();
  		setInterval(function(){ //creates the stars based on the frequency and desired density
  			for(var i=0;i<settings.density;i++){
  				var newStar=new Star(width,height);
  				newStar.create(currentElement,id);
  				newStar=null; //just in case so the garbage collector clears this value up
  				id++;
  			}
  		},settings.frequency);
  	});
  };
}(jQuery));
