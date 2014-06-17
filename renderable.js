"use strict";

function renderable(vertices) {

	this.vertices = vertices;
	this.buffer = undefined;

	this.position = [0, 0, 0];
	this.rotation = [0, 0, 0];
	this.scale = [1, 1, 1];

}

renderable.prototype.draw = function(gl, vPosAttr, u_modelMatrixAttr) {

	if (this.buffer === undefined) {
		var buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		this.buffer = buffer;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.vertexAttribPointer(vPosAttr, 3, gl.FLOAT, 3, 0, 0);
	gl.uniformMatrix4fv(u_modelMatrixAttr, false, new Float32Array(this.transform().flatten()));
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

renderable.prototype.transform = function() {
	var pos = matrix.translate.apply(this, this.position);
	var rot = matrix.rotate.apply(this, this.rotation);
	var scale = matrix.scale.apply(this, this.scale);
	return pos.mul(rot).mul(scale);
};
