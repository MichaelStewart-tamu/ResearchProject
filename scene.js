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

    load(scene, CylModel, bunnyModel, planeModel, sphereModel, teapotModel, evaModel, foregroundModel, leftBaseModel, leftDetailsModel, lightBlockModel, rightBaseModel, rightDetailsModel)
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

        let fShape = new Shape();
        fShape.init(foregroundModel);

        let leftB = new Shape();
        leftB.init(leftBaseModel);

        let leftD = new Shape();
        leftD.init(leftDetailsModel);

        let lightShade = new Shape();
        lightShade.init(lightBlockModel);

        let rightB = new Shape();
        rightB.init(rightBaseModel);

        let rightD = new Shape();
        rightD.init(rightDetailsModel);
        

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

                let sphereRefract = new thingSphere(sphereShape);
                this.#things.push(sphereRefract);
                sphereRefract.resetRotation(0.0, 0.0, 0.0)
                sphereRefract.resetScale(0.45, 0.45, 0.45);
                sphereRefract.resetPosition(0.0, 0.0, 3.5);  //TODO: make random
                sphereRefract.material.type = "REFRACT";
                // sphereRefract.material.setKD(0.0, 0.5, 0.5);
                // sphereRefract.material.setKS(1.0, 1.0, 0.5);
                // sphereRefract.material.setKA(0.1, 0.1, 0.1);
                // sphereRefract.material.s = 100.0;
                sphereRefract.material.n = 3.52;

                let cylinder = new thingCylinder(cylinderShape);
                this.#things.push(cylinder);
                cylinder.resetRotation((-0.5 * Math.PI), 0.0, 0.0)
                cylinder.resetScale(0.2, 0.2, 2.0);
                cylinder.resetPosition(-0.15, 0.0, -0.65);  //TODO: make random
                cylinder.material.setKD(1.0, 0.0, 1.0);
                cylinder.material.setKS(1.0, 1.0, 0.5);
                cylinder.material.setKA(0.1, 0.1, 0.1);
                cylinder.material.s = 100.0;

                let sphere0 = new thingSphere(sphereShape);
                this.#things.push(sphere0);
                sphere0.resetRotation(0.0, 0.0, 0.0)
                sphere0.resetScale(0.25, 0.25, 0.25);
                sphere0.resetPosition(0.25, -0.75, 1.5);  //TODO: make random
                sphere0.material.setKD(1.0, 1.0, 0.0);
                sphere0.material.setKS(1.0, 1.0, 0.5);
                sphere0.material.setKA(0.1, 0.1, 0.1);
                sphere0.material.s = 100.0;

                let sphere1 = new thingSphere(sphereShape);
                this.#things.push(sphere1);
                sphere1.resetRotation(0.0, 0.0, 0.0)
                sphere1.resetScale(0.25, 0.25, 0.25);
                sphere1.resetPosition(0.5, -0.75, 0.0);  //TODO: make random
                sphere1.material.type = "PHONG";
                sphere1.material.setKD(0.75, 0.15, 0.33);
                sphere1.material.setKS(1.0, 1.0, 0.5);
                sphere1.material.setKA(0.1, 0.1, 0.1);
                sphere1.material.s = 100.0;

                let sphere2 = new thingSphere(sphereShape);
                this.#things.push(sphere2);
                sphere2.resetRotation(0.0, 0.0, 0.0)
                sphere2.resetScale(0.33, 0.33, 0.33);
                sphere2.resetPosition(-0.5, -0.66, -0.25);  //TODO: make random
                sphere2.material.type = "REFLECT"
                sphere2.material.setKD(0.0, 1.0, 1.0);
                sphere2.material.setKS(1.0, 1.0, 0.5);
                sphere2.material.setKA(0.1, 0.1, 0.1);
                sphere2.material.s = 100.0;

                let sphereBonus = new thingSphere(sphereShape);
                this.#things.push(sphereBonus);
                sphereBonus.resetRotation(0.0, 0.0, 0.0)
                sphereBonus.resetScale(0.25, 0.25, 0.25);
                sphereBonus.resetPosition(-0.75, -0.75, 1.5);  //TODO: make random
                sphereBonus.material.type = "PHONG"
                sphereBonus.material.setKD(0.0, 0.80, 0.60);
                sphereBonus.material.setKS(1.0, 1.0, 0.5);
                sphereBonus.material.setKA(0.1, 0.1, 0.1);
                sphereBonus.material.s = 100.0;

                

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
                light0.position = [1.0, 2.0, 2.0];
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
                    light0.position = [-1.0, 1.0, 1.0];
                    this.#lights[1].position = [-1.0, 1.0, 1.0];
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
                light0.position = [0.050452, 10.787, -6.9591];
                light0.intesity = 1.0;
                light0.number = 0;

                // light1 = new Light();
                this.#lights.push(new Light());
                this.#lights[1].position = [-2.0715, -2.3278, -19.781];
                this.#lights[1].intesity = 1.0;
                this.#lights[1].number = 1;

                let evaUnit1 = new thingObj(evaShape);
                this.#things.push(evaUnit1);
                evaUnit1.resetPosition(0.0, -1.5, -5.0);
                evaUnit1.resetScale(1.0, 1.0, 1.0);
                evaUnit1.resetRotation(0.0, Math.PI * 0.5, 0.0);
                evaUnit1.material.setKD(1.0, 1.0, 1.0);
                evaUnit1.material.setKS(0.4, 0.4, 0.4);
                evaUnit1.material.setKA(0.01, 0.01, 0.01);
                evaUnit1.material.s = 20.0;

                let foreground = new thingObj(fShape);
                this.#things.push(foreground);
                foreground.resetPosition(0.0, 0.0, 0.0);
                foreground.resetScale(1.0, 1.0, 1.0);
                foreground.resetRotation(0.0, 0.0, 0.0);
                foreground.material.setKD(1.0, 1.0, 1.0);
                foreground.material.setKS(0.1, 0.1, 0.1);
                foreground.material.setKA(0.0, 0.0, 0.0);
                foreground.material.s = 200.0;

                let leftBase = new thingObj(leftB);
                this.#things.push(leftBase);
                leftBase.resetPosition(0.0, 0.0, 0.0);
                leftBase.resetScale(1.0, 1.0, 1.0);
                leftBase.resetRotation(0.0, 0.0, 0.0);
                leftBase.material.setKD(1.0, 1.0, 1.0);
                leftBase.material.setKS(0.1, 0.1, 0.1);
                leftBase.material.setKA(0.0, 0.0, 0.0);
                leftBase.material.s = 200.0;

                let leftDetails = new thingObj(leftD);
                this.#things.push(leftDetails);
                leftDetails.resetPosition(0.0, 0.0, 0.0);
                leftDetails.resetScale(1.0, 1.0, 1.0);
                leftDetails.resetRotation(0.0, 0.0, 0.0);
                leftDetails.material.setKD(0.0, 0.0, 0.0);
                leftDetails.material.setKS(0.8, 0.8, 0.8);
                leftDetails.material.setKA(0.0, 0.0, 0.0);
                leftDetails.material.s = 3.0;

                let rightBase = new thingObj(rightB);
                this.#things.push(rightBase);
                rightBase.resetPosition(0.0, 0.0, 0.0);
                rightBase.resetScale(1.0, 1.0, 1.0);
                rightBase.resetRotation(0.0, 0.0, 0.0);
                rightBase.material.setKD(0.1, 0.1, 0.1);
                rightBase.material.setKS(0.1, 0.1, 0.1);
                rightBase.material.setKA(0.035, 0.035, 0.035);
                rightBase.material.s = 20.0;

                let rightDetails = new thingObj(rightD);
                this.#things.push(rightDetails);
                rightDetails.resetPosition(0.0, 0.0, 0.0);
                rightDetails.resetScale(1.0, 1.0, 1.0);
                rightDetails.resetRotation(0.0, 0.0, 0.0);
                rightDetails.material.setKD(0.75, 0.75, 0.75);
                rightDetails.material.setKS(0.8, 0.8, 0.8);
                rightDetails.material.setKA(0.0, 0.0, 0.0);
                rightDetails.material.s = 50.0;


                let lightBlock = new thingObj(lightShade);
                this.#things.push(lightBlock);
                lightBlock.resetPosition(0.0, 0.0, 0.0);
                lightBlock.resetScale(1.0, 1.0, 1.0);
                lightBlock.resetRotation(0.0, 0.0, 0.0);
                lightBlock.material.setKD(0.0, 0.0, 0.0);
                lightBlock.material.setKS(0.8, 0.8, 0.8);
                lightBlock.material.setKA(0.0, 0.0, 0.0);
                lightBlock.material.s = 50.0;

                let basegroundPlane = new thingPlane(planeShape);
                this.#things.push(basegroundPlane);
                basegroundPlane.resetRotation((-0.5/2.0 * Math.PI), 0.0, 0.0)
                basegroundPlane.resetScale(100.0, 100.0, 100.0);
                basegroundPlane.resetPosition(0.0, -24.894, 0.0);
                basegroundPlane.material.setKD(0.0, 0.0, 0.0);
                basegroundPlane.material.setKS(0.8, 0.8, 0.8);
                basegroundPlane.material.setKA(0.075, 0.075, 0.075);
                basegroundPlane.material.s = 1.75;

                let baseGround = new thingPlane(planeShape);
                this.#things.push(baseGround);
                baseGround.resetRotation((-1.044444/2.0* Math.PI), 0.0, 0.0)
                baseGround.resetScale(100.0, 100.0, 100.0);
                baseGround.resetPosition(0.0, 0.0, 19.3191);
                baseGround.material.setKD(0.0, 0.0, 0.0);
                baseGround.material.setKS(0.0, 0.0, 0.0);
                baseGround.material.setKA(0.0, 0.0, 0.0);
                baseGround.material.s = 0.0;

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
            else if(mat_.type="REFRACT")
            {
                if(depth < this.#depthMax)
                {
                    console.log("entered refract");
                    //compute refracted ray
                    let V = vec3.fromValues((-1.0 * rayDir[0]), (-1.0 * rayDir[1]), (-1.0 * rayDir[2]));
                    let N = vec3.fromValues(nor_[0], nor_[1], nor_[2]);
                    // The new index of refraction depends on whether the ray
                    // is entering or exiting the material. If the ray is hitting
                    // the back of the material (e.g., inside of the sphere), then
                    // the new index of refraction is 1.0 (air). Otherwise, it is
                    // from the material.
                    let n1 = back_ ? 1.0 : mat_.n;
                    let VN = vec3.dot(V, N);
                    let tmp = n1*n1 - n0*n0*(1.0 - VN*VN);
                    let rDir = vec3.create();
                    let n;
                    if(tmp < 0.0)
                    {
                        console.log("refract temp");
                        //Total internal reflection
                        // rDir = 2.0*VN*N - V;
                        vec3.subtract(rDir, vec3.fromValues((2.0*VN*N[0]), (2.0*VN*N[1]), (2.0*VN*N[2])), V);
                        n = n0;
                    }
                    else
                    {
                        console.log("refract else");
                        // rDir = -(Math.sqrt(tmp)/n1)*N + (n0/n1)*(VN*N - V);
                        let cooefForN = Math.sqrt(tmp) / n1;
                        let tempN = vec3.fromValues((cooefForN * N[0]), (cooefForN * N[1]), (cooefForN * N[2]));
                        let negTempN = vec3.fromValues((-1.0 * tempN[0]), (-1.0 * tempN[1]), (-1.0 * tempN[2]));

                        let VNtimesN = vec3.fromValues((VN * N[0]), (VN * N[1]), (VN * N[2]));
                        let VNNsubV = vec3.create();
                        vec3.subtract(VNNsubV, VNtimesN, V);
                        let n0divn1 = n0/n1;
                        let rightSide = vec3.fromValues((n0divn1 * VNNsubV[0]), (n0divn1 * VNNsubV[1]), (n0divn1 * VNNsubV[2]));

                        let tempAdd = vec3.create();
                        vec3.add(tempAdd, negTempN, rightSide);
                        rDir = vec3.fromValues(tempAdd[0], tempAdd[1], tempAdd[2]);



                        // let tempN = vec3.fromValues(((Math.sqrt(tmp)/n1) * N[0]), ((Math.sqrt(tmp)/n1) * N[1]), ((Math.sqrt(tmp)/n1) * N[2]));
                        // let tempSub = vec3.create();
                        // vec3.subtract(tempSub, vec3.fromValues((VN * N[0]), (VN * N[1]), (VN * N[2])), V);
                        // vec3.add(rDir, tempN, vec3.fromValues(((n0/n1)* tempSub[0]), ((n0/n1)* tempSub[1]), ((n0/n1)* tempSub[2])));
                        // rDir = vec3.fromValues((-1.0 * rDir[0]), (-1.0 * rDir[1]), (-1.0 * rDir[2]));

                        n = n1;
                    }
                    // DEBUG with builtin refract() function
                    //                vec3 V_(V(0), V(1), V(2));
                    //                vec3 N_(N(0), N(1), N(2));
                    //                vec3 foo = glm::refract(-V_, N_, float(n0/n1));
                    //                rDir << foo.x, foo.y, foo.z;
                    // Advance the ray origin slightly so that
                    // the point itself will not occlude it
                    // let rOrig = vec3.create();
                    // vec3.add(rOrig, pos_, vec3.fromValues((1e-4 * rDir[0]), (1e-4 * rDir[1]), (1e-4 * rDir[2])));
                    let rOrigRefract = vec3.fromValues((pos_[0] + (1e-4 * rDir[0])), (pos_[1] + (1e-4 * rDir[1])), (pos_[2] + (1e-4 * rDir[2])));
                    
                    //pack into an object the values
                    // let color = vec3.create();
                    // color = vec3.fromValues(0.0, 0.0, 0.0);
                    let sceneObj = {
                        rayOrig: rOrigRefract,
                        rayDir: rDir,
                        color: color,
                        depth: depth + 1,
                        n0: n0,
                        storePoints: storePoints
                    };
                    let morePoints = this.trace(this, sceneObj);
                    console.log("morePoints");
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