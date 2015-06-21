/*Starlight.js: A sparkling visual effects library
Created by Serj Babayan
View on Github at https://www.github.com/sergei1152/Starlight.js
Licence: MIT
*/

//TODO 1: CLEANUP javascript objects and DOM after element has faded out
//TODO 2: ADD SVG support

//put your custom configuration settings here
var user_configuration={
	shape:"circle", //could also be square
	initial_size:"12px", //initial size of the stars
	final_size:"128px", //final size of the stars after expansion
	expand_speed:"1s", //how fast the stars get bigger, in milliseconds
	fade_delay:"0.5s", //how long until the star fades out (in milliseconds)
	fade_duration:"0.5s", //how long the star fades for
	colors:["red","green","blue","black","#FFFFFF","hsl(180, 62%, 49%)","rgba(75, 41, 89,0.5)"], //The variety of colors of the stars. Can be any CSS complient color (eg. HEX, rgba, hsl)
	frequency:500, //how often a new wave of stars pop-out (in milliseconds. Bigger==longer)
	density: 1,//how many stars pop out per wave
	keep_lit: true, //whether the stars disappear after they are created
	rotation: false, //whether the stars rotate through out their expansion
	coverage:0.95, //how much of the element's area the stars will show up in (0-1)
	target_class:'.starlight', //the elements the script will target based on the class name
	custom_svg:"" //if you want to use a custom svg with a shape of a star instead (not supported yet)
};

//this is if you want to really customize how the stars appear
var advanced_configuration={
	expand_transition_timing: "linear", //could be ease, ease-in, ease-out, etc
	expand_delay: "0s",  //how long until the star starts to expand
	rotation_transition_timing: "linear",  //could be ease, ease-in, ease-out, etc
	rotation_angle: "360deg", //up to how much to rotate to
	rotation_duration: "1s", //how long the rotation will take place
	rotation_delay: "0s", //how long until rotation starts
  fade_transition_timing:"linear" //could be ease, ease-in, ease-out, etc
};

//the star object with its position
function Star(width,height){
	//the offsets are required so that when a user specifies a coverage, the coverage is based around the center of the div, and not the top left
	leftOffset=Math.round((width-width*user_configuration.coverage)/4);
	topOffset=(height-Math.round(height*user_configuration.coverage))/4;
	this.xposition=Math.floor(Math.random()*width*user_configuration.coverage)+leftOffset;
	this.yposition=Math.floor(Math.random()*height*user_configuration.coverage)+topOffset;
}

//the star CSS properties
Star.prototype.create=function(parent_element){
	//The container is there so that when the stars expand they exapand around the center
	var star_container=$('<div></div>');
	var star=$('<div></div>');
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
		width:user_configuration.initial_size,
		height:user_configuration.initial_size,
		position:'absolute',
		top:this.yposition,
		left:this.xposition,
	});

	//sets transition css properties of the star
	setTimeout(function(){
		star_container.css({ //size expand properties
			transition: "height "+user_configuration.expand_speed+" "+advanced_configuration.expand_transition_timing+" "+advanced_configuration.expand_delay+","+
						"width "+user_configuration.expand_speed+" "+advanced_configuration.expand_transition_timing+" "+advanced_configuration.expand_delay,
			width:user_configuration.final_size,
			height:user_configuration.final_size
		});

    //because transition properties override each other, have to create a variable for transition and append transitions on to it
    if(user_configuration.rotation){ //rotation properties
      star.css({
        transform: "rotate("+advanced_configuration.rotation_angle+")"
      });
      var transition=advanced_configuration.rotation_duration+" "+advanced_configuration.rotation_transition_timing+" "+advanced_configuration.rotation_delay;
    }

    if(!user_configuration.keep_lit) {//fading properties
      star.css({
        opacity: 0
        });
      if(transition){
        transition+=",opacity " + user_configuration.fade_duration + " " + advanced_configuration.fade_transition_timing + " " + user_configuration.fade_delay;
      }
      else {
        var transition="opacity " + user_configuration.fade_duration + " " + advanced_configuration.fade_transition_timing + " " + user_configuration.fade_delay;
      }
      }

    if(transition) {
      star.css({
        transition: transition
      });
    }

		},10);
	
	//sets shape and color of the star
	if(user_configuration.shape==='circle'){
		star.css('border-radius','50%');
	}
	if(user_configuration.custom_svg==='' || user_configuration.custom_svg===false){
		star.css('background-color',user_configuration.colors[Math.floor(Math.random()*user_configuration.colors.length)]); //picks one of the colors
	}
	parent_element.append(star_container);
};


//Handles the actual creation of the stars based on the frequency and density as defined by the user
$(document).ready(function(){
	//traverses all of the elements with a class of 'starlight'
	$(user_configuration.target_class).each(function(index){
		var currentElement=$(this);
		var width=currentElement.width();
		var height=currentElement.height();
		setInterval(function(){ //creates the stars based on the frequency and desired density
			for(var i=0;i<user_configuration.density;i++){
				var newStar=new Star(width,height);
				newStar.create(currentElement);
			}
		},user_configuration.frequency);
	});
});