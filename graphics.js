"use strict";

window.onload = run;

function run() {
	console.log("ran");
	var canvas = document.getElementById("glcanvas");
	var cam = new camera(Math.PI / 4, 640.0 / 480.0, 0.1, 100);
	var view = new scene(canvas, cam);

	var square = new renderable([1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0]);
	
	setInterval(render, 15);
	
	function render(){
		view.clear();
		view.draw(square);
	}
	
}