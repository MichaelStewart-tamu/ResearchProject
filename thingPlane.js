
class thingPlane extends thing
{

    constructor(s)
    {
        super(s);
    }

    

    intersect(obj)
    {
        //unpack from object
        let o = obj.origin;
        let d = obj.direction
        let s = obj.s;
        let pos = vec3.create();
        let nor = vec3.create();
        let back;


        //DEBUG STATEMENT
        //console.log("entered intersect function");
                // Matrix4d E, Ei, Eit;
        let E = mat4.create();
        let Ei = mat4.create();
        let Eit = mat4.create();

        // getMatrices(E, Ei, Eit);
        E = this.getMatrices(); //this is supposed to return three matrices Transformation matrix for the object, inverse, and inverse transpose. However JavaScript does not support passing in variables by reference unless they are apparent of a class object. What I will do is output a matrix and inverse and transpose it using function in my matrix class.
        mat4.invert(Ei, E); //first invert and then store into Ei
        mat4.transpose(Eit, Ei);    //then transpose and store into Eit

        let R = mat3.create();
        mat3.fromMat4(R, E);
        let p = vec3.create();
        p = vec3.fromValues(E[12], E[13], E[14]);
        let Rt = mat3.create();
        mat3.transpose(Rt, R);
        let Rtp = vec3.create();
        vec3.transformMat3(Rtp, p, Rt);
        let rayOrig = vec3.fromValues(o[0], o[1], o[2]);
        let tempMult = vec3.create();
        vec3.transformMat3(tempMult, rayOrig, Rt);
        let orig = vec3.create();
        vec3.subtract(orig, tempMult, Rtp);
        let dir = vec3.create();
        let rayDir = vec3.fromValues(d[0], d[1], d[2]);
        vec3.transformMat3(dir, rayDir, Rt);
        let zorig = orig[2];
        let zdir = dir[2];
        if((zorig * zdir) < 0)
        {
            //collision!
            s = (Math.abs(zorig)) / (Math.abs(zdir));
            //compute in world space
            let sTimesRayDir = vec3.fromValues(s * d[0], s * d[1], s * d[2]);
            vec3.add(pos, sTimesRayDir, rayOrig);
            back = (zdir > 0.0);
            let tempNor = vec3.create();
            vec3.normalize(tempNor, vec3.fromValues(R[6], R[7], R[8]));
            // nor *= (back ? -1.0 : 1.0);
            let negative1 = vec3.fromValues(-1.0, -1.0, -1.0);
            let positive1 = vec3.fromValues(1.0, 1.0, 1.0);
            (back ? vec3.multiply(nor, tempNor, negative1): vec3.multiply(nor, tempNor, positive1));

            // this.material.copy(mat);
            obj.mat.copy(this.material);

            //pack variables back into object
            obj.s = s;
            obj.pos = pos;
            obj.nor = nor;
            obj.back = back;
            return true;
        }
        return false;    
    }
}