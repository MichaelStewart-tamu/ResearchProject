class thingObj extends thing
{

    sphere;

    constructor(s)
    {
        super(s);
        this.sphere = new thingSphere(s);
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


        // Transform ray to local coords
        let E = mat4.create();
        let Ei = mat4.create();
        let Eit = mat4.create();

        // To local:
        //    ray origin: multiply by Ei
        //    ray direction: multiply by Ei and normalize
        // Do local computations
        // To global:
        //    hit position: multiply by E
        //    hit normal: multiply by Eit and normalize
        //    hit dist: compute from ray orig and hit position

        // getMatrices(E, Ei, Eit);
        E = this.getMatrices(); //this is supposed to return three matrices Transformation matrix for the object, inverse, and inverse transpose. However JavaScript does not support passing in variables by reference unless they are apparent of a class object. What I will do is output a matrix and inverse and transpose it using function in my matrix class.
        mat4.invert(Ei, E); //first invert and then store into Ei
        mat4.transpose(Eit, Ei);    //then transpose and store into Eit

        //to local
        let tmp = vec4.fromValues(p[0], p[1], p[2], 1.0);
        let tmp2 = vec4.create();
        vec4.transformMat4(tmp2, tmp, Ei);
        let pp = vec3.fromValues(tmp2[0], tmp2[1], tmp2[2]);
        tmp = vec4.fromValues(v[0], v[1], v[2], 0.0);
        vec4.transformMat4(tmp2, tmp, Ei);
        let vv = vec3.fromValues(tmp2[0], tmp2[1], tmp2[2]);
        vec3.normalize(vv, vv);

        //check bounding shphere
        let bsphere = this.shape.bsphere;
        this.sphere.posX = bsphere[0];
        this.sphere.posY = bsphere[1];
        this.sphere.posZ = bsphere[2];
        this.sphere.scaleX = bsphere[3];
        this.sphere.scaleY = bsphere[3];
        this.sphere.scaleZ = bsphere[3];

        let rayInfo = {
            origin: pp,
            direction: vv,
            s: s,
            pos: vec3.create(),
            nor: vec3.create(),
            mat: new Material(),
            back: true
        };

        if(!this.sphere.intersect(rayInfo))
        {
            //unpack the values from intersect object and reapply to variables
            s = rayInfo.s;
            pos = rayInfo.pos;
            nor = rayInfo.nor;
            mat.copy(rayInfo.mat);
            back = rayInfo.back;
            
            return false;
        }

        //unpack the values from intersect object and reapply to variables
        s = rayInfo.s;
        pos = rayInfo.pos;
        nor = rayInfo.nor;
        mat.copy(rayInfo.mat);
        back = rayInfo.back;

        back = false;
        let ss = 1e20;  //infinity
        let orig = vec3.create();
        let dir = vec3.create();
        let pos0 = vec3.create();
        let pos1 = vec3.create();
        let tout;
        let uout;
        let vout;

        orig = vec3.fromValues(pp[0], pp[1], pp[2]);
        dir = vec3.fromValues(vv[0], vv[1], vv[2]);

        let posBuf = this.shape.#posBuf;
        let norBuf = this.shape.#norBuf;
        
        for(var i = 0; i < posBuf.length; i += 9)
        {
            for(var k = 0; k < 3; k++)
            {
                pos0[k] = posBuf[i + 0 + k];
                pos1[k] = posBuf[i + 3 + k];
                pos2[k] = posBuf[i + 6 + k];
            }

            //pack into an object
            hitInfo = {
                t: tout,
                u: uout,
                v: vout
            };

            let hit = intersect_triangle1(orig, dir, pos0, pos1, pos2, hitInfo);

            //unpack
            tout = hitInfo.t;
            uout = hitInfo.u;
            vout = hitInfo.v;

            if(hit && tout > 0 && tout << ss)
            {
                ss = tout;
                obj.mat.copy(this.material);
                // Barycentric coords for interpolating the hit point and normal
                // uout corresponds to pos1
                // vout corresponds to pos2
                let a0 = 1.0 - uout - vout;
                let a1 = uout;
                let a2 = vout;
                let nor0 = vec3.create();
                let nor1 = vec3.create();
                let nor2 = vec3.create();

                for(var k = 0; k < 3; k++)
                {
                    nor0[k] = norBuf[i+0+k];
                    nor1[k] = norBuf[i+3+k];
                    nor2[k] = norBuf[i+6+k];
                }

                for(var k = 0; k < 3; k++)
                {
                    pos[k] = a0 * pos0[k] + a1 * pos1[k] + a2 * pos2[k];
				    nor[k] = a0 * nor0[k] + a1 * nor1[k] + a2 * nor2[k];
                }
                vec3.normalize(nor, nor);
                back = vec3.dot(nor, v) < 0.0;
            }
        }
        if(ss < 1e20)
        {
            //there was a hit
            //to global
            tmp = vec4.fromValues(pos[0], pos[1], pos[2], 1.0);
            vec4.transformMat4(tmp2, tmp, E);
            pos = vec3.fromValues(tmp2[0], tmp2[1], tmp2[2]);
            tmp = vec4.fromValues(nor[0], nor[1], nor[2], 0.0);
            vec4.transformMat4(tmp2, tmp, Eit);
            nor = vec3.fromValues(tmp2[0], tmp2[1], tmp2[2]);

            vec3.normalize(nor, nor);
            let posMinusP = vec3.create();
            vec3.subtract(posMinusP, pos, p);
            s = Math.sqrt(vec3.squaredLength(posMinusP));

            //pack into object
            obj.s = s;
            obj.pos = pos;
            obj.nor = nor;
            obj.back = back;
            return true;
        }
        //No hit
        obj.s = s;
        obj.pos = pos;
        obj.nor = nor;
        obj.back = back;
        return false;
    }

    intersect_triangle1(orig, dir, vert0, vert1, vert2, hitInfo)
    {
        //unpack object
        let edge1 = vec3.create();
        let edge2 = vec3.create();
        let tvec = vec3.create();
        let pvec = vec3.create();
        let qvec = vec3.create();
        let det;
        let inv_det;
        let t = hitInfo.t;
        let u = hitInfo.u;
        let v = hitInfo.v;

        //find vectors for two edges sharing vert0
        vec3.subtract(edge1, vert1, vert0);
        vec3.subtract(edge2, vert2, vert0);

        //begin calculating determinant - also used to callculate U parameter
        vec3.cross(pvec, dir, edge2);

        //if determinant is near zero, ray lies in plane of triangle
        det = vec3.dot(edge1, pvec);

        if(det > Number.EPSILON)
        {
            //calculate distance from vert0 to ray origin
            vec3.subtract(tvec, orig, vert0);

            //calculate U parameter and test bounds
            u = vec3.dot(tvec, pvec);
            if(u < 0.0 || u > det)
            {
                return 0;
            }

            //prepare to test V parameter
            vec3.cross(qvec, tvec, edge1);

            //calculate V parameter and test bounds
            v = vec3.dot(dir, qvec);
            if(v < 0.0 || u + v > det)
            {
                return 0;
            }
        }
        else if(det < (-1.0 * Number.EPSILON))
        {
            //calculate distance from vert0 to ray origin
            vec3.subtract(tvec, orig, vert0);

            //calculate U parameter and test bounds
            u = vec3.dot(tvec, pvec);
            if(u > 0.0 || u < det)
            {
                return 0;
            }

            //prepare to test V parameter
            vec3.cross(qvec, tvec, edge1);

            //calculate V parameter and test bounds
            v = vec3.dot(dir, qvec);
            if(v > 0.0 || u + v < det)
            {
                return 0;
            }
        }
        else
        {
            return 0;   //ray is parallell to the plane of the triangle
        }

        inv_det = 1.0 / det;

        //calculate t, ray intersects triangle
        t = vec3.dot(edge2, qvec) * inv_det;
        u *= inv_det;
        v *= inv_det;

        hitInfo.t = t;
        hitInfo.u = u;
        hitInfo.v = v;
        return 1;
    }
}