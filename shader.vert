attribute vec3 vPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
  
void main(void) {
	gl_Position = uPMatrix * uMVMatrix * vec4(vPosition, 1.0);
}