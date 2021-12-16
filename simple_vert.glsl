precision mediump float;

attribute vec3 vertPosition;  //aPos

uniform mat4 P;
uniform mat4 MV;

void main()
{
	gl_Position = P * MV * vec4(vertPosition, 1.0);
}
