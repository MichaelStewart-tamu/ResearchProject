class Camera
{
    //creating public variables
    aspect;
	fovy;
	znear;
	zfar;
    //creating private variables
    #rotations = vec2.create();
    #translations = vec3.create();
    #mousePrev = vec2.create();
    #state;
    #rfactor;
    #tfactor;
    #sfactor;
    currentlyClicking
    shiftBool;
    keyNumber;

    #resetting;
    #translationsInit = vec3.create();
    #rotationsInit = vec2.create();
    #numx;
    #numy;
    #colors;
    #rayPts;
    #currx;
    #curry;
    #showAll;

    constructor()
    {
        // this.aspect = 1.0;
        this.aspect = canvas.clientWidth / canvas.clientHeight;
        this.fovy = (45.0 * Math.PI) / 180.0;
        this.znear = 0.1;
        this.zfar = 100.0;
        // vec2.set(this.#rotations, 0.0, 0.0);
        this.#rotations[0] = 0.0;
        this.#rotations[1] = 0.0;
        vec3.set(this.#translations, 0.0, 0.0, -5.0);
        this.#rfactor = 0.01;
        this.#tfactor = 0.001;
        this.#sfactor = -0.001;

        this.#translationsInit = this.#translations;
        this.#rotationsInit = this.#rotations;
        this.#resetting = false;
        this.#numx = 25;
        this.#numy = 25;
        this.#currx = 0;
        this.#curry = 0;
        this.#showAll = true;
        this.currentlyClicking = false;
        this.shiftBool = false;
        this.keyNumber = 0;
        //TODO: comeback later
        // this.colors
    }

    mouseClicked(x, y, shift, ctrl, alt)
    {
        this.#mousePrev[0] = x;
        this.#mousePrev[1] = y;
        if(shift)
        {
            this.#state = "translate";
        }
        else if(ctrl)
        {
            this.#state = "scale";
        }
        else
        {
            this.#state = "rotate";
        }
        this.#resetting = false;
    }

    mouseMoved(x, y)
    {
        var mouseCurr = vec2.create();
        vec2.set(mouseCurr, x, y);
        // var dv = mouseCurr - this.#mousePrev;
        var dv = vec2.create();
        vec2.sub(dv, mouseCurr, this.#mousePrev);
        // console.log("testing inside mouseMoved", this.#state, this.#rotations);
        switch(this.#state)
        {
            case "rotate":
                // vec2.multiply(this.#rotations, this.#rfactor, dv);
                this.#rotations[0] += this.#rfactor * dv[0];
                this.#rotations[1] += this.#rfactor * dv[1];
                break;
            case "translate":
                this.#translations[0] -= this.#translations[2] * this.#tfactor * dv[0];
                this.#translations[1] += this.#translations[2] * this.#tfactor * dv[1];
                break;
            case "scale":
                this.#translations[2] *= (this.#sfactor * dv[1]);
                break;
        }
        this.#mousePrev = mouseCurr;
        this.#resetting = false;
    }

    scrolling(delta)
    {
        this.#translations[2] *= (1.0 - this.#sfactor * delta);
    }

    applyProjectionMatrix(P)
    {
        var tempProjMatrix = new Float32Array(16);
        tempProjMatrix = mat4.create();
        mat4.perspective(tempProjMatrix, this.fovy, this.aspect, this.znear, this.zfar);
        // console.log("inside of applyProjectionMatrix()", tempProjMatrix);
        P.multMatrix(tempProjMatrix);
    }

    applyViewMatrix(MV)
    {
        if(this.#resetting)
        {
            var alpha = 0.2;
            this.#translations[0] = (1.0 - alpha) * this.#translations[0] + alpha * this.#translationsInit[0];
            this.#translations[1] = (1.0 - alpha) * this.#translations[1] + alpha * this.#translationsInit[1];
            this.#translations[2] = (1.0 - alpha) * this.#translations[2] + alpha * this.#translationsInit[2];
            this.#rotations[0] = (1.0 - alpha) * this.#rotations[0] + alpha * this.#rotationsInit[0];
            this.#rotations[1] = (1.0 - alpha) * this.#rotations[1] + alpha * this.#rotationsInit[1];
        }
        MV.translate(this.#translations[0], this.#translations[1], this.#translations[2]);
        MV.rotate(this.#rotations[1], this.#rotations[0], 0.0);
    }

    applyCameraMatrix(MV)
    {
        MV.rotate((-1.0 * this.#rotations[1]), (-1.0 * this.#rotations[0]), 0.0);
        MV.translate((-1.0 * this.#translations[0]), (-1.0 * this.#translations[1]), (-1.0 * this.#translations[2]));
    }

    moveCurr(dx, dy)
    {
        this.#currx += dx;
        this.#curry += dy;
        
        if(this.#currx < 0)
        {
            this.#currx = this.#numx - 1.0;
        }
        else if(this.#currx >= this.#numx)
        {
            this.#currx = 0;
        }
        
        if(this.#curry < 0)
        {
            this.#curry = this.#numy - 1.0;
        }
        else if(this.#curry >= this.#numy)
        {
            this.#curry = 0;
        }
    }

    reset()
    {
        this.#resetting = true;
    }
}