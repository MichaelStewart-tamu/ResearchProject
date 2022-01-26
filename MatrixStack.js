class MatrixStack
{
    //class public variables
    stack = [];

    constructor()
    {
        this.stack.push(mat4.create());
    }

    pushMatrix()
    {
        var newLayer = new Float32Array(16);    //create a new matrix 4x4
        mat4.copy(newLayer, this.stack[this.stack.length - 1]); //performs a deep copy of the current top matrix into newLayer
        this.stack.push(newLayer);  //pushing newLayer ontop
    }

    popMatrix()
    {
        this.stack.pop();
    }

    loadIdentity()
    {
        var newLayer = new Float32Array(16);    //create a new matrix 4x4
        mat4.identity(newLayer);    //loads identity matrix into the new matrix
        this.stack[this.stack.length - 1] = newLayer;   //push the identity onto the stack
    }

    multMatrix(inputMatrix)
    {
        var temp = this.stack[this.stack.length - 1];   //retrieve top matrix
        mat4.multiply(temp, temp, inputMatrix);         //multiply by input
        this.stack[this.stack.length - 1] = temp;       //replace to pmatrix with the result
    }

    translate(x, y, z)      //input is floats instead of a vec3 because messing with vec3s when calling this function is annoying
    {
        var temp = this.stack[this.stack.length - 1];   //retrieve top matrix
		mat4.translate(temp, temp, [x, y, z]);          //translate by x y and z
        this.stack[this.stack.length - 1] = temp;       //put the new translated matrix in the top position
    }    
    
    scale(x, y, z)       //input is floats instead of a vec3 because messing with vec3s when calling this function is annoying
    {
        mat4.scale(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], [x, y, z]);
    }
    
    rotate(x, y, z)      //input is floats instead of a vec3 because messing with vec3s when calling this function is annoying
    {
        //I can only rotate with this function one axis at a time,
        mat4.rotate(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], x, [1, 0, 0]);    //rotate the x-axis
        mat4.rotate(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], y, [0, 1, 0]);    //rotate the y-axis
        mat4.rotate(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], z, [0, 0, 1]);    //rotate the z-axis
    }

    topMatrix()     //This function will return the top matrix of the stack
    {
        return this.stack[this.stack.length - 1];
    }

    topMatrixI()
    {
        var tempInverted = new Float32Array(16);    //creating a 4x4 matrix
        mat4.invert(tempInverted, this.stack[this.stack.length - 1]);   //first invert the top matrix and stick it into tempInverted
        return tempInverted;
    }

    topMatrixIT()   //this function will return the top matrix of the stack inverted and transposed
    {
        var tempInverted = new Float32Array(16);    //creating a 4x4 matrix
        var tempInvertedTranspose = new Float32Array(16);   //creating a 4x4 matrix
        mat4.invert(tempInverted, this.stack[this.stack.length - 1]);   //first invert the top matrix and stick it into tempInverted
        mat4.transpose(tempInvertedTranspose, tempInverted);        //transpose tempInverted and stick result into tempInvertedTranspose
        return tempInvertedTranspose;
    }

    print() //This function will output the matrix stack to log
    {
        console.log("looping through matrix stack");
        for(var i = this.stack.length - 1; i > -1 ; i--)
        {
            console.log("Level: ", i, this.stack[i]);
        }
    }
}