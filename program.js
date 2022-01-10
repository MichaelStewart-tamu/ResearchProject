class Program
{
    //private variables
    #VertexShaderSource;
    #fragmentShaderSource;
    #programID;
    #attributes;
    #uniforms;
    #verbose;

    //creating the constructor for program, which seems to be the default constructor
    constructor()
    {
        //the variables declared in here act like private variables
        this.#programID = 0;
        this.#VertexShaderSource = "";
        this.#fragmentShaderSource = "";
        this.#verbose = false;
        this.#attributes = [];
        this.#uniforms = [];
    }

    setShaderNames(v, f)
    {
        this.#VertexShaderSource = v;
        this.#fragmentShaderSource = f;
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
        gl.shaderSource(vertexShader, this.#VertexShaderSource);
        gl.shaderSource(fragmentShader, this.#fragmentShaderSource);

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
        this.#programID = gl.createProgram();
        gl.attachShader(this.#programID, vertexShader);
        gl.attachShader(this.#programID, fragmentShader);
        gl.linkProgram(this.#programID);
        if(!gl.getProgramParameter(this.#programID, gl.LINK_STATUS))
        {
            console.error('ERROR linking program!', gl.getProgramInfoLog(this.#programID));
            return;
        }
        gl.validateProgram(this.#programID);
        if (!gl.getProgramParameter(this.#programID, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(this.#programID));
            return;
        }

        //TESTS
        if(this.#verbose == true)
        {
            console.log("at the end of the init function,", this.#programID);
            console.log(vertexShader, fragmentShader);
            console.log("testing tempTextResource for output", VShaderText);
            console.log("testing fragment shader ", FShaderText);
            console.log("testing that the name is replaced with the text", this.#fragmentShaderSource);
            // console.log(fsText);
        }
    }

    bind()
    {
        // //to use useProgram you need the webGL context, I believe gl is a global variable
        gl.useProgram(this.#programID);   //the whole point of this function
    }

    unbind()
    {
        gl.useProgram(null);   //the whole point of this function is to release the use of the program unbind is being called on, QUESTION: zero threw an error, is this necessary for the program?
    }

    //purpose is to keep track of the attributes for shading
    addAttribute(name)
    {
        this.#attributes.push([name, gl.getAttribLocation(this.#programID, name)]);
    }

    //purpose is to retrieve the attribute location
    getAttribute(name)
    {
        for(var i = 0; i < this.#attributes.length; i++)    //loop through all attributes
        {
            if(this.#attributes[i][0] == name)      //check if its what you want
            {
                return this.#attributes[i][1];
            }
        }

        console.error(name, " is not an attribute variable");   //in the scenario where no attribute is found
        return -1;
    }

    //purpose is to keep track of the uniforms for shading
    addUniform(name)
    {
        this.#uniforms.push([name, gl.getUniformLocation(this.#programID, name)]);
    }

    //purpose is to retrieve the uniform location
    getUniform(name)
    {
        for(var i = 0; i < this.#uniforms.length; i++)
        {
            if(this.#uniforms[i][0] == name)
            {
                return this.#uniforms[i][1];
            }
        }

        console.error(name, " is not an Uniform variable"); //in the scenario where no uniform is found
        return -1;
    }

    //retrieve the program ID
    getprogramID()
    {
        console.log("output from getprogramID", this.#programID);
        return this.#programID;
    }
}