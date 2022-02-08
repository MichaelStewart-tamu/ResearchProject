precision highp float;

// struct DirectionalLight
// {
// 	vec3 direction;
// 	vec3 color;
// };

varying vec2 fragTexCoord;	//vTex
varying vec3 fragNormal;	//vNor
varying vec3 fragPos;		//vPos

// uniform vec3 ambientLightIntensity;
// uniform DirectionalLight sun;
// uniform sampler2D sampler;
// uniform vec3 ka;

uniform vec3 kd;
uniform vec3 ks;
uniform vec3 ka;
uniform float s;
uniform vec3 lPos0; // in camera space
uniform vec3 lPos1; // in camera space
uniform float lInt0;
uniform float lInt1;
uniform float alpha;

void main()
{
	//starting over
	//declaring values
	// vec3 kd = vec3(0.8, 0.8, 0.8);
	// vec3 ks = vec3(0.3, 0.3, 0.3);
	// vec3 ka = vec3(0.01, 0.01, 0.01);
	// float s = 100.0;
	// vec3 lPos0 = vec3(-5.0, 5.0, 5.0);
	// float lInt0 = 0.8;
	// float alpha = 1.0;

	//starting the shader
	vec3 color = ka;	//ka the deffuse color
	vec3 n = normalize(fragNormal);
	vec3 v = -normalize(fragPos);	//-normalize QUESTION: is this supposed to be -1 * normalize
	//one light
	vec3 l = normalize(lPos0 - fragPos);
	vec3 h = normalize(l + v);
	vec3 diffuse = max(dot(l, n), 0.0) * kd;
	vec3 specular = pow(max(dot(h, n), 0.0), s) * ks;
	color += lInt0 * (diffuse + specular);

	//second light
	vec3 l1 = normalize(lPos1 - fragPos);
	vec3 h1 = normalize(l1 + v);
	vec3 diffuse1 = max(dot(l1, n), 0.0) * kd;
	vec3 specular1 = pow(max(dot(h1, n), 0.0), s) * ks;
	color += lInt1 * (diffuse1 + specular1);

	gl_FragColor = vec4(color, alpha);



	// //old stuff
	// vec3 surfaceNormal = normalize(fragNormal);	//n
	// vec3 normSunDir = normalize(sun.direction);
	// vec4 texel = texture2D(sampler, fragTexCoord);

	// vec3 lightIntensity = ambientLightIntensity + sun.color * max(dot(fragNormal, normSunDir), 0.0);

	// //new stuff
	// vec3 color = vec3(0.1, 0.1, 0.1);
	// vec3 lightPos = vec3(1.5, 2.5, -2.5);
	// vec3 v = -normalize(fragPos);

	// vec3 l = normalize(lightPos - fragPos);
	// vec3 h = normalize(l + v);
	// vec3 diffuse = max(dot(l, surfaceNormal), 0.0) * vec3(0.5, 0.5, 0.5);
	// //							h, 		n		  		  s           ks
	// vec3 specular = pow(max(dot(h, surfaceNormal), 0.0), 0.1) * vec3(0.01, 0.01, 0.01);
	// color += diffuse + specular;
	// // gl_FragColor = vec4(texel.rgb * lightIntensity, texel.a);
	// gl_FragColor = vec4(color, 1.0);
	//gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}