class thingSphere extends thing
{

    constructor(s)
    {
        super(s);
    }

    intersect(o, d, s, pos, nor, mat, back)
    {
        console.log("entered intersect function");
        let E = mat4.create();
        let Ei = mat4.create();
        let Eit = mat4.create();

        console.log("E ", E);
        this.getMatrices(E, Ei, Eit);
        console.log("after E", E);

    }
}