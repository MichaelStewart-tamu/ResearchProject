var Scene0 = function(camera, program, sphere, Cylinder, Plane, light0)
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

                //sphere1
                MV.pushMatrix();
                    MV.translate(-0.5, -0.75, 0.0);
                    MV.rotate(0.0, 0.0, 0.0);
                    MV.scale(0.5, 0.5, 0.5);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.5, 0.0, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 50.0);

                    sphere.draw(program);
                MV.popMatrix();

                //sphere2
                MV.pushMatrix();
                    MV.translate(0.5, -0.75, 0.3);
                    MV.rotate(0.0, 0.0, 0.0);
                    MV.scale(0.5, 0.5, 0.5);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.1, 0.5, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 50.0);

                    sphere.draw(program);
                MV.popMatrix();

                //sphere3
                MV.pushMatrix();
                    MV.translate(-0.1, -0.75, 0.43);
                    MV.rotate(0.0, 0.0, 0.0);
                    MV.scale(0.5, 0.5, 0.5);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.3, 0.5, 0.2);
                    gl.uniform3f(program.getUniform("ks"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 50.0);

                    sphere.draw(program);
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
                gl.uniform3f(program.getUniform("kd"), 1.0, 1.0, 1.0);
                gl.uniform3f(program.getUniform("ks"), 0.0, 0.0, 0.0);
                gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
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
                gl.uniform3f(program.getUniform("kd"), 1.0, 1.0, 1.0);
                gl.uniform3f(program.getUniform("ks"), 0.0, 0.0, 0.0);
                gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
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

var Scene3 = function(camera, program, teapot, eva, light0)
{
    P = new MatrixStack();
    MV = new MatrixStack();

    //set light position
    light0.position[0] = 0.3;
    light0.position[1] = 1.6;
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

                //eva
                MV.pushMatrix();
                    MV.translate(0.0, -1.5, 0.0);
                    MV.rotate(0.0, 0.0, 0.0);
                    MV.scale(1.0, 1.0, 1.0);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.5, 0.0, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 50.0);

                    eva.draw(program);
                MV.popMatrix();
            MV.popMatrix();
        MV.popMatrix();
    P.popMatrix();
}

var Scene4 = function(camera, program, teapot, eva, light0)
{
    P = new MatrixStack();
    MV = new MatrixStack();

    //set light position
    light0.position[0] = 0.3;
    light0.position[1] = 1.6;
    light0.position[2] = 2.3;

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

                //teapot
                MV.pushMatrix();
                    MV.translate(0.0, -0.5, 0.0);
                    MV.rotate(0.0, -2.8, 0.0);
                    MV.scale(1.8, 1.8, 1.8);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.5, 0.5, 0.5);
                    gl.uniform3f(program.getUniform("ks"), 0.5, 0.5, 0.5);
                    gl.uniform3f(program.getUniform("ka"), 0.2, 0.2, 0.2);
                    gl.uniform1f(program.getUniform("s"), 5.0);

                    teapot.draw(program);
                MV.popMatrix();

            MV.popMatrix();
        MV.popMatrix();
    P.popMatrix();
}

var Scene5 = function(camera, program, teapot, eva, light0)
{
    P = new MatrixStack();
    MV = new MatrixStack();

    //set light position
    light0.position[0] = 0.3;
    light0.position[1] = 1.6;
    light0.position[2] = 2.3;

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

                angle = performance.now() / 1000 / 6 * 2 * Math.PI;
                MV.rotate(0.0, angle, 0.0);

                //eva
                MV.pushMatrix();
                    MV.translate(-0.5, -1.5, 0.0);
                    MV.rotate(0.0, 0.0, 0.0);
                    MV.scale(1.0, 1.0, 1.0);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.5, 0.0, 1.0);
                    gl.uniform3f(program.getUniform("ks"), 1.0, 1.0, 1.0);
                    gl.uniform3f(program.getUniform("ka"), 0.1, 0.1, 0.1);
                    gl.uniform1f(program.getUniform("s"), 50.0);

                    eva.draw(program);
                MV.popMatrix();

                //teapot
                MV.pushMatrix();
                    MV.translate(0.5, -1.5, 0.0);
                    MV.rotate(0.0, -2.8, 0.0);
                    MV.scale(0.5, 0.5, 0.5);
                    

                    gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MV"), gl.FALSE, MV.topMatrix());
                    gl.uniformMatrix4fv(program.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
                    gl.uniform3f(program.getUniform("kd"), 0.5, 0.5, 0.5);
                    gl.uniform3f(program.getUniform("ks"), 0.5, 0.5, 0.5);
                    gl.uniform3f(program.getUniform("ka"), 0.2, 0.2, 0.2);
                    gl.uniform1f(program.getUniform("s"), 5.0);

                    teapot.draw(program);
                MV.popMatrix();

                //testing
                testing = new thing(teapot);
                testing.resetPosition(-1.2, -1.3, -1.0)
                testing.resetScale(1.2, 0.8, 1.0);
                testing.resetRotation(1.5, 0.5, 0.450);
                testing.material.setKA(0.2, 0.0, 0.0);
                testing.material.setKD(0.5, 0.0, 0.0);
                testing.material.setKS(1.0, 1.0, 1.0);
                testing.material.s = 50.0;
                testing.material.applyGL(program);
                testing.draw(MV, program);
                
                //end of testing

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