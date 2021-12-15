
var SceneTest = function(program, bunnyModel, SusanModel, viewMatrix, worldMatrix, invertedMatrix, invertedTransposeMatrix, temp)
{
    console.log("entered scene test");
    var xRotationMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);
	var identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	var angle = 0;
	var anglex = 1;
	var angley = 1;

    //rotate everything in frame
    
    angle = performance.now() / 1000 / 6 * 2 * Math.PI;
    mat4.rotate(yRotationMatrix, identityMatrix, angle + anglex, [0, 1, 0]);
    mat4.rotate(xRotationMatrix, identityMatrix, (angle / 4) + angley, [1, 0, 0]);
    mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating the inverse transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);	//getting MV = view * world
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);	//now transpose
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);

    
    //drawing bunny
    bunnyShape.init(bunnyModel);	//doesnt seem to support multiple objects unless they are initialized first
    bunnyShape.draw(program);

    //translation of cylinder
    var translation = vec3.create();
    vec3.set(translation, 0.0, -0.65, 0.0);
    mat4.translate(worldMatrix, worldMatrix, translation);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);
    
    //calculating inverse Transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //drawing cylinder
    testingShape.init(SusanModel);
    testingShape.draw(program);
}

var Scene0 = function(program, planeModel, SusanModel, bunnyModel, viewMatrix, worldMatrix, invertedMatrix, invertedTransposeMatrix, temp)
{
    console.log("entered scene test");
    var xRotationMatrix = new Float32Array(16);
	var zRotationMatrix = new Float32Array(16);
	var identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	var angle = 0;
	var anglex = 0.0 * Math.PI;
	var anglez = 0.5 * Math.PI;

    //rotate everything in frame
    angle = performance.now() / 1000 / 6 * 2 * Math.PI;
    mat4.rotate(zRotationMatrix, identityMatrix, anglez, [0, 0, 1]);
    // mat4.rotate(xRotationMatrix, identityMatrix, (angle / 4) + angley, [1, 0, 0]);
    mat4.rotate(xRotationMatrix, identityMatrix, angle + anglex, [1, 0, 0]);
    mat4.mul(worldMatrix, zRotationMatrix, xRotationMatrix);

    var scalling = vec3.create();
    vec3.set(scalling, 1.5, 1.5, 1.5);
    mat4.scale(worldMatrix, worldMatrix, scalling);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating the inverse transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);	//getting MV = view * world
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);	//now transpose
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);

    
    gl.uniform3f(testingProgram.getUniform("kd"), 0.3, 0.3, 0.3);
    //coloring
    gl.uniform1f(testingProgram.getUniform("s"), 100.0);
    //translation of plane
    var translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, 0.5);
    mat4.translate(worldMatrix, worldMatrix, translation);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //rotate to flip 180
    mat4.rotate(worldMatrix, worldMatrix, -1 * Math.PI, [0, 1, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);
    //calculating the inverse transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);	//getting MV = view * world
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);	//now transpose
    // mat4.rotate(worldMatrix, worldMatrix, angle, [0, 0, 1]);
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //coloring
    gl.uniform3f(testingProgram.getUniform("kd"), 0.0, 0.3, 0.0);

    //drawing plane
    bunnyShape.init(planeModel);	//doesnt seem to support multiple objects unless they are initialized first
    bunnyShape.draw(program);

    //ratation back of plane
    mat4.rotate(worldMatrix, worldMatrix, 1 * Math.PI, [0, 1, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);
    //translation of plane
    var translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, -2.0);
    mat4.translate(worldMatrix, worldMatrix, translation);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating the inverse transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);	//getting MV = view * world
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);	//now transpose
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //coloring
    gl.uniform3f(testingProgram.getUniform("kd"), 0.3, 0.0, 0.0);
    //drawing plane
    bunnyShape.init(planeModel);	//doesnt seem to support multiple objects unless they are initialized first
    bunnyShape.draw(program);

    //translation of plane
    var translation = vec3.create();
    vec3.set(translation, 0.0, 1.0, 1.0);   //undo translation on z
    mat4.translate(worldMatrix, worldMatrix, translation);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);
    //ratation back of plane
    mat4.rotate(worldMatrix, worldMatrix, 0.5 * Math.PI, [1, 0, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating the inverse transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);	//getting MV = view * world
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);	//now transpose
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //coloring
    gl.uniform3f(testingProgram.getUniform("kd"), 0.5, 0.5, 0.5);
    //drawing plane
    bunnyShape.init(planeModel);	//doesnt seem to support multiple objects unless they are initialized first
    bunnyShape.draw(program);

    //UNDO
    //ratation back of plane to undo
    mat4.rotate(worldMatrix, worldMatrix, -0.5 * Math.PI, [1, 0, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);
    //translation of plane 
    var translation = vec3.create();
    vec3.set(translation, 0.0, -2.0, 0.0);   //undo translation on z
    mat4.translate(worldMatrix, worldMatrix, translation);
    //ratation back of plane
    mat4.rotate(worldMatrix, worldMatrix, -0.5 * Math.PI, [1, 0, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating the inverse transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);	//getting MV = view * world
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);	//now transpose
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //coloring
    gl.uniform3f(testingProgram.getUniform("kd"), 0.8, 0.8, 0.8);
    //drawing plane
    bunnyShape.init(planeModel);	//doesnt seem to support multiple objects unless they are initialized first
    bunnyShape.draw(program);

    //UNDO
    //ratation back of plane to undo
    mat4.rotate(worldMatrix, worldMatrix, 0.5 * Math.PI, [1, 0, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);
    //translation of plane 
    var translation = vec3.create();
    vec3.set(translation, 0.0, 1.0, 0.0);   //undo translation on z
    mat4.translate(worldMatrix, worldMatrix, translation);
    //ACTUAL TRANSFORMATION
    //translation of plane 
    var translation = vec3.create();
    vec3.set(translation, 1.0, 0.0, 0.0);   //undo translation on z
    mat4.translate(worldMatrix, worldMatrix, translation);
    //ratation back of plane
    mat4.rotate(worldMatrix, worldMatrix, -0.5 * Math.PI, [0, 1, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating the inverse transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);	//getting MV = view * world
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);	//now transpose
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //coloring
    gl.uniform3f(testingProgram.getUniform("kd"), 0.8, 0.8, 0.8);

    //drawing plane
    bunnyShape.init(planeModel);	//doesnt seem to support multiple objects unless they are initialized first
    bunnyShape.draw(program);

    //UNDO
    //ratation back of plane to undo
    mat4.rotate(worldMatrix, worldMatrix, 0.5 * Math.PI, [0, 1, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);
    //translation of plane 
    var translation = vec3.create();
    vec3.set(translation, -1.0, 0.0, 0.0);   //undo translation on z
    mat4.translate(worldMatrix, worldMatrix, translation);
    //OK, NOW START TRANSFORMING
    //translation of plane 
    var translation = vec3.create();
    vec3.set(translation, -1.0, 0.0, 0.0);   //undo translation on z
    mat4.translate(worldMatrix, worldMatrix, translation);
    //ratation back of plane
    mat4.rotate(worldMatrix, worldMatrix, 0.5 * Math.PI, [0, 1, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating the inverse transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);	//getting MV = view * world
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);	//now transpose
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //coloring
    gl.uniform3f(testingProgram.getUniform("kd"), 0.5, 0.5, 0.5);

    //drawing plane
    bunnyShape.init(planeModel);	//doesnt seem to support multiple objects unless they are initialized first
    bunnyShape.draw(program);


    
    //translation of cylinder
    var translation = vec3.create();
    vec3.set(translation, 0.5, 0.0, 1.0);
    mat4.translate(worldMatrix, worldMatrix, translation);
    // gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //scale
    var scalling = vec3.create();
    vec3.set(scalling, 0.25, 0.25, 2);
    mat4.scale(worldMatrix, worldMatrix, scalling);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating inverse Transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //coloring
    gl.uniform3f(testingProgram.getUniform("kd"), 0.0, 0.0, 0.3);
    //drawing cylinder
    testingShape.init(SusanModel);
    testingShape.draw(program);


    //UNDO
    //scale
    var scalling = vec3.create();
    vec3.set(scalling, 4.0, 4.0, 0.5);
    mat4.scale(worldMatrix, worldMatrix, scalling);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);
    //translation of cylinder
    var translation = vec3.create();
    vec3.set(translation, -0.5, 0.0, -1.0);
    mat4.translate(worldMatrix, worldMatrix, translation);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //START TRANSFORMING
    //translation of cylinder
    var translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, -0.1);
    mat4.translate(worldMatrix, worldMatrix, translation);
    // gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //ratation back of plane to undo
    mat4.rotate(worldMatrix, worldMatrix, 0.5 * Math.PI, [1, 0, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //scale
    var scalling = vec3.create();
    vec3.set(scalling, 0.25, 0.25, 0.25);
    mat4.scale(worldMatrix, worldMatrix, scalling);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating inverse Transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    
    //coloring
    gl.uniform3f(testingProgram.getUniform("kd"), 0.8, 0.5, 0.5);
    //drawing cylinder
    testingShape.init(bunnyModel);
    testingShape.draw(program);

    //UNDO
    //scale
    var scalling = vec3.create();
    vec3.set(scalling, 4.0, 4.0, 4.0);
    mat4.scale(worldMatrix, worldMatrix, scalling);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //ratation back of plane to undo
    mat4.rotate(worldMatrix, worldMatrix, -0.5 * Math.PI, [1, 0, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //translation of cylinder
    var translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, 0.1);
    mat4.translate(worldMatrix, worldMatrix, translation);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //START TRANSFORMING
    //translation of cylinder
    var translation = vec3.create();
    vec3.set(translation, -0.5, 0.5, -0.1);
    mat4.translate(worldMatrix, worldMatrix, translation);
    // gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //ratation back of plane to undo
    mat4.rotate(worldMatrix, worldMatrix, 0.5 * Math.PI, [1, 0, 0]);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //scale
    var scalling = vec3.create();
    vec3.set(scalling, 0.35, 0.35, 0.35);
    mat4.scale(worldMatrix, worldMatrix, scalling);
    gl.uniformMatrix4fv(program.getUniform("mWorld"), gl.FALSE, worldMatrix);

    //calculating inverse Transpose matrix
    mat4.multiply(temp, viewMatrix, worldMatrix);
    mat4.invert(invertedMatrix, temp);	//invert
    mat4.transpose(invertedTransposeMatrix, invertedMatrix);
    gl.uniformMatrix4fv(program.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
    gl.uniform3f(testingProgram.getUniform("kd"), 0.3, 0.0, 0.0);
    //drawing cylinder
    testingShape.init(bunnyModel);
    testingShape.draw(program);
}

var Scene1 = function(camera, program, bunnyModel, SusanModel)
{
    console.log("entered scene 1");
    P = new MatrixStack();
    MV = new MatrixStack();

    P.pushMatrix();
        camera.applyProjectionMatrix(P);
        MV.pushMatrix();
            MV.loadIdentity();
            camera.applyViewMatrix(MV);

            // angle = performance.now() / 1000 / 6 * 2 * Math.PI;
            //     MV.rotate(angle, angle, 0.0);

            MV.pushMatrix();
                // MV.translate(0.0, 0.0, -10.0);
                gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                gl.uniform1f(testingProgram.getUniform("s"), 5.0);
                //drawing bunny
                bunnyShape.init(bunnyModel);	//doesnt seem to support multiple objects unless they are initialized first
                bunnyShape.draw(program);
            MV.popMatrix();

            MV.pushMatrix();
                MV.translate(0.0, -0.65, 0.0);
                gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                gl.uniform1f(testingProgram.getUniform("s"), 100.0);
                //drawing bunny
                testingShape.init(SusanModel);	//doesnt seem to support multiple objects unless they are initialized first
                testingShape.draw(program);
            MV.popMatrix();
        MV.popMatrix();
    P.popMatrix();
}