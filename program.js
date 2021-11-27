let VShaderText = [
        'precision mediump float;',

        'attribute vec3 vertPosition;',
        'attribute vec2 vertTexCoord;',
        'attribute vec3 vertNormal;',
        
        'varying vec2 fragTexCoord;',
        'varying vec3 fragNormal;',
        
        'uniform mat4 mWorld;',
        'uniform mat4 mView;',
        'uniform mat4 mProj;',
        
        'void main()',
        '{',
        '  fragTexCoord = vertTexCoord;',
        '  fragNormal = (mWorld * vec4(vertNormal, 0.0)).xyz;',
        ' ',
        '  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);',
        '}'].join('\n');

let FShaderText =  
[
    'precision mediump float;',

    'struct DirectionalLight',
    '{',
    '    vec3 direction;',
    '    vec3 color;',
    '};',

    'varying vec2 fragTexCoord;',
    'varying vec3 fragNormal;',

    'uniform vec3 ambientLightIntensity;',
    'uniform DirectionalLight sun;',
    'uniform sampler2D sampler;',

    'void main()',
    '{',
    '    vec3 surfaceNormal = normalize(fragNormal);',
    '    vec3 normSunDir = normalize(sun.direction);',
    '    vec4 texel = texture2D(sampler, fragTexCoord);',

    '    vec3 lightIntensity = ambientLightIntensity + sun.color * max(dot(fragNormal, normSunDir), 0.0);',

    '    gl_FragColor = vec4(texel.rgb * lightIntensity, texel.a);',
    '}'
].join('\n');

let phong_vert =
[
    'precision mediump float;',
    'attribute vec4 aPos;',
    'attribute vec3 aNor;',
    'attribute vec2 aTex;',
    'uniform mat4 P;',
    'uniform mat4 MV;',
    'uniform mat4 MVit;',
    'varying vec3 vPos;',
    'varying vec3 vNor;',
    'varying vec2 vTex;',
    '',
    'void main()',
    '{',
    '    vec4 posCam = MV * aPos;',
    '    gl_Position = P * posCam;',
    '    vPos = posCam.xyz;',
    '    vNor = normalize((MVit * vec4(aNor, 0.0)).xyz);',
    '    vTex = aTex;',
    '}'
].join('\n');

//only supports version 1.0, as orriginally listed version 1.20
let phong_frag =
[
    'precision mediump float;',
    'varying vec3 vPos; // in camera space',
    'varying vec3 vNor; // in camera space',
    'varying vec2 vTex;',
    'uniform vec3 kd;',
    'uniform vec3 ks;',
    'uniform vec3 ka;',
    'uniform float s;',
    'uniform vec3 lPos0; // in camera space',
    'uniform vec3 lPos1; // in camera space',
    'uniform float lInt0;',
    'uniform float lInt1;',
    'uniform float alpha;',

    // Can't get arrays to work! Debug later
    //uniform float lNum; // number of lights

    'void main()',
    '{',
    '    vec3 color = ka;',
    '    vec3 n = normalize(vNor);',
    '    vec3 v = -normalize(vPos);',
    '    {',
    '        vec3 l = normalize(lPos0 - vPos);',
    '        vec3 h = normalize(l + v);',
    '        vec3 diffuse = max(dot(l, n), 0.0) * kd;',
    '        vec3 specular = pow(max(dot(h, n), 0.0), s) * ks;',
    '        color += lInt0*(diffuse + specular);',
    '    }',
    '    {',
    '        vec3 l = normalize(lPos1 - vPos);',
    '        vec3 h = normalize(l + v);',
    '        vec3 diffuse = max(dot(l, n), 0.0) * kd;',
    '        vec3 specular = pow(max(dot(h, n), 0.0), s) * ks;',
    '        color += lInt1*(diffuse + specular);',
    '    }',
    '    gl_FragColor = vec4(color, alpha);',
    '}'

].join('\n');

// let vertSimple = 
// [

// ].join('\n');

let fragSimple = 
[
    'precision mediump float;',
    'varying vec3 vPos; // in camera space',
    'varying vec3 vNor; // in camera space',
    'varying vec2 vTex;',
    'uniform vec3 kd;',
    'uniform vec3 ks;',
    'uniform vec3 ka;',
    'uniform float s;',
    'uniform vec3 lPos0; // in camera space',
    'uniform vec3 lPos1; // in camera space',
    'uniform float lInt0;',
    'uniform float lInt1;',
    'uniform float alpha;',

    // Can't get arrays to work! Debug later
    //uniform float lNum; // number of lights

    'void main()',
    '{',
    '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
    '}'
].join('\n');

class Program
{
    //private variables
    #vShaderName;
    #fShaderName;
    #pid;
    #attributes;
    #uniforms;
    #verbose;

