"use strict";

function scene(canvas, camera) {

	this.canvas = canvas;
	this.camera = camera;

	var gl = initWebGL(canvas);
	this.gl = gl;

	var shaderProgram = initShaders(gl, "shader.vert", "shader.frag");
	this.shaderProgram = shaderProgram;

	var vPosAttr = gl.getAttribLocation(shaderProgram, "vPosition");
	this.vPosAttr = vPosAttr;
	gl.enableVertexAttribArray(vPosAttr);

	var u_modelMatrixAttr = gl.getAttribLocation(shaderProgram, "u_modelMatrix");
	this.u_modelMatrixAttr = u_modelMatrixAttr;

	camera.setup(gl, shaderProgram, "u_cameraMatrix");
}

scene.prototype.draw = function(renderable) {
	renderable.draw(this.gl, this.vPosAttr, this.u_modelMatrixAttr);
};

scene.prototype.clear = function() {
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
};
