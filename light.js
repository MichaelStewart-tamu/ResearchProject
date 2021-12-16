class Light
{
    //declaring a varible
    exampleVariable = 5;
    intesity;
    position;   //this is listed as a vec3, but will just be an array

    //private variables
    #number;
    static count = 0; //TODO: static?

    //functions
    //constructor
    constructor()
    {
        this.position = [0.0, 0.0, 0.0];
        this.intesity = 1.0;
        this.#number = 0;
        // this.#count = 0;
        // this.#count += this.#count + 1;
        // this.#number = this.#count++;
        this.#number = ++Light.count;
        // console.log("constructor output ", this.#number);
    }


    draw(MV, prog)
    {
        // if(this.intesity == 0.0)
        // {
        //     return;
        // }
        // gl.glUniform3f(prog.getUniform("kd"), 0.0, 0.0, 0.0);

        //create variables to store calculations into
        var tempCameraPos = vec4.create();  //final calculation of light position in camera space
        var tempPos = vec4.create();    //light position in world space
        vec4.set(tempPos, this.position[0], this.position[1], this.position[2], 1.0);   //placing the values into the vec4

        //move MV
        MV.translate(this.position[0], this.position[1], this.position[2]);
        
        //calculate camera space position
        vec4.transformMat4(tempCameraPos, tempPos, MV.topMatrix());
        gl.uniform3f(prog.getUniform("lPos0"), tempCameraPos[0], tempCameraPos[1], tempCameraPos[2]);        
    }

    testing()
    {
        console.log("testing Light");
    }

    //constructor
    //draw
    //applyGL
    
}