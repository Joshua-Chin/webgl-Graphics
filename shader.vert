attribute vec3 vPosition;
attribute vec3 vNormal;

uniform mat4 u_modelMatrix;
uniform mat4 u_cameraMatrix;
  
void main(void) {
	gl_Position = u_cameraMatrix * u_modelMatrix * vec4(vPosition, 1.0);
}