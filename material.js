class Material
{
    //public variables
    type;
    //difuse
    kdr;    //red
    kdg;    //green
    kdb;    //blue
    //specular
    ksr;    //red
    ksg;    //green
    ksb;    //blue
    //ambient
    kar;    //red
    kag;    //green
    kab;    //blue
    s;  //specular exponent
    n;  //index of refraction

    constructor()
    {
        this.type = "PHONG";
        this.kdr = 0.0;  //diffuse
        this.kdg = 0.0;
        this.kdb = 0.0;
        this.ksr = 0.0;  //specular
        this.ksg = 0.0;
        this.ksb = 0.0;
        this.kar = 1.0;  //ambient
        this.kag = 1.0;
        this.kab = 1.0;
        this.s = 1.0;
        this.n = 1.1;
    }

    setKD(x, y, z) //changing all values of KD all at once
    {
        this.kdr = x;  
        this.kdg = y;
        this.kdb = z;
    }

    setKS(x, y, z)  //changing all values of KS all at once
    {
        this.ksr = x;  
        this.ksg = y;
        this.ksb = z;
    }

    setKA(x, y, z)  //changing all values of KA all at once
    {
        this.kar = x;  
        this.kag = y;
        this.kab = z;
    }

    applyGL(shadingProgram)
    {
        if(this.type === "PHONG")    //default from constructor
        {
            gl.uniform3f(shadingProgram.getUniform("kd"), this.kdr, this.kdg, this.kdb);
            gl.uniform3f(shadingProgram.getUniform("ks"), this.ksr,this.ksg, this.ksb);
            gl.uniform3f(shadingProgram.getUniform("ka"), this.kar, this.kag, this.kab);
            gl.uniform1f(shadingProgram.getUniform("s"), this.s);
            gl.uniform1f(shadingProgram.getUniform("alpha"), 1.0);
        }
        else if(this.type === "REFLECT")
        {
            gl.uniform3f(shadingProgram.getUniform("kd"), 0.5, 0.5, 0.5);
            gl.uniform3f(shadingProgram.getUniform("ks"), 1.0, 1.0, 0.5);
            gl.uniform3f(shadingProgram.getUniform("ka"), 0.0, 0.0, 0.0);
            gl.uniform1f(shadingProgram.getUniform("s"), 50.0);
            gl.uniform1f(shadingProgram.getUniform("alpha"), 1.0);
        }
        else if(this.type === "REFRACT")
        {
            gl.uniform3f(shadingProgram.getUniform("kd"), 1.0, 1.0, 1.0);
            gl.uniform3f(shadingProgram.getUniform("ks"), 1.0, 1.0, 0.5);
            gl.uniform3f(shadingProgram.getUniform("ka"), 0.5, 0.5, 0.5);
            gl.uniform1f(shadingProgram.getUniform("s"), 200.0);
            gl.uniform1f(shadingProgram.getUniform("alpha"), 0.3);
        }
        else
        {
            console.log("inside of materials applyGL function you have not entered a material option");
        }
    }

    applyDS(vPos, vNor, light, cPos, color) //TODO: come back to this when doing scene
    {
        
    }

    copy(that)
    {
        this.type = that.type;
        //defuse
        this.kdr = that.kdr;
        this.kdg = that.kdg;
        this.kdb = that.kdb;
        //ambient
        this.kar = that.kar;
        this.kag = that.kag;
        this.kab = that.kab;
        //specular
        this.ksr = that.ksr;
        this.ksg = that.ksg;
        this.ksb = that.ksb;

        this.s = that.s;
        this.n = that.n;
    }

}