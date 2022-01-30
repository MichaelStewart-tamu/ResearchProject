class Shape
{
    //private variables
    #posBufID       //position buffer ID
    #norBufID       //normal buffer ID
    // #texBufID    //texture buffer ID
    #indBufID       //index buffer ID
    #posBuf     //position buffer
    #norBuf     //normal buffer
    // #texBuf    //texture buffer
    #indBuf     //index buffer


    //default constructor
    constructor()
    {
        //assigning null to buffer ID so that no buffer is created by accident
        this.#norBufID = null;
        this.#posBufID = null;
        // this.#texBufID = null;   //needed for texture
        this.#indBufID = null;
    }

    //initialization
    init(modelInfo)
    {
        this.#posBuf = modelInfo.meshes[0].vertices;
        this.#norBuf = modelInfo.meshes[0].normals;
        // this.#texBuf = modelInfo.meshes[0].texturecoords;
        this.#indBuf = [].concat.apply([], modelInfo.meshes[0].faces)

        this.#posBufID = gl.createBuffer();     //create the space for a buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.#posBufID);     //bind an array buffer to the created buffer in the previous line
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#posBuf), gl.STATIC_DRAW);     //insert data into that buffer

        this.#indBufID = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.#indBufID);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.#indBuf), gl.STATIC_DRAW);

        this.#norBufID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.#norBufID);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#norBuf), gl.STATIC_DRAW);

        // this.#texBufID = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.#texBufID);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#texBuf), gl.STATIC_DRAW);

        //unbind buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        //checking for errors
        let glErr = gl.getError();
        if(glErr != gl.NO_ERROR) 
        {
            console.log("GL_ERROR from inside init of shape = %s.\n", glErr);
	    }
    }

    //draws the shape
    draw(prog)
    {
        //checking for errors
        let glErr = gl.getError();
        if(glErr != gl.NO_ERROR) 
        {
            console.log("GL_ERROR from inside draw of shape = %s.\n", glErr);
	    }

        //bind vertex buffer
        let h_pos = prog.getAttribute("vertPosition");
        gl.enableVertexAttribArray(h_pos);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.#posBufID);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#posBuf), gl.STATIC_DRAW);
        gl.vertexAttribPointer(h_pos, 3, gl.FLOAT, gl.FALSE, 0, 0); //TODO: check! in c++ the last two are (0, (const void *)0), whil in java script it is 3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex, 0 // Offset from the beginning of a single vertex to this attribute

        //bind normal buffer
        let h_nor = prog.getAttribute("vertNormal");
        if(h_nor != -1 && this.#norBufID != 0)
        {
            gl.enableVertexAttribArray(h_nor);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.#norBufID);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#norBuf), gl.STATIC_DRAW);
            gl.vertexAttribPointer(h_nor, 3, gl.FLOAT, gl.FALSE, 0, 0); //TODO: check! in c++ the last two are (0, (const void *)0), whil in java script it is 3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex, 0 // Offset from the beginning of a single vertex to this attribute
        }

        //bind index buffer 
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.#indBufID);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.#indBuf), gl.STATIC_DRAW);

        //bind texture buffer
        // let h_tex = prog.getAttribute("vertTexCoord");
        // if(h_tex != -1 && this.#texBufID != 0)
        // {
        //     gl.enableVertexAttribArray(h_tex);
        //     gl.bindBuffer(gl.ARRAY_BUFFER, this.#texBufID);
        //     gl.vertexAttribPointer(h_tex, 2, gl.FLOAT, gl.FALSE, 0, 0); //TODO: check! in c++ the last two are (0, (const void *)0), whil in java script it is 3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex, 0 // Offset from the beginning of a single vertex to this attribute
        // }

        //DRAW
        var count = this.#indBuf.length;
        gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
        
        //DISABLE AND UNBIND
        // if(h_tex != -1)  //need to check 
        // {
        //     gl.disableVertexAttribArray(h_tex);
        // }

        if(h_nor != -1)
        {
            gl.disableVertexAttribArray(h_nor);
        }

        gl.disableVertexAttribArray(h_pos);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        //checking for errors
        if(glErr != gl.NO_ERROR) 
        {
            console.log("GL_ERROR = %s.\n", glErr);
	    }
    }
}