class thing
{
    //public variables
    scaleX;
    scaleY;
    scaleZ;
    posX;
    posY;
    posZ;
    angleRotation;
    rotX;
    rotY;
    rotZ;
    shape;
    material;


    constructor(s)
    {
        this.scaleX = 1.0;
        this.scaleY = 1.0;
        this.scaleZ = 1.0;
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
        this.angleRotation = 0.0;
        this.rotX = 1.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        this.shape = s;
        this.material

    }

    draw(MV, prog)
    {
        //material->applyGL(prog)
        MV.pushMatrix();
            MV.pushMatrix();    //to get the E matrix
                MV.loadIdentity();
                MV.translate(this.posX, this.posY, this.posZ);
                angle = this.angleRotation;
                MV.rotate(angle, this.rotY, this.rotZ); //in c++ there is an angle and then defining the axis that is edited, but by default only the x-axis is angled, my function just accepts the angle adjustments on each axis 
                MV.scale(this.scaleX, this.scaleY, this.scaleZ);
                var E = MV.topMatrix();
            MV.popMatrix();
            MV.multMatrix(E);
            gl.uniformMatrix4fv(prog.getUniform("MV"), gl.FALSE, MV.topMatrix());
            gl.uniformMatrix4fv(prog.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
            gl.uniform3f(prog.getUniform("kd"), 0.5, 0.0, 1.0);  //temporary for testing
            gl.uniform3f(prog.getUniform("ks"), 1.0, 1.0, 1.0);
            gl.uniform3f(prog.getUniform("ka"), 0.1, 0.1, 0.1);
            gl.uniform1f(prog.getUniform("s"), 50.0);
            this.shape.draw(prog);
        MV.popMatrix();
    }

    getMatrices(E, Ei, Eit)
    {
        //do not have toRotationMatrix which is in the .cpp eigen library, so I am going to have to reproduce it myself
        //going to go out on a limb here and say that it is just applying the transforms in order
        tmpALL = new MatrixStack();
        tmpInverse = new MatrixStack();
        tmpInverseTranspose = new MatrixStack();

        //apply everything to tmpALL first, this means first apply translations, then rotations, then scale
        tmpALL.translate(this.posX, this.posY, this.posZ);
        tmpALL.rotate(this.rotX, this.rotY, this.rotZ);
        tmpALL.scale(this.scaleX, this.scaleY, this.scaleZ);

        //after this compute varients and output
        E = tmpALL.topMatrix();
        Ei = tmpALL.topMatrixI();
        Eit = tmpALL.topMatrixIT();
    }
}

