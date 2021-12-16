var Scene0 = function(camera, program, Bunny, Cylinder, Plane, light0)
{
    P = new MatrixStack();
    MV = new MatrixStack();

    //set light position
    light0.position[0] = -0.3;
    light0.position[1] = 0.6;
    light0.position[2] = 0.3;

    P.pushMatrix();
        camera.applyProjectionMatrix(P);
        MV.pushMatrix();
            MV.loadIdentity();
            camera.applyViewMatrix(MV);

            MV.pushMatrix();
                //light
                MV.pushMatrix();
                    MV.scale(0.5, 0.5, 0.5);
                    light0.draw(MV, program);
                MV.popMatrix();

                //cylinder
                MV.pushMatrix();
                    MV.rotate(-0.5 * Math.PI, 0.0, 0.0);
                    MV.scale(0.2, 0.2, 2.0);
                    MV.translate(0.25, 0.1, 0.0);   //y and z flipped

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.2, 0.2, 0.1);
                    gl.uniform3f(program.getUniform("ks"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 100.0);

                    Cylinder.draw(program);
                MV.popMatrix();

                //plane bottom
                MV.pushMatrix();
                    MV.translate(0.0, -1.0, 0.0);
                    MV.rotate(-0.5 * Math.PI, 0.0, 0.0);
                    MV.scale(1.0, 1.0, 1.0);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 0.0, 0.0, 0.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 200.0);

                    Plane.draw(program);
                MV.popMatrix();

                //plane top
                MV.pushMatrix();
                    MV.translate(0.0, 1.0, 0.0);
                    MV.rotate(0.5 * Math.PI, 0.0, 0.0);
                    MV.scale(1.0, 1.0, 1.0);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 0.0, 0.0, 0.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 200.0);

                    Plane.draw(program);
                MV.popMatrix();

                //plane back
                MV.pushMatrix();
                    MV.translate(0.0, 0.0, -1.0);
                    // MV.rotate(0.5 * Math.PI, 0.0, 0.0);
                    MV.scale(1.0, 1.0, 1.0);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 0.0, 0.0, 0.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 200.0);

                    Plane.draw(program);
                MV.popMatrix();

                //plane left
                MV.pushMatrix();
                    MV.translate(-1.0, 0.0, 0.0);
                    MV.rotate(0.0, 0.5 * Math.PI, 0.0);
                    MV.scale(1.0, 1.0, 1.0);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 1.0, 0.0, 0.0);
                    gl.uniform3f(program.getUniform("ks"), 0.0, 0.0, 0.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 200.0);

                    Plane.draw(program);
                MV.popMatrix();

                //plane right
                MV.pushMatrix();
                    MV.translate(1.0, 0.0, 0.0);
                    MV.rotate(0.0, -0.5 * Math.PI, 0.0);
                    MV.scale(1.0, 1.0, 1.0);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.0, 1.0, 0.0);
                    gl.uniform3f(program.getUniform("ks"), 0.0, 0.0, 0.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 200.0);

                    Plane.draw(program);
                MV.popMatrix();

            MV.popMatrix();
        MV.popMatrix();
    P.popMatrix();
}

var Scene1 = function(camera, program, Bunny, Cylinder, light)
{
    P = new MatrixStack();
    MV = new MatrixStack();

    //light
    gl.uniform3f(testingProgram.getUniform("lPos0"), -5.0, 5.0, 5.0);

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
                gl.uniform1f(program.getUniform("s"), 5.0);
                //drawing bunny
                Bunny.draw(program);
            MV.popMatrix();

            MV.pushMatrix();
                MV.translate(0.0, -0.65, 0.0);
                gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                gl.uniform1f(program.getUniform("s"), 100.0);
                //drawing bunny
                Cylinder.draw(program);
            MV.popMatrix();
        MV.popMatrix();
    P.popMatrix();
}

var Scene2 = function(camera, program, Bunny, Cylinder, light0)
{
    P = new MatrixStack();
    MV = new MatrixStack();

    //set light position
    light0.position[0] = 1.0;
    light0.position[2] = 1.0;

    P.pushMatrix();
        camera.applyProjectionMatrix(P);
        MV.pushMatrix();
            MV.loadIdentity();
            camera.applyViewMatrix(MV);

            //light
            MV.pushMatrix();
                light0.draw(MV, program);
            MV.popMatrix();

            MV.pushMatrix();
                // MV.translate(0.0, 0.0, -10.0);
                gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                gl.uniform1f(program.getUniform("s"), 100.0);
                //drawing bunny
                Bunny.draw(program);
            MV.popMatrix();

            MV.pushMatrix();
                MV.translate(0.0, -0.65, 0.0);
                gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                gl.uniform1f(program.getUniform("s"), 100.0);
                //drawing bunny
                Cylinder.draw(program);
            MV.popMatrix();
        MV.popMatrix();
    P.popMatrix();
}

var Scene6 = function(camera, program, Bunny, light0)
{
    P = new MatrixStack();
    MV = new MatrixStack();

    //set light position
    light0.position[0] = -1.0;
    light0.position[0] = 1.0;
    light0.position[2] = 1.0;

    P.pushMatrix();
        camera.applyProjectionMatrix(P);
        MV.pushMatrix();
            MV.loadIdentity();
            camera.applyViewMatrix(MV);

            //light
            MV.pushMatrix();
                MV.scale(0.5, 0.5, 0.5);
                light0.draw(MV, program);
            MV.popMatrix();

            MV.pushMatrix();
                    // MV.translate(0.3, 1.5, 1.0);
                    // MV.rotate(0.0, (20/180) * Math.PI, 0.0);
                    // MV.scale(1.5, 1.5, 1.5);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.0, 0.0, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 1.0, 1.0, 0.5);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 100.0);

                    Bunny.draw(program);
                MV.popMatrix();
        MV.popMatrix();
    P.popMatrix();
}

var Scene7 = function(camera, program, Bunny, light0)
{
    P = new MatrixStack();
    MV = new MatrixStack();

    //set light position
    light0.position[0] = 1.0;
    light0.position[0] = 1.0;
    light0.position[2] = 2.0;

    P.pushMatrix();
        camera.applyProjectionMatrix(P);
        MV.pushMatrix();
            MV.loadIdentity();
            camera.applyViewMatrix(MV);

            //light
            MV.pushMatrix();
                MV.scale(0.5, 0.5, 0.5);
                light0.draw(MV, program);
            MV.popMatrix();

            MV.pushMatrix();
                    MV.translate(0.3, -1.5, 0.0);
                    MV.rotate(0.0, (20/180) * Math.PI, 0.0);
                    MV.scale(1.5, 1.5, 1.5);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.0, 0.0, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 1.0, 1.0, 0.5);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 100.0);

                    Bunny.draw(program);
                MV.popMatrix();
        MV.popMatrix();
    P.popMatrix();
}