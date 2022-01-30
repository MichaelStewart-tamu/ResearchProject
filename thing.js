class thing
{
    //public variables
    scaleX;
    scaleY;
    scaleZ;
    posX;
    posY;
    posZ;
    rotX;
    rotY;
    rotZ;
    shape;
    material;


    constructor(s)
    {
        this.scaleX = 1.0;  //vec3's do not work the same as in c++, so I have assigned these as individual variables and will use functions to easily edit them
        this.scaleY = 1.0;
        this.scaleZ = 1.0;
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
        this.rotX = 1.0;
        this.rotY = 0.0;
        this.rotZ = 0.0;
        this.shape = s;
        this.material = new Material();
    }

    resetScale(x, y, z) //changing all values of scale all at once
    {
        this.scaleX = x;  
        this.scaleY = y;
        this.scaleZ = z;
    }

    resetPosition(x, y, z)  //changing all values of position all at once
    {
        this.posX = x;
        this.posY = y;
        this.posZ = z;
    }

    resetRotation(x, y, z)  //changing all values of rotation all at once
    {
        this.rotX = x;
        this.rotY = y;
        this.rotZ = z;
    }


    draw(MV, prog)
    {
        this.material.applyGL(prog)
        MV.pushMatrix();
            MV.pushMatrix();    //to get the E matrix
                MV.loadIdentity();
                MV.translate(this.posX, this.posY, this.posZ);
                MV.rotate(this.rotX, this.rotY, this.rotZ); //in c++ there is an angle and then defining the axis that is edited, but by default only the x-axis is angled, my function just accepts the angle adjustments on each axis 
                MV.scale(this.scaleX, this.scaleY, this.scaleZ);
                var E = MV.topMatrix();
            MV.popMatrix();
            MV.multMatrix(E);
            gl.uniformMatrix4fv(prog.getUniform("MV"), gl.FALSE, MV.topMatrix());
            gl.uniformMatrix4fv(prog.getUniform("MVit"), gl.FALSE, MV.topMatrixIT());
            this.shape.draw(prog);
        MV.popMatrix();
    }

    getMatrices()
    {
        //do not have toRotationMatrix which is in the .cpp eigen library, so I am going to have to reproduce it myself
        //going to go out on a limb here and say that it is just applying the transforms in order
        let tmpALL = new MatrixStack();

        //apply everything to tmpALL first, this means first apply translations, then rotations, then scale
        tmpALL.translate(this.posX, this.posY, this.posZ);
        tmpALL.rotate(this.rotX, this.rotY, this.rotZ);
        tmpALL.scale(this.scaleX, this.scaleY, this.scaleZ);

        //after this compute varients and output
        return tmpALL.topMatrix();
    }
}

