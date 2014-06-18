"use strict";

var gl, shaderProgram, buffer, vertexPositionAttribute;
var cameraAttr, modelAttr;

function run() {
	var canvas = document.getElementById("glcanvas");

	gl = initWebGL(canvas);
	shaderProgram = initShaders(gl, "shader.vert", "shader.frag");

	var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);

	cameraAttr = gl.getUniformLocation(shaderProgram, "u_cameraMatrix");
	modelAttr = gl.getUniformLocation(shaderProgram, "u_modelMatrix");
	
	buffer = initBuffers();
	setInterval(render, 15);
}

function render() {
	var pos = vertexPositionAttribute;
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(pos, 3, gl.FLOAT, 3, 0, 0);

	setCamera(gl, cameraAttr, Math.PI / 4, 640.0 / 480.0, 0.1, 100);

	gl.uniformMatrix4fv(modelAttr, false, new Float32Array(matrix.translate(0.0, 0.0, -6.0).flatten()));
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}

function initBuffers() {
	var squareVerticesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVerticesBuffer);

	var vertices = [1.0, 1.0, 0.0, -1.0, 1.0, 0.0, 1.0, -1.0, 0.0, -1.0, -1.0, 0.0];

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	return squareVerticesBuffer;
}