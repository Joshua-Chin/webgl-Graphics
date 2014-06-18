"use strict";

var gl, shaderProgram, squareBuffer;
var vPosAttr, cameraAttr, modelAttr;

var startTime = (new Date()).getTime(), lastUpdate=startTime;

function run() {
	var canvas = document.getElementById("glcanvas");

	gl = initWebGL(canvas);
	shaderProgram = initShaders(gl, "shader.vert", "shader.frag");

	var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);

	cameraAttr = gl.getUniformLocation(shaderProgram, "u_cameraMatrix");
	modelAttr = gl.getUniformLocation(shaderProgram, "u_modelMatrix");

	  var vertices = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    
    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
    
    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
    
    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    
    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
    
    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ];

  var indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23    // left
  ];

	squareBuffer = genIndexedObjectBuffer(vertices, indices);
	setInterval(render, 15);
}

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	setCamera(gl, cameraAttr, Math.PI / 4, 640.0 / 480.0, 0.1, 100);
	
	var now = (new Date()).getTime();
	
	drawIndexedObject(squareBuffer, matrix.translate((now-startTime)/10000, 0, -6), 6);
}
