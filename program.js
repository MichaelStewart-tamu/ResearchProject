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

        let tempText2 = ['precision mediump float;',

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
        '};'].join('\n');

        console.log("testing tempTextResource for output", tempText2);

        //Read shader sources
        //get vertex shader
        loadTextResource('./shader.vs.glsl', function (vsErr, vsText) 
        {
            if (vsErr) 
            {
                alert('Fatal error getting vertex shader (see console)');
                console.error(vsErr);
                console.log("error occured here 0");
            } 
            else
            {       //MOVE ON WITH CODE
                tempTextVector = vsText;
                //put in shader sources
                gl.shaderSource(vertexShader, vsText);

                //get fragment shader
                loadTextResource('./shader.fs.glsl', function (fsErr, fsText) 
                {
                    if (fsErr) 
                    {
                        alert('Fatal error getting vertex shader (see console)');
                        console.error(fsErr);
                    } 
                    else    //MOVE ON WITH CODE
                    {
                        tempTextFrag = fsText;
                        //put in shader sources
                        gl.shaderSource(fragmentShader, fsText);

                        //compile vertex shader
                        gl.compileShader(vertexShader);
                        // console.log(vertexShader);
                        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) 
                        {
                            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
                            return;
                        }

                        //compile fragment shader
                        gl.compileShader(fragmentShader);
                        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) 
                        {
                            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
                            return;
                        }
                        
                        //create the program and link
                        // console.log(vertexShader, fragmentShader);

                        //create the program and link
                        var program = gl.createProgram();

                        gl.attachShader(program, vertexShader);
                        gl.attachShader(program, fragmentShader);
                        gl.linkProgram(program);
                        if (!gl.getProgramParameter(program , gl.LINK_STATUS)) 
                        {
                            console.error('ERROR linking program!', gl.getProgramInfoLog(program));
                            return;
                        }
                        gl.validateProgram(program);
                        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) 
                        {
                            console.error('ERROR validating program!', gl.getProgramInfoLog(program));
                            return;
                        }

                        console.log("printing shader", program);
                        console.log("printing vector shader from inside", vsText);
                    }
                });
            }
        });
        
        console.log("testing outside nesting", tempTextVector, tempTextFrag);
        // if(this.#verbose == true)
        // {
        //     console.log(vertexShader, fragmentShader);
        //     // console.log(fsText);
        // }

        //placing the remainder out here causes problems linking, works inside the call backs tho
        //TODO: return program into PID
    }

    bind()
    {
        //to use useProgram you need the webGL context, I believe you can just gather that from the tags everytime
        var canvas = document.getElementById('game-surface');
        var gl = canvas.getContext('webgl');
        //testing if gl worked
        if (!gl) {
            console.log('WebGL not supported, falling back on experimental-webgl');
            gl = canvas.getContext('experimental-webgl');
        }
    
        if (!gl) {
            alert('Your browser does not support WebGL');
        }

        gl.useProgram(this.#pid);   //the whole point of this function
    }

    unbind()
    {
        //to use useProgram you need the webGL context, I believe you can just gather that from the tags everytime
        var canvas = document.getElementById('game-surface');
        var gl = canvas.getContext('webgl');
        //testing if gl worked
        if (!gl) {
            console.log('WebGL not supported, falling back on experimental-webgl');
            gl = canvas.getContext('experimental-webgl');
        }
    
        if (!gl) {
            alert('Your browser does not support WebGL');
        }

        gl.useProgram(0);   //the whole point of this function
    }

    getUniform(name)
    {
        //need to get PID out of the init function to do anything here
        //temp for testing
        return ;
    }

    testing()
    {
        if(this.#verbose == true)
        {
            console.log(this.#vShaderName);
            console.log(this.#fShaderName);
        }
        
    }
}