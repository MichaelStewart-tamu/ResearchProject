
// //object literal syntax
// //creating an object with members which can be properties or functions
// const circle = {
//     //Key:  value
//     radius: 1,
//     location: {
//         x: 1,
//         y: 1
//     },
//     draw: function() {
//         console.log('draw');
//     }
// };

// circle.draw();


// //FACTORY RECONSTRUCTOR FUNCTION
// function createCircle(radius) {
//     return {
//     //Key:  value
//     radius,     //same thing as radius: radius. However with the input parameter the same as the key you can just put a comma instead of a :
//     draw: function()
//     {
//         console.log('draw2');
//     }
//   };
// }

// const circle = createCircle(1);
// circle.draw();



// //FACTORY RECONSTRUCTOR FUNCTION
// function createCircle(radius) {
//     return {
//     //Key:  value
//     radius,     //same thing as radius: radius. However with the input parameter the same as the key you can just put a comma instead of a :
//     draw: function()
//     {
//         console.log('draw2');
//     }
//   };
// }

// const circle = createCircle(1);


// //CONSTRUCTOR FUNCTION
// function Circle(radius) {
//     this.radius = radius;   //a refrence to the object executing the code
//     this.draw = function() {
//         console.log('draw3');
//     }
//     //no explicit return object (return this) because this happens by default
// }

// const anotherCircle = new Circle(1);    //using new opperator will create an empty object, and will set this to point to object (by default 'this' point to the global object which is the window object.)
// anotherCircle.draw();

// ------new lesson----

// let x = { value: 10};
// let y = x;

// x.value = 20;

// let obj = {value: 10};

// function increase(obj)
// {
//     obj.value++;
// }

// increase(obj);
// console.log(obj);

// ------new lesson----

function Circle(radius) {
    this.radius = radius;   //a refrence to the object executing the code
    this.draw = function() {
        console.log('draw3');
    }
    //no explicit return object (return this) because this happens by default
}

const anotherCircle = new Circle(1);    //using new opperator will create an empty object, and will set this to point to object (by default 'this' point to the global object which is the window object.)

//user.token = '';
anotherCircle.location = {x: 1};

const propertyName = 'location';
anotherCircle[propertyName] = {x:1};   //when the name of the variable you want to add is dynamic
anotherCircle['location'] = {x: 1}

// //both work
// delete anotherCircle.location;
// delete anotherCircle['location'];

//--------- NEw Lession--------

for(let key in anotherCircle)
{
    console.log(key, anotherCircle[key]);
}

//-------------------
var canvas = document.getElementById('game-surface');
var gl = canvas.getContext('webgl');
//testing if gl worked
if (!gl) {
    console.log('WebGL not supported, falling back on experimental-webgl');
    gl = canvas.getContext('experimental-webgl');
}

if (!gl) {
    alert('Your browser does not support WebGL');
}

//canvas info
gl.clearColor(0.75, 0.85, 0.8, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);
gl.enable(gl.CULL_FACE);
gl.frontFace(gl.CCW);
gl.cullFace(gl.BACK);

console.log("testing program");
testingProgram = new Program();
// testingProgram.setShaderNames('./shader.vs.glsl', './shader.fs.glsl');
testingProgram.setShaderNames(phong_vert, phong_frag);
console.log("after setShaderNames");
testingProgram.init();
testingProgram.bind();
// testingProgram.addAttribute('vertPosition');
// testingProgram.getAttribute("vertPosition");
// console.log("testing get Attribute", testingProgram.getAttribute("vertPosition"));
testingProgram.addAttribute('aPos');
testingProgram.getAttribute("aPos");
testingProgram.addAttribute('aNor');
testingProgram.addAttribute('aTex');
testingProgram.addUniform('P');
testingProgram.addUniform('MV');
testingProgram.addUniform('MVit');
testingProgram.addUniform('kd');
testingProgram.addUniform('ks');
testingProgram.addUniform('ka');
testingProgram.addUniform('s');
testingProgram.addUniform('lPos0');
testingProgram.addUniform('lPos1');
testingProgram.addUniform('lInt0');
testingProgram.addUniform('lInt1');
testingProgram.addUniform('alpha');
testingProgram.bind();

//making sure they all show up
console.log("testing all variables were added correctly", "P", testingProgram.getUniform("P"), "MV", testingProgram.getUniform("MV"), "MVit", testingProgram.getUniform("MVit"), "kd", testingProgram.getUniform("kd"), "ks", testingProgram.getUniform("ks"), "ka", testingProgram.getUniform("ka"), "s", testingProgram.getUniform("s"), "lpos0", testingProgram.getUniform("lPos0"), "lPos1", testingProgram.getUniform("lPos1"), "lInt0", testingProgram.getUniform("lInt0"), "lInt1", testingProgram.getUniform("lInt1"), "alpha", testingProgram.getUniform("alpha"), "aPos", testingProgram.getAttribute("aPos"), "aNor", testingProgram.getAttribute("aNor"), "aTex", testingProgram.getAttribute("aTex"));

testingProgram.testing();
// testingProgram.unbind();

for(let Key in testingProgram)
{
    console.log(key, testingProgram[key]);
}

//testing light class
// testingLight = new Light();
// console.log("Light variable test ", testingLight.exampleVariable, "position: ", testingLight.position);
// testingLight.testing();
// MV = 0;
// sphere = 0;
// testingLight.draw(MV, testingProgram, sphere);

function listFruits() {
    let fruits = ["apple", "cherry", "pear"]
    
    fruits.map((fruit, index) => {
      console.log(index, fruit)
    })
  }
  
listFruits()

loadJSONResource('./Susan.json', function (modelErr, modelObj) 
{
    if (modelErr) 
    {
        alert('Fatal error getting Susan model (see console)');
        console.error(modelErr);
    } 
    else 
    {
        
        testingProgram.bind();
        testingShape = new Shape();
        testingShape.init(modelObj);

        //MV = mView * mWorld
        

        // var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
        // var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
        // var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');

        var worldMatrix = new Float32Array(16);
        var viewMatrix = new Float32Array(16);
        var projMatrix = new Float32Array(16);
        mat4.identity(worldMatrix);
        mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
        mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

        var MV = new Float32Array(16);
        mat4.multiply(MV, viewMatrix, worldMatrix); //MV = mView * mWorld

        var MVit = new Float32Array(16);
        mat4.invert(MVit, MV);

        gl.uniformMatrix4fv(testingProgram.getUniform("P"), gl.FALSE, projMatrix);
        gl.uniformMatrix4fv(testingProgram.getUniform("MV"), gl.FALSE, MV);
        gl.uniformMatrix4fv(testingProgram.getUniform("MVit"), gl.FALSE, MVit);

        // gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        // gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
        // gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

        //
        //main rendering loop
        //
        //
        // Main render loop
        //
        var identityMatrix = new Float32Array(16);
        mat4.identity(identityMatrix);
        var angle = 0;
        var loop = function () 
        {
            // angle = performance.now() / 1000 / 6 * 2 * Math.PI;
            // mat4.rotate(yRotationMatrix, identityMatrix, angle, [0, 1, 0]);
            // mat4.rotate(xRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
            // mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
            // gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

            // gl.bindTexture(gl.TEXTURE_2D, susanTexture);
            // gl.activeTexture(gl.TEXTURE0);

            // gl.drawElements(gl.TRIANGLES, susanIndices.length, gl.UNSIGNED_SHORT, 0);
            testingProgram.bind();
            testingShape.draw(testingProgram);
            testingProgram.unbind();
            
            
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);

        testingProgram.unbind();
    }
});