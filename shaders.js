"use strict";function initShaders(gl, vertURL, fragURL) {
	var fragmentShader = getShader(gl, fragURL, "x-shader/x-fragment");
	var vertexShader = getShader(gl, vertURL, "x-shader/x-vertex");

	var shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Unable to initialize the shader program.");
	}

	gl.useProgram(shaderProgram);		return shaderProgram;
}
function getShader(gl, url, type) {
	return compileShader(gl, getSource(url), type);
}
function compileShader(gl, src, type) {
	var shader;

	if (type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}	
	gl.shaderSource(shader, src);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;

}
function getSource(url) {	var request = new XMLHttpRequest();	request.open("GET", url, false);	request.send();	return request.responseText;}
