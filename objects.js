"use strict";

function drawIndexedNormalObject(obj, modelMatrix) {
	var vbo = obj.vertexBuffer;
	var normals = obj.normalBuffer;
	var indices = obj.indexBuffer;
	var length = obj.length;
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.vertexAttribPointer(vPosAttr, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, normals);
	gl.vertexAttribPointer(vNormalAttr, 3, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
	gl.uniformMatrix4fv(modelAttr, false, new Float32Array(modelMatrix.flatten()));
	gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_SHORT, 0);
}

function genIndexedNormalObjectBuffer(vertices, normals, indices) {
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	var normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

	return {
		indexBuffer : indexBuffer,
		vertexBuffer : vertexBuffer,
		normalBuffer : normalBuffer,
		length : indices.length
	};
}

function drawIndexedObject(obj, modelMatrix) {
	var vbo = obj.vertexBuffer;
	var indices = obj.indexBuffer;
	var length = obj.length;
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.vertexAttribPointer(vPosAttr, 3, gl.FLOAT, 3, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
	gl.uniformMatrix4fv(modelAttr, false, new Float32Array(modelMatrix.flatten()));
	gl.drawElements(gl.TRIANGLES, length, gl.UNSIGNED_SHORT, 0);
}

function genIndexedObjectBuffer(vertices, indices) {
	var indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

	return {
		indexBuffer : indexBuffer,
		vertexBuffer : vertexBuffer,
		length : indices.length
	};
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
	return {
		buffer : buffer,
		length : triangles.length / 3
	};
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
	for (var i = 0; i < granularity; i++) {
		points[i] = func(i / (granularity - 1));
	}

	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);
	return {
		buffer : buffer,
		length : granularity
	};
}