"use strict";

function camera(fov, aspect, near, far) {
	this.fov = fov;
	this.aspect = aspect;
	this.near = near;
	this.far = far;
	this.position = [0, 0, 0];
	this.rotation = [0, 0, 0];
}

camera.prototype.setup = function(gl, shaderProgram, name) {
	var pUniform = gl.getUniformLocation(shaderProgram, name);
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(this.transform().flatten()));
};

camera.prototype.transform = function() {
	var perspective = matrix.perspective(this.fov, this.aspect, this.near, this.far);
	var p = [], r = [];
	for (var i = 0; i < 3; i++) {
		p[i] = -this.position[i];
		r[i] = -this.rotation[i];
	}
	return perspective.mul(matrix.rotate.apply(this, r)).mul(matrix.translate.apply(this, p));
};
