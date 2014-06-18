"use strict";

function setCamera(gl, matrixAttr, fov, aspect, near, far) {
	var perspective = matrix.perspective(fov, aspect, near, far);
	gl.uniformMatrix4fv(matrixAttr, false, new Float32Array(perspective.flatten()));
}
