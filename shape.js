class Shape
{
    //private variables
    #posBufID
    #norBufID
    // #texBufID
    #indBufID
    #posBuf
    #norBuf
    // #texBuf
    #indBuf

    
    //constructor
    constructor()
    {
        this.#norBufID = null;
        this.#posBufID = null;
        // this.#texBufID = null;
        this.#indBufID = null;
    }

    //load
    //old
    // init(modelInfo)
    // {
    //     console.log("testing input", modelInfo);

    //     this.#posBuf = modelInfo.meshes[0].vertices;
    //     this.#norBuf = modelInfo.meshes[0].normals;
    //     this.#texBuf = modelInfo.meshes[0].texturecoords;

    //     console.log("posBUf", this.#posBuf, "norBuf", this.#norBuf, "texBuf", this.#texBuf);
   
    //     this.#posBufID = gl.createBuffer();
    //     gl.bindBuffer(gl.ARRAY_BUFFER, this.#posBufID);
    //     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#posBuf), gl.STATIC_DRAW);

    //     if(this.#norBuf.length > 0)
    //     {
    //         this.#norBufID = gl.createBuffer();
    //         gl.bindBuffer(gl.ARRAY_BUFFER, this.#norBufID);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#norBuf), gl.STATIC_DRAW);
    //     }

    //     if(this.#texBuf.length > 0)
    //     {
    //         this.#texBufID = gl.createBuffer();
    //         gl.bindBuffer(gl.ARRAY_BUFFER, this.#texBufID);
    //         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#texBuf), gl.STATIC_DRAW);
    //     }

    //     //unbind buffer
    //     gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //     //checking for errors
    //     let glErr = gl.getError();
    //     if(glErr != gl.NO_ERROR) 
    //     {
    //         printf("GL_ERROR = %s.\n", glErr);
	//     }
    // }
    init(modelInfo)
    {
        console.log("testing input", modelInfo);

        this.#posBuf = modelInfo.meshes[0].vertices;
        this.#norBuf = modelInfo.meshes[0].normals;
        // this.#texBuf = modelInfo.meshes[0].texturecoords;
        this.#indBuf = [].concat.apply([], modelInfo.meshes[0].faces)
        // this.#posBuf = modelInfo.verts;
        // this.#norBuf = modelInfo.normals;
        // this.#texBuf = modelInfo.texcoords;
        // this.#indBuf = modelInfo.indices;

        console.log("posBUf", this.#posBuf, "norBuf", this.#norBuf, "indices", this.#indBuf);
   
        this.#posBufID = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.#posBufID);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.#posBuf), gl.STATIC_DRAW);

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
            console.log("GL_ERROR from inside draw of shape = %s.\n", glErr);
	    }
    }

    //draw
    draw(prog)
    {
        //checking for errors
        let glErr = gl.getError();
        if(glErr != gl.NO_ERROR) 
        {
            console.log("GL_ERROR from inside draw of shape = %s.\n", glErr);
	    }


        //bind position buffer
        //c++
        // int h_pos = prog->getAttribute("aPos");
        // glEnableVertexAttribArray(h_pos);
        // glBindBuffer(GL_ARRAY_BUFFER, posBufID);
        // glVertexAttribPointer(h_pos, 3, GL_FLOAT, GL_FALSE, 0, (const void *)0);
        
        //javascript
        // gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);
        // var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        // gl.vertexAttribPointer(
        //     positionAttribLocation, // Attribute location
        //     3, // Number of elements per attribute
        //     gl.FLOAT, // Type of elements
        //     gl.FALSE,
        //     3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
        //     0 // Offset from the beginning of a single vertex to this attribute
        // );
        // gl.enableVertexAttribArray(positionAttribLocation);

        let h_pos = prog.getAttribute("vertPosition");
        //let h_pos = gl.getAttribLocation(prog.getPid(), 'aPos');
        // console.log("draw in shape", h_pos);
        gl.enableVertexAttribArray(h_pos);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.#posBufID);
        gl.vertexAttribPointer(h_pos, 3, gl.FLOAT, gl.FALSE, 0, 0); //TODO: check! in c++ the last two are (0, (const void *)0), whil in java script it is 3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex, 0 // Offset from the beginning of a single vertex to this attribute

        //bind normal buffer
        let h_nor = prog.getAttribute("vertNormal");
        if(h_nor != -1 && this.#norBufID != 0)
        {
            gl.enableVertexAttribArray(h_nor);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.#norBufID);
            gl.vertexAttribPointer(h_nor, 3, gl.FLOAT, gl.FALSE, 0, 0); //TODO: check! in c++ the last two are (0, (const void *)0), whil in java script it is 3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex, 0 // Offset from the beginning of a single vertex to this attribute
        }

        //bind texture buffer
        // let h_tex = prog.getAttribute("vertTexCoord");
        // if(h_tex != -1 && this.#texBufID != 0)
        // {
        //     gl.enableVertexAttribArray(h_tex);
        //     gl.bindBuffer(gl.ARRAY_BUFFER, this.#texBufID);
        //     gl.vertexAttribPointer(h_tex, 2, gl.FLOAT, gl.FALSE, 0, 0); //TODO: check! in c++ the last two are (0, (const void *)0), whil in java script it is 3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex, 0 // Offset from the beginning of a single vertex to this attribute
        // }

        //draw
        var count = this.#indBuf.length;
        console.log("the count is ", count);
        // gl.drawArrays(gl.TRIANGLES, 0, count);
        gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);
        
        //disable and unbind
        // if(h_tex != -1)
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