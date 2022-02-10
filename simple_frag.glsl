precision highp float;
uniform vec3 inputColor;

void main()
{
	gl_FragColor = vec4(inputColor, 1.0);	//make this equal the rgb color passed in, 4th componant 1
}