    //creating the constructor for program, which seems to be the default constructor
    constructor()
    {
        //the variables declared in here act like private variables
        this.#pid = 0;
        this.#vShaderName = "";
        this.#fShaderName = "";
        this.#verbose = false;
        this.#attributes = [];
        this.#uniforms = [];
    }

    setShaderNames(v, f)
    {
        this.#vShaderName = v;
        this.#fShaderName = f;
    }

    init()
    {
        //variables to get stuff out of the nested functions
        let tempTextVector;
        let tempTextFrag;

        //create shader handles
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

        //read shader sources
        gl.shaderSource(vertexShader, this.#vShaderName);
        gl.shaderSource(fragmentShader, this.#fShaderName);

        //compile vertex shader
        gl.compileShader(vertexShader);
        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
        {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
            return;
        }

        //compile fragment shader
        gl.compileShader(fragmentShader);
        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
        {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
            return;
        }

        //create the program and link
        this.#pid = gl.createProgram();
        gl.attachShader(this.#pid, vertexShader);
        gl.attachShader(this.#pid, fragmentShader);
        gl.linkProgram(this.#pid);
        if(!gl.getProgramParameter(this.#pid, gl.LINK_STATUS))
        {
            console.error('ERROR linking program!', gl.getProgramInfoLog(this.#pid));
            return;
        }
        gl.validateProgram(this.#pid);
        if (!gl.getProgramParameter(this.#pid, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(this.#pid));
            return;
        }

        //TESTS
        console.log("testing outside nesting", tempTextVector, tempTextFrag);
        if(this.#verbose == true)
        {
            console.log("at the end of the init function,", this.#pid);
            console.log(vertexShader, fragmentShader);
            console.log("testing tempTextResource for output", VShaderText);
            console.log("testing fragment shader ", FShaderText);
            console.log("testing that the name is replaced with the text", this.#fShaderName);
            // console.log(fsText);
        }
    }

    bind()
    {
        // //to use useProgram you need the webGL context, I believe you can just gather that from the tags everytime
        // var canvas = document.getElementById('game-surface');
        // var gl = canvas.getContext('webgl');
        // //testing if gl worked
        // if (!gl) {
        //     console.log('WebGL not supported, falling back on experimental-webgl');
        //     gl = canvas.getContext('experimental-webgl');
        // }
    
        // if (!gl) {
        //     alert('Your browser does not support WebGL');
        // }

        gl.useProgram(this.#pid);   //the whole point of this function
    }

    unbind()
    {
        // //to use useProgram you need the webGL context, I believe you can just gather that from the tags everytime
        // var canvas = document.getElementById('game-surface');
        // var gl = canvas.getContext('webgl');
        // //testing if gl worked
        // if (!gl) {
        //     console.log('WebGL not supported, falling back on experimental-webgl');
        //     gl = canvas.getContext('experimental-webgl');
        // }
    
        // if (!gl) {
        //     alert('Your browser does not support WebGL');
        // }

        gl.useProgram(null);   //the whole point of this function, QUESTION: zero threw an error, is this necessary for the program?
    }

    addAttribute(name)
    {
        this.#attributes.push([name, gl.getAttribLocation(this.#pid, name)]);
    }

    getAttribute(name)
    {
        for(var i = 0; i < this.#attributes.length; i++)
        {
            //debug statement
            //console.log("testing inside get Attribute", i, this.#attributes[i][0], this.#attributes[i][1]);
            if(this.#attributes[i][0] == name)
            {
                return this.#attributes[i][1];
            }
        }

        console.error(name, " is not an attribute variable");
        return -1;
    }

    addUniform(name)
    {
        this.#uniforms.push([name, gl.getUniformLocation(this.#pid, name)]);
    }

    getUniform(name)
    {
        for(var i = 0; i < this.#uniforms.length; i++)
        {
            //Debug Statement
            // console.log("testing inside get Uniforms", i, this.#uniforms[i][0]);
            if(this.#uniforms[i][0] == name)
            {
                return this.#uniforms[i][1];
            }
        }

        console.error(name, " is not an Uniform variable");
    }

    testing()
    {

        let tempArray = [];
        tempArray.push([1, 2]);
        tempArray.push([3,4]);


        if(this.#verbose == true)
        {
            console.log(this.#vShaderName);
            console.log(this.#fShaderName);

            console.log(tempArray[1][1]);
            console.log(tempArray);
            if(tempArray[0][0] == 2)
            {
                console.log("can use conditionals on arrays");
            }

            console.log("now outputting the array for attributes", this.#attributes);
            console.log("length of attributes", this.#attributes.length);
        }
        
    }

    getPid()
    {
        console.log("output from getPID", this.#pid);
        return this.#pid;
    }
}