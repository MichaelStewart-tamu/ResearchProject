class thingCylinder extends thing
{

    constructor(s)
    {
        super(s);
    }

    

    intersect(obj)
    {
        //unpack from object
        let p = obj.origin;
        let v = obj.direction
        let s = obj.s;
        let pos = vec3.create();
        let nor = vec3.create();
        let back;

        let C = vec3.fromValues(this.posX, this.posY, this.posZ);
        let tempR = new MatrixStack();
        tempR.rotate(this.rotX, this.rotY, this.rotZ);
        let R = mat3.create();
        mat3.fromMat4(R, tempR.topMatrix());
        let A = vec3.fromValues(R[6], R[7], R[8]);
        let r = this.scaleX;
        // Project to circle
        //
        //   v
        //  <--p
        //    /|
        //   / |A
        // c------
        //
        // In world space
        // Vector3d p_ = p - A*A.dot(p - C);
        let pMinusC = vec3.create();
        vec3.subtract(pMinusC, p, C);
        let AtimesA = vec3.create();
        vec3.multiply(AtimesA, A, A);
        let Adot = vec3.dot(A, pMinusC);
        let AtimesAdot = vec3.create();
        // vec3.multiply(AtimesAdot, A, Adot);
        AtimesAdot = vec3.fromValues((A[0] * Adot), (A[1] * Adot), (A[2] * Adot))
        let p_ = vec3.create();
        vec3.subtract(p_, p, AtimesAdot);   //TODO: Make sure this is what this is

        // Vector3d v_ = v - A*A.dot(v);
        let adotV = vec3.dot(A, v);
        // vec3.multiply(AtimesAdot, A, adotV);
        AtimesAdot = vec3.fromValues((A[0] * adotV), (A[1] * adotV), (A[2] * adotV));
        let v_ = vec3.create();
        vec3.subtract(v_, v, AtimesAdot);

        //in local space
        let Rt = mat3.create();
        mat3.transpose(Rt, R);

        // p_ = Rt*p_ - Rt*C;
        let RtTimesp = vec3.create();
        let RtTimesC = vec3.create();
        let TminusT = vec3.create();
        vec3.transformMat3(RtTimesp, p_, Rt);
        vec3.transformMat3(RtTimesC, C, Rt);
        vec3.subtract(p_, RtTimesp, RtTimesC);

        // v_ = Rt*v_;
        vec3.transformMat3(v_, v_, Rt);

        let a = vec3.dot(v_, v_);
        let b = 2.0 * vec3.dot(v_, p_);
        let c = vec3.dot(p_, p_) - (r * r);
        let d2 = b * b - 4 * a * c;

        if(d2 < 0.0)
        {
            //no collision
            return false;
        }

        d2 = Math.sqrt(d2);
        let t0 = ((-1.0 * b) - d2) / (2.0 * a);
        let t1 = ((-1.0 * b) + d2) / (2.0 * a);
        
        if(t0 < 0 && t1 < 0)
        {
            //both on the wrong side
            return false;
        }

        if(t1 < t0)
        {
            let temp = t0;
            t0 = t1;
            t1 = tmp;
        }

        if(t0 < 0.0) {
            // inside
            back = true;
            s = t1;
        } else {
            // outside
            back = false;
            s = t0;
        }

        //pos = p + s*v;
        vec3.add(pos, p, vec3.fromValues(s * v[0], s * v[1], s * v[2]));
        
        // nor = pos - C;
        vec3.subtract(nor, pos, C);

        //nor = nor - A*A.dot(nor);
        let AtimesAdotNor = vec3.create();
        // vec3.multiply(AtimesAdotNor, A, vec3.dot(A, nor));
        let AdotNor = vec3.dot(A, nor);
        AtimesAdotNor = vec3.fromValues((A[0] * AdotNor), (A[1] * AdotNor), (A[2] * AdotNor));
        vec3.subtract(nor, nor, AtimesAdotNor);

        //nor.normalize();
        vec3.normalize(nor, nor);

        if(back === true)
        {
            nor = vec3.fromValues((-1.0 * nor[0]), (-1.0 * nor[1]), (-1.0 * nor[2]));
        }

        obj.mat.copy(this.material);
        //pack variables back into object
        obj.s = s;
        obj.pos = pos;
        obj.nor = nor;
        obj.back = back;
        return true;

        // //DEBUG STATEMENT
        // //console.log("entered intersect function");
        //         // Matrix4d E, Ei, Eit;
        // let E = mat4.create();
        // let Ei = mat4.create();
        // let Eit = mat4.create();

        // // getMatrices(E, Ei, Eit);
        // E = this.getMatrices(); //this is supposed to return three matrices Transformation matrix for the object, inverse, and inverse transpose. However JavaScript does not support passing in variables by reference unless they are apparent of a class object. What I will do is output a matrix and inverse and transpose it using function in my matrix class.
        // mat4.invert(Ei, E); //first invert and then store into Ei
        // mat4.transpose(Eit, Ei);    //then transpose and store into Eit

        // let R = mat3.create();
        // mat3.fromMat4(R, E);
        // let p = vec3.create();
        // p = vec3.fromValues(E[12], E[13], E[14]);
        // let Rt = mat3.create();
        // mat3.transpose(Rt, R);
        // let Rtp = vec3.create();
        // vec3.transformMat3(Rtp, p, Rt);
        // let rayOrig = vec3.fromValues(o[0], o[1], o[2]);
        // let tempMult = vec3.create();
        // vec3.transformMat3(tempMult, rayOrig, Rt);
        // let orig = vec3.create();
        // vec3.subtract(orig, tempMult, Rtp);
        // let dir = vec3.create();
        // let rayDir = vec3.fromValues(d[0], d[1], d[2]);
        // vec3.transformMat3(dir, rayDir, Rt);
        // let zorig = orig[2];
        // let zdir = dir[2];
        // if((zorig * zdir) < 0)
        // {
        //     //collision!
        //     s = (Math.abs(zorig)) / (Math.abs(zdir));
        //     //compute in world space
        //     let sTimesRayDir = vec3.fromValues(s * d[0], s * d[1], s * d[2]);
        //     vec3.add(pos, sTimesRayDir, rayOrig);
        //     back = (zdir > 0.0);
        //     let tempNor = vec3.create();
        //     vec3.normalize(tempNor, vec3.fromValues(R[6], R[7], R[8]));
        //     // nor *= (back ? -1.0 : 1.0);
        //     let negative1 = vec3.fromValues(-1.0, -1.0, -1.0);
        //     let positive1 = vec3.fromValues(1.0, 1.0, 1.0);
        //     (back ? vec3.multiply(nor, tempNor, negative1): vec3.multiply(nor, tempNor, positive1));

        //     // this.material.copy(mat);
        //     obj.mat.copy(this.material);

        //     //pack variables back into object
        //     obj.s = s;
        //     obj.pos = pos;
        //     obj.nor = nor;
        //     obj.back = back;
        //     return true;
        // }
        // return false;    
    }
}