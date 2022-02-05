

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
        let lPos = vec3.fromValues(light.position[0], light.position[1], light.position[2]);
        let lInt = light.intesity;
        let n = vec3.create();
        vec3.normalize(n, vNor);
        // Vector3d l = (lPos - vPos).normalized();
        let l = vec3.create();
        let lposMinusVPos = vec3.create();
        vec3.sub(lposMinusVPos, lPos, vPos);
        vec3.normalize(l, lposMinusVPos);
        // Vector3d v = (cPos - vPos).normalized();
        let cPosMinusvPos = vec3.create();
        vec3.sub(cPosMinusvPos, cPos, vPos);
        let v = vec3.create();
        vec3.normalize(v, cPosMinusvPos);
        // Vector3d h = (l + v).normalized();
        let lPlusv = vec3.create();
        vec3.add(lPlusv, l, v);
        let h = vec3.create();
        vec3.normalize(h, lPlusv);
        //DEBUG STATEMENT
        // console.log("outputing test values", l, h, n, v, this);
        let tempCalc = Math.max(vec3.dot(l, n), 0.0);
        let diffuse = vec3.fromValues(tempCalc * this.kdr, tempCalc * this.kdg, tempCalc * this.kdb);
        let tempPowCalc = Math.pow(Math.max(vec3.dot(h, n), 0.0), this.s);
        let specular = vec3.fromValues(tempPowCalc * this.ksr, tempPowCalc * this.ksg, tempPowCalc * this.ksb);
        
        //color += lInt*(diffuse + specular);
        let difPlusSpec = vec3.create();
        vec3.add(difPlusSpec, diffuse, specular);
        //DEBUG STATEMENT
        // console.log("diffuse + specular", difPlusSpec, diffuse, specular,"tempCalc", tempCalc,"tempPoweCalc", tempPowCalc);
        color = vec3.fromValues((color[0] + (lInt * difPlusSpec[0])), (color[1] + (lInt * difPlusSpec[1])), (color[2] + (lInt * difPlusSpec[2])));
        //DEBUG STATEMENT
        // console.log("inside apply DS color at the end", color, "lInt", lInt, light.intesity);
        return color;
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