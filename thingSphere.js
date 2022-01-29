class thingSphere extends thing
{

    constructor(s)
    {
        super(s);
    }

    

    intersect(o, d, s, pos, nor, mat, back)
    {
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


        // Vector4d tmp = Ei*Vector4d(o(0), o(1), o(2), 1.0);
        let tempO = vec4.fromValues(o[0], o[1], o[2], 1.0);
        let tmp = vec4.create();
        vec4.transformMat4(tmp, tempO, Ei);

        // const Vector3d ol = tmp.segment<3>(0);
        let ol = vec3.fromValues(tmp[0], tmp[1], tmp[2]);
   
        // tmp = Ei*Vector4d(d(0), d(1), d(2), 0.0);
        let tempD = vec4.fromValues(d[0], d[1], d[2], 0.0);
        vec4.transformMat4(tmp, tempD, Ei);

        // const Vector3d dl = tmp.segment<3>(0).normalized();
        let dl =  vec3.create();
        vec3.normalize(dl, vec3.fromValues(tmp[0], tmp[1], tmp[2]))

        // // https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-sphere-intersection
        // const double r = 1.0;
        var r = 1.0;
        
        // // const double r2 = r*r;
        //DEBUG STATEMENT
        //console.log("value of r", r);
        var r2 = r * r;
        //DEBUG STATEMENT
        //console.log("value of r2", r2);

        // // const Vector3d pl(0.0, 0.0, 0.0);
        let pl = vec3.create();

        // double t0, t1; // solutions for t if the ray intersects
        let t0;
        let t1;

        // Vector3d L = pl - ol;
        let L = vec3.create();
        vec3.subtract(L, pl, ol);

        // double tca = L.dot(dl);
        let tca = vec3.dot(L, dl);
        //DEBUG STATEMENT
        //console.log("tca", tca, "dl", dl, "L", L);

        // // if (tca < 0) return false;
        if(tca < 0)
        {
            return false;
        }

        // double d2 = L.dot(L) - tca * tca;
        let d2 = vec3.dot(L, L) - tca * tca;
        //DEBUG STATEMENT
        //console.log("d2 test check", d2, "tca", tca, "dot", vec3.dot(L, L));

        // if (d2 > r2) return false;
        if(d2 > r2)
        {
            return false;
        }

        // double thc = sqrt(r2 - d2);
        let thc = Math.sqrt(r2 - d2);
        //DEBUG STATEMENT
        //console.log("thc test check, thc ", thc, "r2:", r2, "d2", d2);

        // t0 = tca - thc;
        t0 = tca - thc;

        // t1 = tca + thc;
        t1 = tca + thc;

        // if (t0 > t1) std::swap(t0, t1);
        if(t0 > t1)
        {
            t0 = [t1, t1 = t0][0];  //this will swap the values stored in each variable
        }

        // back = false;
        back = false;

        // if (t0 < 0) {
        //     // ray origin is inside or beyond the sphere
        //     t0 = t1; // if t0 is negative, let's use t1 instead
        //     if (t0 < 0) return false; // both t0 and t1 are negative
        //     back = true;
        // }
        if(t0 < 0)
        {
            //ray origin is inside or beyound, let's use t1 instead
            t0 = t1;    //if t0 is negative, let's use t1 instead
            if(t0 < 0)
            {
                return false;   //both t0 and t1 are negative
            }
            back = true;
        }

        // pos = ol + t0*dl;
        //DEBUG STATEMENT
        //console.log("before pos calc values", pos, ", ol: ", ol, "t0", t0, "dl", dl);
        let tempT0 = vec3.fromValues(t0, t0, t0);
        let tempT0dl = vec3.create();
        vec3.multiply(tempT0dl, tempT0, dl);
        vec3.add(pos, tempT0dl, ol);
        // pos = ol + t0*dl;
        //DEBUG STATEMENT
        //console.log("after pos calc", pos);
        // nor = pos;
        //DEBUG STATEMENT
        //console.log("before nor gets reasigned", nor);
        nor = pos;
        //DEBUG STATEMENT
        //console.log("after nor gets reasigned", nor);

        // nor *= (back ? -1.0 : 1.0);
        let negative1 = vec3.fromValues(-1.0, -1.0, -1.0);
        let positive1 = vec3.fromValues(1.0, 1.0, 1.0);
        (back ? vec3.multiply(nor, nor, negative1): vec3.multiply(nor, nor, positive1));
        //DEBUG STATEMENT
        //console.log("after nor is multiplied", nor);

        // mat.copy(material);
        this.material.copy(mat);

        // Convert to world space
        // tmp = E*Vector4d(pos(0), pos(1), pos(2), 1.0);
        let tempP = vec4.fromValues(pos[0], pos[1], pos[2], 0.0);
        vec4.transformMat4(tmp, tempP, E);

        // pos = tmp.segment<3>(0);
        pos = vec3.fromValues(tmp[0], tmp[1], tmp[2]);

        // tmp = Eit*Vector4d(nor(0), nor(1), nor(2), 0.0);
        let tempN = vec4.fromValues(nor[0], nor[1], nor[2], 0.0);
        vec4.transformMat4(tmp, tempN, Eit);

        // nor = tmp.segment<3>(0).normalized();
        vec3.normalize(nor, vec3.fromValues(tmp[0], tmp[1], tmp[2]))

        // s = (pos - o).norm();
        let tempPminusO = vec3.create();
        vec3.sub(tempPminusO, pos, o);
        vec3.normalize(s, tempPminusO);

        // return true;
        //DEBUG STATEMENT
        //console.log("testing outputs of intersect inside sphere, pos =", pos, "nor", nor, "s", s, "back", back);
        return true;
        
    }
}