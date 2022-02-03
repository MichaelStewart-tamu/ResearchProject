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
        this.numx = 2;
        this.numy = 2;
        this.#currx = 0;
        this.#curry = 0;
        this.#showAll = false;
        this.currentlyClicking = false;
        this.shiftBool = false;
        this.keyNumber = 0;
        //TODO: comeback later
        this.#colors = Array.from(Array(this.numx), () => new Array(this.numy)); //a vector of vectors of 3 coordinates, so an 2d array for storing vectors containg RGB values
        // this.#rayPts = [];   //a vector of vectors of vectors of 3d points, so a 2d array of vectors storing all points along the path of a raytrace.
        // for(var i = 0; i < this.numx; i++)
        // {
        //     this.#rayPts[i] = [];   //inserting the y axis 
        //     // for(var j = 0; j = this.numy; j++)
        //     // {
        //     //     this.#rayPts[i][j] = [];
        //     // }
        // }
        this.#rayPts = Array.from(Array(this.numx), () => new Array(this.numy))
        console.log("now outputing the constructor for rayPts", this.#rayPts);
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

    toggleShowAll()
    {
        this.#showAll = !this.#showAll;
    }

    draw(MV, program)
    {
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
            if(this.#showAll === false) {
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


            //draw rays in world space
            if(this.#showAll === true)
            {
                //draw all in white
                for(var i = 0; i < this.numy; i++)
                {
                    for(var j = 0; j < this.numx; j++)
                    {
                        for(var k = 1; k < this.#rayPts[i][j].length; k++)
                        {
                            vertices.push(this.#rayPts[i][j][k - 1][0], this.#rayPts[i][j][k - 1][1], this.#rayPts[i][j][k - 1][2]);    //push the starting point of the line
                            vertices.push(this.#rayPts[i][j][k][0], this.#rayPts[i][j][k][1], this.#rayPts[i][j][k][2]);                //push the ending point of the line
                        }
                    }
                }
            }
            else    //draw just one line TODO: come back and finish, this is just a simple to see the result
            {
                console.log("inside camera", this.#rayPts[0][0]);
                if(this.#rayPts[0][0] != undefined)
                {
                    let rayPtsCurr = this.#rayPts[this.#curry][this.#currx];
                    vertices.push(rayPtsCurr[0][0], rayPtsCurr[0][1], rayPtsCurr[0][2]);
                    vertices.push(rayPtsCurr[1][0], rayPtsCurr[1][1], rayPtsCurr[1][2]);
                }
                
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
    }

    //will return a vector of 3d point vectors
    getRays(numx, numy)
    {
        var z1 = -1 * this.zfar;
        var y1 = Math.tan(this.fovy/2.0) * z1;
        var x1 = y1 * this.aspect;
        let rays = [];  //vector of 3d points which are in vec3's
        let ray0 = vec4.create();
        ray0 = vec4.fromValues(0.0, 0.0, 0.0, 1.0);
        let ray03x1 = vec3.create();
        ray03x1 = vec3.fromValues(0.0, 0.0, 0.0);

        let E = new MatrixStack();
        // this.applyProjectionMatrix(R);
        E.translate((-1.0 * this.#translationsInit[0]), (-1.0 * this.#translationsInit[1]), (-1.0 * this.#translationsInit[2]));
        E.rotate((-1.0 * this.#rotationsInit[1]), (-1.0 * this.#rotationsInit[0]), 0.0);
        let tempFirst = vec3.create();
        vec3.transformMat4(tempFirst, ray03x1, E.topMatrix());  //calculating the initial ray
        rays.push(tempFirst);

        //now reduce to 3x3
        let R = mat3.create();
        mat3.fromMat4(R, E.topMatrix());
        // console.log("output from reducing the 3x3 matrix", R, "the original", E);



        //now computing the rays for the x,y tiles
        let ray1 = vec3.create();
        let tempSub = vec3.create();
        let tempNorm = vec3.create();
        

        // for(int i = 0; i < numy; ++i) {
        for(var i = 0; i < numy; i++)
        {
            // double sy = (i + 0.5)/numy;
            var sy = (i + 0.5) / numy;

            // double y = (1.0 - sy)*(-y1) + sy*y1;
            var y = (1.0 - sy) * (-1.0 * y1) + sy * y1;

            // for(int j = 0; j < numx; ++j) {
            for(var j = 0; j < numx; j++)
            {
                // 	double sx = (j + 0.5)/numx;
                var sx = (j + 0.5) / numx;

                // 	double x = (1.0 - sx)*(-x1) + sx*x1;
                var x = (1.0 - sx) * (-1.0 * x1) + sx * x1;

                // 	Vector4d ray1(x, y, z1, 1.0); // in camera space
                ray1 = vec3.fromValues(x, y, z1);

                // 	Vector3d ray = (ray1.segment<3>(0) - ray0.segment<3>(0)).normalized();
                vec3.subtract(tempSub, ray1, ray03x1);
                vec3.normalize(tempNorm, tempSub);
                // 	rays.push_back(R*ray);
                let tempMult = vec3.create();
                vec3.transformMat3(tempMult, tempNorm, R);
                rays.push(tempMult);
            }
        }
	return rays;
    }

    raytrace(scene)
    {
        console.log("entered ray trace function");
        let writeToFile = false;

        // bool writeToView = true;
        let writeToView = true;

        // if(writeToFile)
        if(writeToFile === true)
        {
            //     // Write to image file
            //     auto image = make_shared<Image>(width, height);
            //     auto rays = getRays(width, height);
            //     const auto &rayOrig = rays[0];
            //     int k = 1;
            //     for(int i = 0; i < height; ++i)
            //     {
            //         int y = height - i - 1;
            //         for(int j = 0; j < width; ++j)
            //         {
            //             int x = width - j - 1;
            //             const auto &rayDir = rays[k++];
            //             Vector3d color(0.0, 0.0, 0.0);
            //             vector<Vector3d> points = scene->trace(shared_from_this(), rayOrig, rayDir, color, 0, 1.0, false);
            //             unsigned char r = 255*color(0);
            //             unsigned char g = 255*color(1);
            //             unsigned char b = 255*color(2);
            //             image->setPixel(x, y, r, g, b);
            //         }
            //     }
            //     image->writeToFile(filename);
        }

        
        // if(writeToView)
        if(writeToView === true)
        {
            console.log("have entered the write to view section");
            //Write to camera image
            
            //     auto rays = getRays(numx, numy);
            let rays = this.getRays(this.numx, this.numy)
            //     const auto &rayOrig = rays[0];
            let rayOrigin = rays[0];

            //     int k = 1;
            var k = 1;
            
            //     for(int i = 0; i < numy; ++i)
            for(var i = 0; i < this.numy; i++)
            {
                //         for(int j = 0; j < numx; ++j)
                for(var j = 0; j < this.numx; j++)
                {
                    //const auto &rayDir = rays[k++];
                    let rayDir = rays[k++];

                    //Vector3d color(0.0, 0.0, 0.0);
                    //pack into an object the values
                    let color = vec3.create();
                    color = vec3.fromValues(0.0, 0.0, 0.0);
                    let sceneObj = {
                        rayOrig: rayOrigin,
                        rayDir: rayDir,
                        color: color,
                        depth: 0,
                        n0: 1.0,
                        storePoints: true
                    };
                    //vector<Vector3d> points = scene->trace(shared_from_this(), rayOrig, rayDir, color, 0, 1.0, true);
                    
                    
                    let points = scene.trace(this, sceneObj);
                    
                    if(sceneObj.color[0] > 0.0)
                    {
                        console.log(i, j, "has returned a red value", sceneObj.color);
                    }
                    
                    vec3.copy(color, sceneObj.color);
                    this.#colors[i][j] = color;
                    // console.log("made it to this point in raytrace camera", color);
                    //rayPts[i][j].clear();   //???WHY, maybe to remove anything from before
                    //rayPts[i][j] = points;
                    this.#rayPts[i][j] = points;
                }

            }
            console.log("made it to this point in raytrace camera", this.#colors, this.#rayPts);
        }
    }
}