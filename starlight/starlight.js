/*Starlight.js: A sparkling visual effects library
Created by Serj Babayan
View on Github at https://www.github.com/sergei1152/Starlight.js
Licence: MIT
*/

//put your custom configuration settings here
var user_configuration={
	shape:"circle", //could also be square
	initial_size:"12px", //initial size of the stars
	final_size:"24px", //final size of the stars after expansion
	expand_speed:1000, //how fast the stars get bigger, in milliseconds
	colors:["red"], //The variety of colors of the stars. Can be any CSS complient color (eg. HEX, rgba, hsl)
	frequency:1000, //how often a new wave of stars popout (in milliseconds. Bigger==longer)
	density: 100,//how many stars pop out per wave
	keep_lit: false, //whether the stars dissapear after they are created
	rotation: false, //whether the stars rotate through out their expansion
	coverage:0.95, //how much of the element (in percent) the stars will show up in (0-1)
	target_class:'.starlight' //the elements the script will target based on the class name
};

//the star object
function Star(width,height){
	widthOffset=Math.round(width-Math.round(width*user_configuration.coverage))/2;
	heightOffset=Math.round(height-Math.round(height*user_configuration.coverage))/2;
	this.xposition=Math.floor(Math.random()*width*user_configuration.coverage)+widthOffset;
	this.yposition=Math.floor(Math.random()*height*user_configuration.coverage)+heightOffset;

}
Star.prototype.create=function(parent_element){
	var star=$('<div></div>');
	star.css({
		width:user_configuration.initial_size,
		height:user_configuration.initial_size,
		'background-color':"red",
		position:'absolute',
		top:this.yposition,
		left:this.xposition
	});
	parent_element.append(star);
}
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