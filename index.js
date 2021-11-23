
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
testingProgram.setShaderNames('./resources/simple_vert.glsl', './resources/simple_frag.glsl');
console.log("after setShaderNames");
testingProgram.init();
//testingProgram.testing();

for(let Key in testingProgram)
{
    console.log(key, testingProgram[key]);
}

//testing light class
testingLight = new Light();
console.log("Light variable test ", testingLight.exampleVariable, "position: ", testingLight.position);
testingLight.testing();
MV = 0;
sphere = 0;
testingLight.draw(MV, testingProgram, sphere);
