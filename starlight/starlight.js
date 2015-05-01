/*Starlight.js: Sparkling Visual Effects
Created by Serj Babayan
View on Github at http://www.github.com/sergei1152/Starlight.js
Licence: MIT
*/

//put your custom configuration settings here
var user_configuration={
	shape:"circle", //could also be square
	initial_size:"12px", //initial size of the stars
	final_size:"24px", //final size of the stars after expansion
	expand_speed:"1s", //how fast the stars get bigger
	colors:["red"], //The variety of colors of the stars. Can be any CSS complient color (eg. HEX, rgba, hsl)
	frequency:1, //how often a new wave of stars popout
	density: 1, //how many stars pop out per wave
	keep_lit: false, //whether the stars dissapear after they are created
	rotation: false //whether the stars rotate through out their expansion
	coverage:100 //how much of the element (in percent) the stars will show up in
};


$(document).ready(function(){

});