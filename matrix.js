"use strict";

function matrix(values) {
	this.values = values;
};

matrix.prototype = {
	
	width : 4,
	height : 4,
	length : 16,
	
	mul : function(other) {
		if ( other instanceof matrix) {
			var m1 = this.values, m2 = other.values, r = [];
			for (var i = 0; i < 4; i++) {
				for (var j = 0; j < 4; j++) {
					var sum = 0;
					for (var k = 0; k < 4; k++) {
						sum += m1[4 * i + k] * m2[4 * k + j];
					}
					r[4 * i + j] = sum;
				}
			}
			return new matrix(r);
		} else {//is vector
			var m = this.values, r = [];
			for (var i = 0; i < 4; i++) {
				var sum = 0;
				for (var j = 0; j < 4; j++) {
					sum += m[4 * i + j] * other[j];
				}
				r[i] = sum;
			}
			return r;
		}
	},

	flatten : function(){
		var out = [];
		for(var col=0; col<4; col++){
			for(var row=0; row<4; row++){
				out[col+4*row] = this.values[4*col+row];
			}
		}
		return out;
	},

	toString : function() {
		return "matrix(" + this.values.toString() + ")";
	}
};

matrix.id = new matrix([
	1,0,0,0,
	0,1,0,0,
	0,0,1,0,
	0,0,0,1]);
	
matrix.translate = function(x,y,z){
	return new matrix([
		1,0,0,x,
		0,1,0,y,
		0,0,1,z,
		0,0,0,1]);
};

matrix.scale = function(x,y,z){
	return new matrix([
		x,0,0,0,
		0,y,0,0,
		0,0,z,0,
		0,0,0,1]);
};

matrix.rotate = function(x,y,z){
	
	var cx = Math.cos(x), sx = Math.sin(x);
	var rx = new matrix([
		1, 0,  0,0,
		0,cx,-sx,0,
		0,sx, cx,0,
		0, 0,  0,1,
	]);

	var cy = Math.cos(y), sy = Math.sin(y);
	var ry = new matrix([
		 cy,0,sy,0,
		  0,1, 0,0,
		-sy,0,cy,0,
		  0,0, 0,1,
	]);
	
	var cz = Math.cos(z), sz = Math.sin(z);
	var rz = new matrix([
		cz,-sz,0,0,
		sz, cz,0,0,
		 0,  0,1,0,
		 0,  0,0,1,
	]);
	
	return rx.mul(ry).mul(rz);
};

matrix.perspective = function(fov, aspect, near, far){
	var depth = far - near;
	var h = 1/Math.tan(fov/2);
	var w = h/aspect;
	var m22 = -(far + near) / depth;
	var m32 = -2 * far * near / depth;
	return new matrix([
		w,0,  0,0,
		0,h,  0,0,
		0,0,m22,m32,
		0,0,-1,0,
		
	]);
};
