class Scene
{
    #lights = [];
    #things = [];
    #shadowing;
    #depthMax;
    #shapeSphere
    #shapeCylinder
    #shapePlane
    #shapeBunny
    #shapeTeapot

    constructor()
    {
        this.#shadowing = true;
        this.#depthMax = 5;
    }

    load(scene, CylModel, bunnyModel, planeModel, sphereModel, teapotModel, evaModel)
    {
        this.#lights.splice(0, this.#lights.length);
        this.#things.splice(0, this.#things.length);

        sphereShape = new Shape();
        sphereShape.init(sphereModel);

        this.#shapeSphere = new Shape();
        this.#shapeSphere.init(sphereModel);

        let cylinderShape = new Shape();
        cylinderShape.init(CylModel);

        planeShape = new Shape();
        planeShape.init(planeModel);
        
        bunnyShape = new Shape();
        bunnyShape.init(bunnyModel);

        teapotShape = new Shape();
        teapotShape.init(teapotModel);

        evaShape = new Shape();
        evaShape.init(evaModel);
        

        switch(scene)
        {
            case 0: //cornell box
                console.log("have entered scene 0");


                light0 = new Light();
                this.#lights.push(light0);
                light0.position = [-0.3, 0.6, 0.3];
                light0.intesity = 0.5;
                light0.number = 0;

                // light1 = new Light();
                this.#lights.push(new Light());
                this.#lights[1].position = [0.3, 0.6, -0.3];
                this.#lights[1].intesity = 0.5;
                this.#lights[1].number = 1;

                let cylinder = new thingCylinder(cylinderShape);
                this.#things.push(cylinder);
                cylinder.resetRotation((-0.5 * Math.PI), 0.0, 0.0)
                cylinder.resetScale(0.2, 0.2, 2.0);
                cylinder.resetPosition(0.0, 0.0, 0.0);  //TODO: make random
                cylinder.material.setKD(0.5, 0.0, 0.5);
                cylinder.material.setKS(1.0, 1.0, 0.5);
                cylinder.material.setKA(0.1, 0.1, 0.1);
                cylinder.material.s = 100.0;

                let sphere0 = new thingSphere(sphereShape);
                this.#things.push(sphere0);
                sphere0.resetRotation(0.0, 0.0, 0.0)
                sphere0.resetScale(0.25, 0.25, 0.25);
                sphere0.resetPosition(0.5, -0.75, 0.3);  //TODO: make random
                sphere0.material.setKD(0.5, 0.0, 0.0);
                sphere0.material.setKS(1.0, 1.0, 0.5);
                sphere0.material.setKA(0.1, 0.1, 0.1);
                sphere0.material.s = 100.0;

                let sphere1 = new thingSphere(sphereShape);
                this.#things.push(sphere1);
                sphere1.resetRotation(0.0, 0.0, 0.0)
                sphere1.resetScale(0.25, 0.25, 0.25);
                sphere1.resetPosition(-0.1, -0.75, 0.43);  //TODO: make random
                sphere1.material.type = "REFLECT";
                sphere1.material.setKD(0.5, 0.5, 0.0);
                sphere1.material.setKS(1.0, 1.0, 0.5);
                sphere1.material.setKA(0.1, 0.1, 0.1);
                sphere1.material.s = 100.0;

                let sphere2 = new thingSphere(sphereShape);
                this.#things.push(sphere2);
                sphere2.resetRotation(0.0, 0.0, 0.0)
                sphere2.resetScale(0.25, 0.25, 0.25);
                sphere2.resetPosition(-0.5, -0.75, 0.0);  //TODO: make random
                sphere2.material.setKD(0.0, 0.5, 0.5);
                sphere2.material.setKS(1.0, 1.0, 0.5);
                sphere2.material.setKA(0.1, 0.1, 0.1);
                sphere2.material.s = 100.0;

                let floor = new thingPlane(planeShape);
                this.#things.push(floor);
                floor.resetRotation((-0.5 * Math.PI), 0.0, 0.0)
                floor.resetScale(1.0, 1.0, 1.0);
                floor.resetPosition(0.0, -1.0, 0.0);
                floor.material.setKD(1.0, 1.0, 1.0);
                floor.material.setKS(0.0, 0.0, 0.0);
                floor.material.setKA(0.1, 0.1, 0.1);
                floor.material.s = 200.0;

                let ceiling = new thingPlane(planeShape);
                this.#things.push(ceiling);
                ceiling.resetRotation((0.5 * Math.PI), 0.0, 0.0)
                ceiling.resetScale(1.0, 1.0, 1.0);
                ceiling.resetPosition(0.0, 1.0, 0.0);
                ceiling.material.setKD(1.0, 1.0, 1.0);
                ceiling.material.setKS(0.0, 0.0, 0.0);
                ceiling.material.setKA(0.1, 0.1, 0.1);
                ceiling.material.s = 200.0;

                let backWall = new thingPlane(planeShape);
                this.#things.push(backWall);
                backWall.resetRotation((0.0 * Math.PI), 0.0, 0.0)
                backWall.resetScale(1.0, 1.0, 1.0);
                backWall.resetPosition(0.0, 0.0, -1.0);
                backWall.material.setKD(1.0, 1.0, 1.0);
                backWall.material.setKS(0.0, 0.0, 0.0);
                backWall.material.setKA(0.1, 0.1, 0.1);
                backWall.material.s = 200.0;

                let leftWall = new thingPlane(planeShape);
                this.#things.push(leftWall);
                leftWall.resetRotation(0.0, (0.5 * Math.PI), 0.0)
                leftWall.resetScale(1.0, 1.0, 1.0);
                leftWall.resetPosition(-1.0, 0.0, 0.0);
                leftWall.material.setKD(1.0, 0.0, 0.0);
                leftWall.material.setKS(0.0, 0.0, 0.0);
                leftWall.material.setKA(0.1, 0.1, 0.1);
                leftWall.material.s = 200.0;

                let rightWall = new thingPlane(planeShape);
                this.#things.push(rightWall);
                rightWall.resetRotation(0.0, (-0.5 * Math.PI), 0.0)
                rightWall.resetScale(1.0, 1.0, 1.0);
                rightWall.resetPosition(1.0, 0.0, 0.0);
                rightWall.material.setKD(0.0, 1.0, 0.0);
                rightWall.material.setKS(0.0, 0.0, 0.0);
                rightWall.material.setKA(0.1, 0.1, 0.1);
                rightWall.material.s = 200.0;

                break;
            case 1:
            case 2:
                if(scene === 2)
                {
                    this.#shadowing = true;
                }
                else{
                    this.#shadowing = false;
                }

                console.log("have entered scene 2");

                light0 = new Light();
                this.#lights.push(light0);
                light0.position = [-2.0, 1.0, 1.0];
                light0.intesity = 1.0;
                light0.number = 0;

                // light1 = new Light();
                this.#lights.push(new Light());
                this.#lights[1].position = [-2.0, 1.0, 1.0];
                this.#lights[1].intesity = 0.0;
                this.#lights[1].number = 1;

                // let plane = new thingPlane(planeShape);
                // this.#things.push(plane);
                // plane.resetPosition(1.0, 0.0, 0.0);
                // plane.resetScale(3.0, 3.0, 3.0);
                // plane.resetRotation(0.0, 0.0, 0.0);
                // plane.material.setKD(1.0, 0.0, 0.0);
                // plane.material.setKS(1.0, 1.0, 0.5);
                // plane.material.setKA(0.1, 0.0, 0.0);
                // plane.material.s = 100.0;

                let sphere4 = new thingSphere(sphereShape);
                this.#things.push(sphere4);
                sphere4.resetPosition(-0.5, -1.0, 1.0);
                sphere4.resetScale(1.0, 1.0, 1.0);
                sphere4.resetRotation(0.00, 0.0, 0.0);
                sphere4.material.setKD(1.0, 0.0, 0.0);
                sphere4.material.setKS(1.0, 1.0, 0.5);
                sphere4.material.setKA(0.1, 0.1, 0.1);
                sphere4.material.s = 100.0;

                let sphere5 = new thingSphere(sphereShape);
                this.#things.push(sphere5);
                sphere5.resetPosition(0.5, -1.0, -1.0);
                sphere5.resetScale(1.0, 1.0, 1.0);
                sphere5.resetRotation(0.00, 0.0, 0.0);
                sphere5.material.setKD(0.0, 0.5, 0.0);
                sphere5.material.setKS(1.0, 1.0, 0.5);
                sphere5.material.setKA(0.1, 0.1, 0.1);
                sphere5.material.s = 100.0;

                let sphere3 = new thingSphere(sphereShape);
                this.#things.push(sphere3);
                sphere3.resetPosition(0.0, 1.0, 0.0);
                sphere3.resetScale(1.0, 1.0, 1.0);
                sphere3.resetRotation(0.00, 0.0, 0.0);
                sphere3.material.setKD(0.0, 0.0, 1.0);
                sphere3.material.setKS(1.0, 1.0, 0.5);
                sphere3.material.setKA(0.1, 0.1, 0.1);
                sphere3.material.s = 100.0;


                break;
            case 3:
                console.log("have entered scene 3");

                light0 = new Light();
                this.#lights.push(light0);
                light0.position = [-1.0, 2.0, 2.0];
                light0.intesity = 0.5;
                light0.number = 0;

                // light1 = new Light();
                this.#lights.push(new Light());
                this.#lights[1].position = [-1.0, 2.0, -1.0];
                this.#lights[1].intesity = 0.5;
                this.#lights[1].number = 1;

                let plane = new thingPlane(planeShape);
                this.#things.push(plane);
                plane.resetPosition(0.0, -1.0, 0.0);
                plane.resetScale(100.0, 100.0, 100.0);
                plane.resetRotation((-0.5 * Math.PI), 0.0, 0.0);
                plane.material.setKD(1.0, 1.0, 1.0);
                plane.material.setKS(0.0, 0.0, 0.0);
                plane.material.setKA(0.1, 0.1, 0.1);
                plane.material.s = 200.0;

                let sphere6 = new thingSphere(sphereShape);
                this.#things.push(sphere6);
                sphere6.resetPosition(0.5, 0.0, 0.5);
                sphere6.resetScale(0.5, 0.6, 0.2);
                sphere6.resetRotation(0.00, 0.0, 0.0);
                sphere6.material.setKD(1.0, 0.0, 0.0);
                sphere6.material.setKS(1.0, 1.0, 0.5);
                sphere6.material.setKA(0.1, 0.1, 0.1);
                sphere6.material.s = 100.0;

                let sphere7 = new thingSphere(sphereShape);
                this.#things.push(sphere7);
                sphere7.resetPosition(-0.5, 0.0, -0.5);
                sphere7.resetScale(1.0, 1.0, 1.0);
                sphere7.resetRotation(0.00, 0.0, 0.0);
                sphere7.material.setKD(0.0, 1.0, 0.0);
                sphere7.material.setKS(1.0, 1.0, 0.5);
                sphere7.material.setKA(0.1, 0.1, 0.1);
                sphere7.material.s = 100.0;

                break;
            case 4:
            case 5:
                if(scene === 4)
                {
                    this.#depthMax = 1;
                }
                else{
                    this.#depthMax = 7;
                }

                light0 = new Light();
                this.#lights.push(light0);
                light0.position = [-1.0, 2.0, 1.0];
                light0.intesity = 0.5;
                light0.number = 0;

                // light1 = new Light();
                this.#lights.push(new Light());
                this.#lights[1].position = [0.5, -0.5, 0.0];
                this.#lights[1].intesity = 0.5;
                this.#lights[1].number = 1;

                let sphere8 = new thingSphere(sphereShape);
                this.#things.push(sphere8);
                sphere8.resetPosition(0.5, -0.7, 0.5);
                sphere8.resetScale(0.3, 0.3, 0.3);
                sphere8.resetRotation(0.00, 0.0, 0.0);
                sphere8.material.setKD(1.0, 0.0, 0.0);
                sphere8.material.setKS(1.0, 1.0, 0.5);
                sphere8.material.setKA(0.1, 0.1, 0.1);
                sphere8.material.s = 100.0;

                let sphere9 = new thingSphere(sphereShape);
                this.#things.push(sphere9);
                sphere9.resetPosition(1.0, -0.7, 0.0);
                sphere9.resetScale(0.3, 0.3, 0.3);
                sphere9.resetRotation(0.00, 0.0, 0.0);
                sphere9.material.setKD(0.0, 0.0, 1.0);
                sphere9.material.setKS(1.0, 1.0, 0.5);
                sphere9.material.setKA(0.1, 0.1, 0.1);
                sphere9.material.s = 100.0;

                let sphere10 = new thingSphere(sphereShape);
                this.#things.push(sphere10);
                sphere10.resetPosition(-0.5, 0.0, -0.5);
                sphere10.resetScale(1.0, 1.0, 1.0);
                sphere10.resetRotation(0.00, 0.0, 0.0);
                sphere10.material.type = "REFLECT";
                sphere10.material.setKD(0.0, 0.0, 1.0);
                sphere10.material.setKS(1.0, 1.0, 0.5);
                sphere10.material.setKA(0.1, 0.1, 0.1);
                sphere10.material.s = 100.0;

                let sphere11 = new thingSphere(sphereShape);
                this.#things.push(sphere11);
                sphere11.resetPosition(1.5, 0.0, -1.5);
                sphere11.resetScale(1.0, 1.0, 1.0);
                sphere11.resetRotation(0.00, 0.0, 0.0);
                sphere11.material.type = "REFLECT";
                sphere11.material.setKD(0.0, 1.0, 0.0);
                sphere11.material.setKS(1.0, 1.0, 0.5);
                sphere11.material.setKA(0.1, 0.1, 0.1);
                sphere11.material.s = 100.0;

                let ground = new thingPlane(planeShape);
                this.#things.push(ground);
                ground.resetPosition(0.0, -1.0, 0.0);
                ground.resetScale(100.0, 100.0, 100.0);
                ground.resetRotation((-0.5 * Math.PI), 0.0, 0.0);
                ground.material.setKD(1.0, 1.0, 1.0);
                ground.material.setKS(0.0, 0.0, 0.0);
                ground.material.setKA(0.1, 0.1, 0.1);
                ground.material.s = 200.0;
                
                let backGround = new thingPlane(planeShape);
                this.#things.push(backGround);
                backGround.resetPosition(0.0, 0.0, -3.0);
                backGround.resetScale(100.0, 100.0, 100.0);
                backGround.resetRotation((0.0 * Math.PI), 0.0, 0.0);
                backGround.material.setKD(1.0, 1.0, 1.0);
                backGround.material.setKS(0.0, 0.0, 0.0);
                backGround.material.setKA(0.1, 0.1, 0.1);
                backGround.material.s = 200.0;
                
                break;
            case 6:
            case 7:
                //obj
                light0 = new Light();
                this.#lights.push(light0);
                // light0.position = [-1.0, 2.0, 1.0];
                light0.intesity = 1.0;
                light0.number = 0;

                // light1 = new Light();
                this.#lights.push(new Light());
                // this.#lights[1].position = [0.5, -0.5, 0.0];
                this.#lights[1].intesity = 0.0;
                this.#lights[1].number = 1;              
                

                let obj = new thingObj(bunnyShape);
                this.#things.push(obj);
                obj.material.setKD(0.0, 0.0, 1.0);
                obj.material.setKS(1.0, 1.0, 0.5);
                obj.material.setKA(0.1, 0.1, 0.1);
                obj.material.s = 100.0;
                if(scene === 6)
                {
                    light0.position = [-1.0, 1.0, 2.0];
                    this.#lights[1].position = [-1.0, 1.0, 2.0];
                    obj.resetRotation(0.0, 0.0, 0.0);
                }
                else{
                    light0.position = [1.0, 1.0, 2.0];
                    this.#lights[1].position = [1.0, 1.0, 2.0];
                    obj.resetRotation((20 * Math.PI / 180), 0.0, 0.0);
                    obj.resetScale(1.5, 1.5, 1.5);
                    obj.resetPosition(0.3, -1.5, 0.0);
                }
                break;
            case 8:
                console.log("have entered scene 8");

                light0 = new Light();
                this.#lights.push(light0);
                light0.position = [-2.0, 1.0, 1.0];
                light0.intesity = 0.5;
                light0.number = 0;

                // light1 = new Light();
                this.#lights.push(new Light());
                this.#lights[1].position = [0.5, -0.5, 0.0];
                this.#lights[1].intesity = 0.5;
                this.#lights[1].number = 1;

                let teapot = new thingObj(teapotShape);
                this.#things.push(teapot);
                teapot.resetPosition(0.0, 0.0, 0.0);
                teapot.resetScale(2.0, 2.0, 2.0);
                teapot.resetRotation(0.0, 0.0, 0.0);
                teapot.material.setKD(0.5, 0.4, 0.5);
                teapot.material.setKS(1.0, 1.0, 0.5);
                teapot.material.setKA(0.1, 0.1, 0.1);
                teapot.material.s = 100.0;
                break;
            case 9:
                console.log("have entered scene 9");

                light0 = new Light();
                this.#lights.push(light0);
                light0.position = [-2.0, 10.0, 1.0];
                light0.intesity = 0.5;
                light0.number = 0;

                // light1 = new Light();
                this.#lights.push(new Light());
                this.#lights[1].position = [0.5, 10, 0.0];
                this.#lights[1].intesity = 0.5;
                this.#lights[1].number = 1;

                let evaUnit1 = new thingObj(evaShape);
                this.#things.push(evaUnit1);
                evaUnit1.resetPosition(0.0, -1.9, 0.0);
                evaUnit1.resetScale(1.2, 1.2, 1.2);
                evaUnit1.resetRotation(0.0, 0.0, 0.0);
                evaUnit1.material.setKD(74/255, 25/255, 255/255);
                evaUnit1.material.setKS(1.0, 1.0, 0.5);
                evaUnit1.material.setKA(0.0, 0.0, 0.0);
                evaUnit1.material.s = 100.0;
                break;

        }
    }

