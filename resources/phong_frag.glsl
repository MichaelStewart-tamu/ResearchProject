#version 120

varying vec3 vPos; // in camera space
varying vec3 vNor; // in camera space
varying vec2 vTex;
uniform vec3 kd;
uniform vec3 ks;
uniform vec3 ka;
uniform float s;
uniform vec3 lPos0; // in camera space
uniform vec3 lPos1; // in camera space
uniform float lInt0;
uniform float lInt1;
uniform float alpha;

// Can't get arrays to work! Debug later
//uniform float lNum; // number of lights

void main()
{
	vec3 color = ka;
	vec3 n = normalize(vNor);
	vec3 v = -normalize(vPos);
	{
		vec3 l = normalize(lPos0 - vPos);
		vec3 h = normalize(l + v);
		vec3 diffuse = max(dot(l, n), 0.0) * kd;
		vec3 specular = pow(max(dot(h, n), 0.0), s) * ks;
		color += lInt0*(diffuse + specular);
	}
	{
		vec3 l = normalize(lPos1 - vPos);
		vec3 h = normalize(l + v);
		vec3 diffuse = max(dot(l, n), 0.0) * kd;
		vec3 specular = pow(max(dot(h, n), 0.0), s) * ks;
		color += lInt1*(diffuse + specular);
	}
	gl_FragColor = vec4(color, alpha);
}
