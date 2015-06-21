/*Starlight.js: A sparkling visual effects library
Created by Serj Babayan
View on Github at https://www.github.com/sergei1152/Starlight.js
Licence: MIT
*/

//TODO 1: CLEANUP javascript objects and DOM after element has faded out

//put your custom configuration settings here
var user_configuration={
	shape:"circle", //could also be square
	initial_size:"12px", //initial size of the stars
	final_size:"128px", //final size of the stars after expansion
	expand_speed:"1s", //how fast the stars get bigger, in milliseconds
	fade_delay:1000, //how long until the star fades out (in milliseconds)
	fade_duration:"1s", //how long the star fades for
	colors:["red","green","blue","black","#FFFFFF","hsl(180, 62%, 49%)","rgba(75, 41, 89,0.5)"], //The variety of colors of the stars. Can be any CSS complient color (eg. HEX, rgba, hsl)
	frequency:1000, //how often a new wave of stars popout (in milliseconds. Bigger==longer)
	density: 1,//how many stars pop out per wave
	keep_lit: false, //whether the stars dissapear after they are created
	rotation: false, //whether the stars rotate through out their expansion
	coverage:0.95, //how much of the element's area the stars will show up in (0-1)
	target_class:'.starlight', //the elements the script will target based on the class name
	custom_svg:"" //if you want to use a custom svg with a shape of a star instead
};

//the star object
function Star(width,height){
	leftOffset=Math.round((width-width*user_configuration.coverage)/4);
	topOffset=(height-Math.round(height*user_configuration.coverage))/4;
	this.xposition=Math.floor(Math.random()*width*user_configuration.coverage)+leftOffset;
	this.yposition=Math.floor(Math.random()*height*user_configuration.coverage)+topOffset;
}

//handles the star objects css properties, including custom ones from above
Star.prototype.create=function(parent_element){
	var star_container=$('<div></div>');
	var star=$('<div></div>');
	star_container.append(star);

	star.css({ //so the star stays centerd around its container
		position: "absolute",
    	top: "-50%",
    	left: "-50%",
    	width:"100%",
    	height:"100%"
	});
	star_container.css({ //the css properties of the star including ones that handle the color and transitions
		width:user_configuration.initial_size,
		height:user_configuration.initial_size,
		position:'absolute',
		top:this.yposition,
		left:this.xposition,
	});

	//sets expand properties of the star
	setTimeout(function(){
		star_container.css({ //the css properties of the star including ones that handle the color and transitions
			transition: "height "+user_configuration.expand_speed+" linear ,"+
						"width "+user_configuration.expand_speed+" linear ",
			width:user_configuration.final_size,
			height:user_configuration.final_size
		});
	},100);

	//sets fade out css properties of the star
	setTimeout(function(){
		star.css({ //the css properties of the star including ones that handle the color and transitions
		opacity:0,
		transition: "opacity "+user_configuration.fade_duration+" linear ",
		});
	},user_configuration.fade_delay);

	if(user_configuration.shape==='circle'){
		star.css('border-radius','50%');
	}
	if(user_configuration.custom_svg===''){
		star.css('background-color',user_configuration.colors[Math.floor(Math.random()*user_configuration.colors.length)]); //picks one of the colors
	}
	parent_element.append(star_container);
}


//Handles the actual creation of the stars based on the frequency and density as defined by the user
$(document).ready(function(){
	//traverses all of the elements with a class of 'starlight'
	$(user_configuration.target_class).each(function(index){
		var currentElement=$(this);
		var width=currentElement.width();
		var height=currentElement.height();
		setInterval(function(){
			for(var i=0;i<user_configuration.density;i++){
				var newStar=new Star(width,height);
				newStar.create(currentElement);
			}
		},user_configuration.frequency);
	});
});