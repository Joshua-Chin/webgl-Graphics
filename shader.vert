attribute highp vec3 vPosition;
attribute highp vec3 vNormal;

uniform highp mat4 u_modelMatrix;
uniform highp mat4 u_cameraMatrix;
uniform highp vec3 u_lightVector;
uniform highp vec3 u_ambient;

varying highp vec3 vLighting;

void main(void) {
	gl_Position = u_cameraMatrix * u_modelMatrix * vec4(vPosition, 1.0);
	highp vec3 tNormal = normalize(mat3(u_modelMatrix)*vNormal);
	highp vec3 diffuse = max(dot(tNormal, u_lightVector), 0.0) * vec3(1,1,1);
	vLighting = u_ambient + diffuse;
}