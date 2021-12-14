precision mediump float;

attribute vec3 vertPosition;  //aPos
attribute vec2 vertTexCoord;  //aTex
attribute vec3 vertNormal;    //aNor

varying vec2 fragTexCoord;  //vTex
varying vec3 fragNormal;    //vNor
varying vec3 fragPos;       //vPos

// uniform mat4 mWorld;        
// uniform mat4 mView;
// uniform mat4 mProj;         //P
uniform mat4 MV;
uniform mat4 P;
uniform mat4 MVit;

void main()
{
  // vec4 posCam = mView * mWorld * vec4(vertPosition, 1.0);
  // gl_Position = mProj * posCam;
  // fragPos = posCam.xyz;
  // fragNormal = normalize((MVit * vec4(vertNormal, 0.0)).xyz);
  // fragTexCoord = vertTexCoord;

  vec4 posCam = MV * vec4(vertPosition, 1.0);
  gl_Position = P * posCam;
  fragPos = posCam.xyz;
  fragNormal = normalize((MVit * vec4(vertNormal, 0.0)).xyz);
  fragTexCoord = vertTexCoord;

  // fragTexCoord = vertTexCoord;
  // // fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;  //need to invert mWorld
  // fragNormal = normalize(MVit * vec4(vertNormal, 0.0)).xyz;
  // fragPos = (mView * mWorld * vec4(vertPosition, 0.0)).xyz;

  // gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}