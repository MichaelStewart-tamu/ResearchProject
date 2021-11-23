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
        console.log("constructor output ", this.#number);
    }

    draw(MV, prog, sphere)
    {
        if(this.intesity == 0.0)
        {
            return;
        }
        gl.glUniform3f(prog.getUniform("kd"), 0.0, 0.0, 0.0);
    }

    testing()
    {
        console.log("testing Light");
    }

    //constructor
    //draw
    //applyGL
    
}