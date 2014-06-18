"use strict";

var gl, shaderProgram, squareBuffer;
var vPosAttr, cameraAttr, modelAttr;

function run() {
	var canvas = document.getElementById("glcanvas");

	gl = initWebGL(canvas);
	shaderProgram = initShaders(gl, "shader.vert", "shader.frag");

	var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);

	cameraAttr = gl.getUniformLocation(shaderProgram, "u_cameraMatrix");
	modelAttr = gl.getUniformLocation(shaderProgram, "u_modelMatrix");

	squareBuffer = genObjectBuffer(
		[1.0, 1.0, 0.0,
		-1.0, 1.0, 0.0,
		1.0, -1.0, 0.0,
		-1.0, 1.0, 0.0,
		-1.0, -1.0, 0.0,
		1.0, -1.0, 0.0,]);
	setInterval(render, 15);
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	setCamera(gl, cameraAttr, Math.PI / 4, 640.0 / 480.0, 0.1, 100);
	drawObject(squareBuffer, matrix.translate(0, 0, -6), 6);
}

function drawObject(obj, modelMatrix) {
	var vbo = obj.buffer;
	var length = obj.length;
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.vertexAttribPointer(vPosAttr, 3, gl.FLOAT, 3, 0, 0);
	gl.uniformMatrix4fv(modelAttr, false, new Float32Array(modelMatrix.flatten()));
	gl.drawArrays(gl.TRIANGLES, 0, length);
}

function genObjectBuffer(triangles) {
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangles), gl.STATIC_DRAW);
	return {buffer:buffer, length:triangles.length/3};
}

function drawPath(path, modelMatrix) {
	var vbo = path.buffer;
	var length = path.length;
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.vertexAttribPointer(vPosAttr, 3, gl.FLOAT, 3, 0, 0);
	gl.uniformMatrix4fv(modelAttr, false, new Float32Array(modelMatrix.flatten()));
	gl.drawArrays(gl.LINE_STRIP, 0, length);
}

function genPathBuffer(func, granularity) {
	points = [];
	for(var i=0; i<granularity; i++){
		points[i] = func(i/(granularity-1));
	}
	
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
	return {buffer:buffer, length:granularity};
}
