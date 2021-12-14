
class MatrixStack
{
    stack = [];
    height;

    constructor()
    {
        this.height = 0;
        this.stack.push(mat4.create());
        this.height = 1;
    }

    pushMatrix()
    {
        var newLayer = new Float32Array(16);
        mat4.copy(newLayer, this.stack[this.stack.length - 1]); //performs a deep copy of the current top matrix into newLayer

        this.stack.push(newLayer);  //pushing newLayer ontop
        this.height++;  //increase height
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
        this.stack[this.stack.length - 1] = newLayer;
    }

    multMatrix(inputMatrix)
    {
        var temp = this.stack[this.stack.length - 1];
        // temp = temp * inputMatrix;
        mat4.multiply(temp, temp, inputMatrix);
        this.stack[this.stack.length - 1] = temp;
    }

    translate(x, y, z)
    {
        var temp = this.stack[this.stack.length - 1];
		mat4.translate(temp, temp, [x, y, z]);
        this.stack[this.stack.length - 1] = temp;
    }    
    
    scale(x, y, z)
    {
        mat4.scale(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], [x, y, z]);
    }
    
    rotate(x, y, z)
    {
        mat4.rotate(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], x, [1, 0, 0]);
        mat4.rotate(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], y, [0, 1, 0]);
        mat4.rotate(this.stack[this.stack.length - 1], this.stack[this.stack.length - 1], z, [0, 0, 1]);
    }

    topMatrix()
    {
        return this.stack[this.stack.length - 1];
    }

    topMatrixIT()
    {
        var tempInverted = new Float32Array(16);
        var tempInvertedTranspose = new Float32Array(16);
        mat4.invert(tempInverted, this.stack[this.stack.length - 1]);
        mat4.transpose(tempInvertedTranspose, tempInverted);
        return tempInvertedTranspose;
    }

    print()
    {
        console.log("looping through matrix stack");
        for(var i = this.stack.length - 1; i > -1 ; i--)
        {
            console.log("Level: ", i, this.stack[i]);
        }
    }
}