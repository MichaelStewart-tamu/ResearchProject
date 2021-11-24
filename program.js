let VShaderText = ['precision mediump float;',

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
        this.#verbose = true;
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
            console.log("testing inside get Attribute", i, this.#attributes[i][0]);
            if(this.#attributes[i][0] == name)
            {
                return this.#attributes[i][1];
            }
        }

        console.error(name, " is not an attribute variable");
    }

    addUniform(name)
    {
        this.#uniforms.push([name, gl.getAttribLocation(this.#pid, name)]);
    }

    getUniform(name)
    {
        for(var i = 0; i < this.#uniforms.length; i++)
        {
            console.log("testing inside get Attribute", i, this.#uniforms[i][0]);
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
}