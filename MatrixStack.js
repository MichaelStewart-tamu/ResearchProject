
class yupYup
{
    stack = [];
    height;

    constructor()
    {
        this.height = -1;   //everything works out if set to negative one
        
    }

    pushMatrix()
    {
        this.height++;
        if(this.height == 0)
        {
            this.stack.push(mat4.create());
        }
        else
        {
            var newLayer = new Float32Array(16);
            newLayer = this.stack[this.height - 1];

            let newStack = mat4.create();
            // mat4.set(newStack, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
            // newStack = mat4.clone(this.stack[this.height - 1]);
            console.log("outputting set test", mat4.str(newStack));
            this.stack.push(newLayer);
            console.log("outputting set test top", mat4.str(this.stack[this.height]), "second", mat4.str(this.stack[this.height - 1]));
        }   
    }

    popMatrix()
    {
        this.stack.pop();
        this.height--;
    }

    loadIdentity()
    {
        var newLayer = new Float32Array(16);
        mat4.identity(newLayer);
        this.stack[this.height] = newLayer;
    }

    translate(x, y, z)
    {
        console.log("inside of translate height is", this.height, "stack output", this.stack.slice(), "lower stack", this.stack[this.height - 1]);
        this.stack[1][0] = 5;
        console.log("nice", this.stack);
        // var temp = this.stack[this.height];
        // var translation = vec3.create();
		// vec3.set(translation, x, y, z);
		// mat4.translate(temp, temp, translation);
        // this.stack[this.height] = temp;

        // let newStack = mat4.create();
        //     // mat4.set(newStack, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
        // newStack = mat4.clone(this.stack[this.height]);
        // let translation = vec3.create();
        // vec3.set(translation, x, y, z);
        // mat4.translate(newStack, newStack, translation);
        // this.stack[this.height] = newStack;
        // console.log("nice", translation, newStack);

    }    

    rotate(x, y, z)
    {

    }

    scale(x, y, z)
    {

    }

    topMatrix()
    {
        console.log("inside of the class Matrix stack output", this.stack[this.height][4]);
        console.log("inside of the class Matrix stack output", this.stack[this.height][0], this.stack[this.height][1], this.stack[this.height][2], this.stack[this.height][3], this.stack[this.height][4], this.stack[this.height][5], this.stack[this.height][6], this.stack[this.height][7], this.stack[this.height][8], this.stack[this.height][9], this.stack[this.height][10], this.stack[this.height][11], this.stack[this.height][12], this.stack[this.height][13], this.stack[this.height][14], this.stack[this.height][15]);
        
        return this.stack[this.height];
    }

    topMatrixIT()
    {

    }
}