    draw(MV, prog)
    {
        //skipping disabling the lights
        // for(auto thing: this.#things)
        // {
        //     console.log(thing);
        // }
        
        for(const light of this.#lights)
        {
            light.draw(MV, prog, this.#shapeSphere);
        }

        //drawing things
        for(const light of this.#lights)
        {
            light.applyGL(MV, prog);
        }

        for(const thing of this.#things)
        {
            if(thing.material.type != "REFRACT")
            {
                // console.log("drawing things which are phong", thing);
                thing.draw(MV, prog);
            }
        }

        for(const thing of this.#things)
        {
            if(thing.material.type === "REFRACT")
            {
                // console.log("drawing things which are refracting", thing);
                thing.draw(MV, prog);
            }
        }
    }

    trace(camera, obj)
    {
        //unpack the object passed in
        let rayOrig = obj.rayOrig;
        let rayDir = obj.rayDir;
        let color = obj.color;
        let depth = obj.depth;
        let n0 = obj.n0;
        let storePoints = obj.storePoints;


        var BIG = 1e9;
        let points = [];
        if(storePoints === true)
        {
            points.push(rayOrig);   //ray start
        }
        var s_ = BIG;
        let pos_ = vec3.create();
        let nor_ = vec3.create();
        let mat_ = new Material();
        let back_;

        //find the closest intersection point along the ray
        for(const thing of this.#things)
        {
            var s = BIG;
            let pos = vec3.create();
            let nor = vec3.create();
            let mat = new Material();
            let back;

            //pack into an object the values passed into intersect
            let rayInfo = {
                origin: rayOrig,
                direction: rayDir,
                s: BIG,
                pos: vec3.create(),
                nor: vec3.create(),
                mat: new Material(),
                back: true
            };

            // console.log("testing that values were input correctly, at thing", thing, "rayinfo", rayInfo);

            if(thing.intersect(rayInfo))
            {
                //unpack the values from intersect object and reapply to variables
                // console.log("i believe an intersection has been met at thing", thing, rayInfo);
                s = rayInfo.s;
                pos = rayInfo.pos;
                nor = rayInfo.nor;
                mat.copy(rayInfo.mat);
                back = rayInfo.back;

                //now can continue
                //if this is the ray from the camera, check for view frustum
                if(s < s_)
                {
                    //If this is the ray from the camera, check for view frustum
                    if(depth > 0 || (camera.znear < s && s < camera.zfar))
                    {
                        //store data needed for color calculation
                        s_ = s;
                        vec3.copy(pos_, pos);
                        vec3.copy(nor_, nor);
                        mat_.copy(mat);
                        back_ = back;
                    }
                }
            }
        }

        if(s_ < BIG)
        {
            if(storePoints)
            {
                points.push(pos_);
            }

            if(mat_.type === "PHONG")
            {
                color = [mat_.kar, mat_.kag, mat_.kab];
                
                for(const light of this.#lights)
                {
                    if(light.intensity === 0.0)
                    {
                        continue;
                    }

                    //the normal must be pointing toward the light
                    let lpos = vec3.create();
                    vec3.copy(lpos, light.position);

                    let tempSublposPos = vec3.create();
                    vec3.sub(tempSublposPos, lpos, pos_);
                    let lDist = Math.sqrt(vec3.squaredLength(tempSublposPos));
                    let lDir = vec3.fromValues((tempSublposPos[0]/lDist), (tempSublposPos[1]/lDist), (tempSublposPos[2]/lDist));
                    if(vec3.dot(lDir, nor_) < 0.0)
                    {
                        // console.log("entered");
                        continue;
                    }

                    if(this.#shadowing === false)
                    {
                        //DEBUG STATEMENT
                        // console.log("inside of trace in scene, phong, if shadowing is false color originally is ", color);
                        color = mat_.applyDS(pos_, nor_, light, rayOrig, color);
                        //DEBUG STATEMENT
                        // console.log("after applyDS", color);
                        continue;
                    }

                    //light ray start
                    if(storePoints === true)
                    {
                        points.push(pos_);
                    }

                    let s_1 = BIG;
                    let pos_1 = vec3.create();
                    //set the ray origin to be slightly toward the light so that the point itself will not occlude it
                    // Vector3d lOrig = pos_ + 1e-4*lDir;
                    let lOrig = vec3.create();
                    vec3.add(lOrig, pos_, (vec3.fromValues((1e-4 * lDir[0]), (1e-4 * lDir[1]), (1e-4 * lDir[2]))));
                    
                    for(const thing of this.#things)
                    {
                        if(thing.material === "REFRACT")
                        {
                            //transparent so do not cast shadows
                            continue;
                        }
                        var s = BIG;
                        let pos = vec3.create();
                        let nor = vec3.create();
                        let mat = new Material();
                        let back;   //boolian

                        //pack into an object the values passed into intersect
                        let rayInfo1 = {
                            origin: lOrig,
                            direction: lDir,
                            s: BIG,
                            pos: vec3.create(),
                            nor: vec3.create(),
                            mat: new Material(),
                            back: true
                        };

                        // console.log("testing that values were input correctly, at thing", thing, "rayinfo", rayInfo);

                        if(thing.intersect(rayInfo1))
                        {
                            //unpack the values from intersect object and reapply to variables
                            // console.log("i believe an intersection has been met at thing", thing, rayInfo);
                            s = rayInfo1.s;
                            pos = rayInfo1.pos;
                            nor = rayInfo1.nor;
                            mat.copy(rayInfo1.mat);
                            back = rayInfo1.back;

                            //now can continue
                            let front = (vec3.dot(lDir, nor) < 0.0);    //front facing
                            if(front && (s < s_1))
                            {
                                //closest s so far
                                s_1 = s;
                                vec3.copy(pos_1, pos);
                            }
                        }
                        //DEBUG STATEMENT
                        // console.log("all the way to the end of phong", pos_1);
                    }

                    if(s_1 < lDist)
                    {
                        //in shadow
                        if(storePoints === true)
                        {
                            points.push(pos_1); //light ray end
                        }
                    }
                    else
                    {
                        //apply material
                        color = mat_.applyDS(pos_, nor_, light, rayOrig, color);
                        if(storePoints === true)
                        {
                            points.push(lpos);  //light ray end
                        }
                    }


                    //for testing
                    // console.log(tempSublposPos, lDist, lDir);
                }
                // console.log(4);
            }   //will continue with reflect and refract
            else if(mat_.type === "REFLECT")
            {
                if(depth < this.#depthMax)
                {
                    // Compute reflected ray: R = 2*(V.N)N-V
				    // Vector3d rDir = 2.0*(-rayDir.dot(nor_))*nor_ + rayDir;
                    let negativeRayDir = vec3.fromValues((-1.0 * rayDir[0]), (-1.0 * rayDir[1]), (-1.0 * rayDir[2]));
                    let tempDotProduct = 2.0 * vec3.dot(negativeRayDir, nor_);
                    let nor_Mult = vec3.fromValues((tempDotProduct * nor_[0]), (tempDotProduct * nor_[1]), (tempDotProduct * nor_[2]));
                    let rDir = vec3.create();
                    vec3.add(rDir, nor_Mult, rayDir);

                    // Advance the ray origin slightly so that
				    // the point itself will not occlude it
                    let rOrig = vec3.fromValues((pos_[0] + (1e-4 * rDir[0])), (pos_[1] + (1e-4 * rDir[1])), (pos_[2] + (1e-4 * rDir[2])));
                    
                    //pack into an object the values
                    // let color = vec3.create();
                    // color = vec3.fromValues(0.0, 0.0, 0.0);
                    let sceneObj = {
                        rayOrig: rOrig,
                        rayDir: rDir,
                        color: color,
                        depth: depth + 1,
                        n0: n0,
                        storePoints: storePoints
                    };
                    let morePoints = this.trace(this, sceneObj);

                    color = sceneObj.color;

                    if(storePoints)
                    {
                        for(var i = 0; i < morePoints.length; i++)  //push in each returned point one at a time
                        {
                            points.push(morePoints[i]);
                        }
                    }
                }
            }
            // console.log(5);
        }
        else
        {
            if(storePoints === true)
            {
                // points.push_back(rayOrig + camera->zfar*rayDir);
                let zfarTIMESrayDir = vec3.create();
                zfarTIMESrayDir[0] = camera.zfar * rayDir[0];
                zfarTIMESrayDir[1] = camera.zfar * rayDir[1];
                zfarTIMESrayDir[2] = camera.zfar * rayDir[2];
                let summation = vec3.create();
                vec3.add(summation, rayOrig, zfarTIMESrayDir);

                points.push(summation);
            }
        }
        // console.log(6, points);
        //push back into object to be sent out
        vec3.copy(obj.color, color);
        return points;
    }
}