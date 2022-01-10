class Camera
{
    //creating public variables
    aspect;
	fovy;
	znear;
	zfar;
    currentlyClicking
    shiftBool;
    keyNumber;
    //creating private variables
    #rotations = vec2.create();
    #translations = vec3.create();
    #mousePrev = vec2.create();
    #state;
    #rotationFactor;
    #translationFactor;
    #scaleFactor;
    #resetting;
    #translationsInit = vec3.create();
    #rotationsInit = vec2.create();
    #numx;
    #numy;
    #colors;
    #rayPts;
    #currx;
    #curry;
    #showAll;

    constructor()
    {
        // this.aspect = 1.0;
        this.aspect = canvas.clientWidth / canvas.clientHeight;
        this.fovy = (45.0 * Math.PI) / 180.0;
        this.znear = 1.0;
        this.zfar = 100.0;
        // vec2.set(this.#rotations, 0.0, 0.0);
        this.#rotations[0] = 0.0;
        this.#rotations[1] = 0.0;
        vec3.set(this.#translations, 0.0, 0.0, -5.0);
        this.#rotationFactor = 0.01;
        this.#translationFactor = 0.001;
        this.#scaleFactor = -0.001;

        //this.#translationsInit = this.#translations;
        vec3.set(this.#translationsInit, 0.0, 0.0, -5.0);
        //this.#rotationsInit = this.#rotations;
        vec2.set(this.#rotationsInit, 0.0, 0.0);
        this.#resetting = false;
        this.numx = 10;
        this.numy = 10;
        this.#currx = 0;
        this.#curry = 0;
        this.#showAll = true;
        this.currentlyClicking = false;
        this.shiftBool = false;
        this.keyNumber = 0;
        //TODO: comeback later
        // this.colors
    }

    //this function will record the position of the mouse and change the state of the button press
    mouseClicked(x, y, shift, ctrl, alt)
    {
        this.#mousePrev[0] = x; //the prev is recorded because that is the initial state of the movement. You click then move the mouse.
        this.#mousePrev[1] = y;
        if(shift)
        {
            this.#state = "translate";
        }
        else if(ctrl)
        {
            this.#state = "scale";
        }
        else
        {
            this.#state = "rotate";
        }
        this.#resetting = false;
    }

    //This is called when the mouse is moved after a button press as an event
    mouseMoved(x, y)
    {
        var mouseCurr = vec2.create();
        vec2.set(mouseCurr, x, y);
        var dv = vec2.create();
        vec2.sub(dv, mouseCurr, this.#mousePrev);   //delta v = mouse current position - mouse previous position
        
        switch(this.#state) //depending on the button pressed different things will happen
        {
            case "rotate":
                this.#rotations[0] += this.#rotationFactor * dv[0]; //plus equals because the rotation is a static factor, so you have to add to it to see the change
                this.#rotations[1] += this.#rotationFactor * dv[1];
                break;
            case "translate":
                this.#translations[0] -= this.#translations[2] * this.#translationFactor * dv[0]; //minus equals because the values being recorded are the opposite way that you would expect
                this.#translations[1] += this.#translations[2] * this.#translationFactor * dv[1];
                break;
            case "scale":
                this.#translations[2] *= (this.#scaleFactor * dv[1]);
                break;
        }
        this.#mousePrev = mouseCurr;    //the next time this function is called the previous mouse position needs to be what the current mouse position is so that delta works
        this.#resetting = false;
    }

    scrolling(delta)    //when the scroll wheel has been moved
    {
        this.#translations[2] *= (1.0 - this.#scaleFactor * delta);
    }

    applyProjectionMatrix(P)    //accepts a 4x4 matrix 
    {
        var tempProjMatrix = new Float32Array(16);  //create a 4x4 matrix
        tempProjMatrix = mat4.create(); 
        mat4.perspective(tempProjMatrix, this.fovy, this.aspect, this.znear, this.zfar);    //apply perspective to the matrix
        P.multMatrix(tempProjMatrix);   //multiply that perspective projection onto P
    }

    applyViewMatrix(MV) //accept 4x4 matrix to apply model view matrix
    {
        if(this.#resetting) //moving position back over time
        {
            var alpha = 0.2;
            this.#translations[0] = (1.0 - alpha) * this.#translations[0] + alpha * this.#translationsInit[0];
            this.#translations[1] = (1.0 - alpha) * this.#translations[1] + alpha * this.#translationsInit[1];
            this.#translations[2] = (1.0 - alpha) * this.#translations[2] + alpha * this.#translationsInit[2];
            this.#rotations[0] = (1.0 - alpha) * this.#rotations[0] + alpha * this.#rotationsInit[0];
            this.#rotations[1] = (1.0 - alpha) * this.#rotations[1] + alpha * this.#rotationsInit[1];
        }
        MV.translate(this.#translations[0], this.#translations[1], this.#translations[2]);  //apply translations that have been set
        MV.rotate(this.#rotations[1], this.#rotations[0], 0.0);     //apply rotations that have been set
    }

    applyCameraMatrix(MV)   
    {
        MV.rotate((-1.0 * this.#rotations[1]), (-1.0 * this.#rotations[0]), 0.0);
        MV.translate((-1.0 * this.#translations[0]), (-1.0 * this.#translations[1]), (-1.0 * this.#translations[2]));
    }

    //when the cursor moves
    moveCurr(dx, dy)
    {
        this.#currx += dx;
        this.#curry += dy;
        
        //x cursor tracker
        if(this.#currx < 0) //pushing back around to be at the other side
        {
            this.#currx = this.numx - 1.0;
        }
        else if(this.#currx >= this.numx)
        {
            this.#currx = 0;
        }
        
        //y cursor tracker
        if(this.#curry < 0) //pushing back around to be at the other side
        {
            this.#curry = this.numy - 1.0;
        }
        else if(this.#curry >= this.numy)
        {
            this.#curry = 0;
        }
    }

    reset()
    {
        this.#resetting = true;
    }

    getTranslationInit()    //returns translations initialization
    {
        return this.#translationsInit;
    }

    draw(program)
    {
        var P = new MatrixStack();
        var MV = new MatrixStack();

        P.pushMatrix();
            this.applyProjectionMatrix(P);
            MV.pushMatrix();
                MV.loadIdentity();
                this.applyViewMatrix(MV);

                MV.pushMatrix();
                    MV.translate(this.#translationsInit[0], this.#translationsInit[1], -1.0 * this.#translationsInit[2])
                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());

                    //drawing frustum
                    //need to do the same thing as initializing a shape
                    var z0 = -1.0 * this.znear;
                    var y0 = Math.tan(this.fovy/2.0)*z0;
                    var x0 = y0 * this.aspect;
                    var z1 = -1.0 * this.zfar;
                    var y1 = Math.tan(this.fovy/2.0)*z1;
                    var x1 = y1 * this.aspect;
                    var vertices = [
                        0.0,0.0,0.0,
                        (-1.0 * x1),(-1.0 * y1), z1,
                        0.0,0.0,0.0,
                        (1.0 * x1),(-1.0 * y1), z1,
                        0.0,0.0,0.0,
                        (1.0 * x1),(1.0 * y1), z1,
                        0.0,0.0,0.0,
                        (-1.0 * x1),(1.0 * y1), z1
                    ];

                    //drawing imagePlane
                    //drawing the outside of the frame
                    vertices.push(-x0, -y0, z0);    //top of frame
                    vertices.push(x0, -y0, z0);
                    //bottom of frame
                    vertices.push(-x0, y0, z0);
                    vertices.push(x0, y0, z0);
                    //left side
                    vertices.push(-x0, y0, z0);
                    vertices.push(-x0,-y0, z0);
                    //right side
                    vertices.push(x0, y0, z0);
                    vertices.push(x0,-y0, z0);

                    //loop through the verticle lines
                    for(var i = 1; i < this.numy; i++)
                    {
                        var sy = i/this.numy;
                        var y = (1.0 - sy) * (-1.0 * y0) + sy * y0;
                        vertices.push((-1.0 * x0), y, z0);
                        vertices.push(x0, y, z0);
                    }
                    //loop through the horizontal lines
                    for(var j = 1; j < this.numx; j++)
                    {
                        var sx = j/this.numx;
                        var x = (1.0 - sx) * (-x0) + sx * x0;
                        vertices.push(x, -y0, z0);
                        vertices.push(x, y0, z0);
                    } 

                    //the highlighted square TODO needs to be a differnet color
                    //TODO, make this not showAll
                    if(this.#showAll) {
                        // Highlight selected tile
                        gl.lineWidth(2);
                        var sy = this.#curry/this.numy;
                        var sx = this.#currx/this.numx;
                        var y = (1.0 - sy)*(-y0) + sy*y0;
                        var x = (1.0 - sx)*(-x0) + sx*x0;
                        var dz = 2e-4;
                        var dy = 2.0*y0/this.numy;
                        var dx = 2.0*x0/this.numx;
                        var wiggleRoom = 0.002;
                        vertices.push(x + wiggleRoom, y + wiggleRoom, z0-dz , x+dx + wiggleRoom, y + wiggleRoom, z0-dz );   //top
                        vertices.push(x+dx + wiggleRoom, y+dy + wiggleRoom, z0-dz , x + wiggleRoom, y+dy + wiggleRoom, z0-dz ); //bottom
                        vertices.push(x + wiggleRoom, y + wiggleRoom, z0-dz , x + wiggleRoom, y + dy + wiggleRoom, z0-dz );//right
                        vertices.push(x + dx + wiggleRoom, y + wiggleRoom, z0-dz , x + dx + wiggleRoom, y + dy + wiggleRoom, z0-dz );
                    }
                    
                    
                    // Create an empty buffer object
                    var vertex_buffer = gl.createBuffer();
            
                    // Bind appropriate array buffer to it
                    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
                
                    // Pass the vertex data to the buffer
                    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            
                    // Unbind the buffer
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);

                    // Bind vertex buffer object
                    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

                    // Get the attribute location
                    var coord = program.getAttribute("vertPosition");

                    // Point an attribute to the currently bound VBO
                    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

                    // Enable the attribute
                    gl.enableVertexAttribArray(coord);

                    var lineNo = vertices.length / 3;
                    gl.drawArrays(gl.LINES, 0, lineNo);
                    
                MV.popMatrix();
            MV.popMatrix();
        P.popMatrix();
    }
}