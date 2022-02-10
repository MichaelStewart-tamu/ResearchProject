document.getElementById( "game-surface" ).onwheel = function(event){
    event.preventDefault();
};

document.getElementById( "game-surface" ).onmousewheel = function(event){
    event.preventDefault();
};

//This function will be called from the index.html page
var InitDemo = function () 
{
	loadTextResource('./shader.vs.glsl', function (vsErr, vsText) //this is loading resources and calling functions from inside the parameter while it is loading the files.
	{
		if (vsErr) //if the function loadTextResource returns an error
		{
			alert('Fatal error getting vertex shader (see console)');
			console.error(vsErr);
		} 
		else 	//everything worked out move on
		{
			loadTextResource('./shader.fs.glsl', function (fsErr, fsText)	//This will load the fragment shader
			{
				if (fsErr) //if the function loadTextResource returns an error
				{
					alert('Fatal error getting fragment shader (see console)');
					console.error(fsErr);
				} 
				else 
				{
					loadJSONResource('./cylinder.json', function (model0Err, model0Obj) //Loads cylinder model
					{
						if (model0Err) //if the function loadJSONResource returns an error
						{
							alert('Fatal error getting Susan model (see console)');
							console.error(model0Err);
						} 
						else 
						{
							loadJSONResource('./bunny.json', function (model1Err, model1Obj) //loads bunny model
							{
								if (model1Err) //if the function loadJSONResource returns an error
								{
									alert('Fatal error getting Susan model (see console)');
									console.error(model1Err);
								} 
								else
								{
									loadJSONResource('./plane.json', function (model2Err, model2Obj) //loads plane model
									{
										if (model2Err) //if the function loadJSONResource returns an error
										{
											alert('Fatal error getting Susan model (see console)');
											console.error(model2Err);
										} 
										else
										{
											loadTextResource('./simple_frag.glsl', function (simplefsErr, simpleFragText) //loads the fragment shader for lines
											{
												if (simplefsErr) //if the function loadTextResource returns an error
												{
													alert('Fatal error getting fragment shader (see console)');
													console.error(simplefsErr);
												} 
												else 
												{
													loadTextResource('./simple_vert.glsl', function (simplevsErr, simpleVertText) 	//loads the vertex shader for lines
													{
														if (simplevsErr) //if the function loadTextResource returns an error
														{
															alert('Fatal error getting vertex shader (see console)');
															console.error(simplevsErr);
														} 
														else 
														{
															loadJSONResource('./sphere1.json', function (model3Err, model3Obj) //loads sphere model
															{
																if (model3Err) //if the function loadJSONResource returns an error
																{
																	alert('Fatal error getting sphere model (see console)');
																	console.error(model3Err);
																} 
																else
																{
																	loadJSONResource('./teapot.json', function (model4Err, model4Obj) //loads teapot model
																	{
																		if (model4Err) //if the function loadJSONResource returns an error
																		{
																			alert('Fatal error getting teapot model (see console)');
																			console.error(model4Err);
																		} 
																		else
																		{
																			loadJSONResource('./evaLow.json', function (model5Err, model5Obj) //loads eva object
																			{
																				if (model5Err) //if the function loadTextResource returns an error
																				{
																					alert('Fatal error getting eva model (see console)');
																					console.error(model5Err);
																				} 
																				else
																				{
																					RealTimeView(vsText, fsText, simpleFragText, simpleVertText, model0Obj, model1Obj, model2Obj, model3Obj, model4Obj, model5Obj);	//finally calling the next function to render
																				}
																			});
																		}
																	});
																}
															});
														}
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
};

//FUNCTIONS FOR MOUSE INPUT

//This functions is used as a callback for getting the mouse cursor position data
const movingMouse = function(cam, event)
	{
		if(cam.currentlyClicking === true)	//checking if any buttons are clicked
		{
			//DEBUG STATEMENTS
			//console.log(event.clientX + " : " + event.clientY);
			//console.log(event);
			cam.mouseMoved(event.clientX, event.clientY);	//call function to effect the camera based on mouse movement
		}
	}

//function used to callback for checking if mouse is clicked
const clickingMouse = function(cam, event)
{
	//will control when camera is rotated
	if ( 0 === event.button )	//checking if the left mouse button is pressed
	{
		cam.mouseClicked(event.clientX, event.clientY, false, false, true);	//call function to effect camera based on button being clicked
		cam.currentlyClicking = true;	//changing camera private property to true, This will allow functions to check if the button is clicked
	}

	//will control when cameras position is moved
	if (cam.shiftBool === true)	//checking if shift button is pressed
	{
		cam.mouseClicked(event.clientX, event.clientY, true, false, false); //call function to effect camera based on button being clicked
		cam.currentlyClicking = true; //changing camera private property to true, This will allow functions to check if the button is clicked
	}
}

//This function acts as a call back whenever the mouse button has been released
const notClicking = function(cam, event)	//cam is used to bring in the camera object and the event is used to understand when callback has happened	NOTE:: when event is missing pressing shift will cause the program to eternally be in movement mode
{
	cam.currentlyClicking = false;
}

//This function acts as a callback whenever the scroll wheel is moving
const scrollWheel = function(cam, event)
{
	cam.scrolling(event.deltaY);
}

//FUNCTIONS FOR KEYBOARD INPUT

//detecting key presses
const keyPress = function(obj, event)
{
	//DEBUG STATEMENT
	// console.log("have entered key press, and pressed ", event.key);
	event.preventDefault();
	if("Shift" === event.key)	//check if the key in quotes is one that the event is currently changing, NOTE:: three equation marks in javaScript acts as a check of definite certainty
	{
		obj.camera.shiftBool = true;
	}

	if("0" === event.key)
	{
		obj.camera.keyNumber = 0;
		obj.scene.load(0, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);				
		obj.camera.reset();
		document.getElementById('img').src = "s0.png";
		
	}
	if("1" === event.key)
	{
		obj.camera.keyNumber = 1;
		obj.scene.load(1, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);
		obj.camera.reset();
		document.getElementById('img').src = "s1.png";
	}
	if("2" === event.key)
	{
		obj.scene.load(2, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);				
		obj.camera.reset();
		document.getElementById('img').src = "s2.png";
	}
	if("3" === event.key)
	{
		obj.scene.load(3, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);
		obj.camera.reset();
		document.getElementById('img').src = "s3.png";
	}
	if("4" === event.key)
	{
		obj.scene.load(4, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);
		obj.camera.reset();
		document.getElementById('img').src = "s5.png";
	}
	if("5" === event.key)
	{
		obj.scene.load(5, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);
		obj.camera.reset();
		document.getElementById('img').src = "s5.png";
	}
	if("6" === event.key)
	{
		obj.scene.load(6, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);
		obj.camera.reset();
		document.getElementById('img').src = "s6.png";
	}
	if("7" === event.key)
	{
		obj.scene.load(7, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);
		obj.camera.reset();
		document.getElementById('img').src = "s7.png";
	}
	if("8" === event.key)
	{
		obj.scene.load(8, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);
		obj.camera.reset();
	}
	if("9" === event.key)
	{
		obj.scene.load(9, obj.cyl, obj.bunny, obj.plane, obj.sphere, obj.teapot, obj.eva);
		obj.camera.reset();
	}
	
	if("ArrowUp" === event.key)
	{
		obj.camera.moveCurr(0, -1);
	}
	if("ArrowDown" === event.key)
	{
		obj.camera.moveCurr(0, 1);
	}
	if("ArrowLeft" === event.key)
	{
		obj.camera.moveCurr(1, 0);
	}
	if("ArrowRight" === event.key)
	{
		obj.camera.moveCurr(-1, 0);
	}

	if(" " === event.key)
	{
		obj.camera.raytrace(obj.scene);
	}
	if("a" === event.key)
	{
		obj.camera.toggleShowAll();
	}

	
}

//detecting when a key is no longer being pressed
const keyReleased = function(cam, event)
{
	if("Shift" === event.key)	//checking if it is the shift key being released
	{
		cam.camera.shiftBool = false;
	}

	//DEBUG STATEMENT
	// console.log("have released the key", event.key);
}


//Rendering the live ViewPort
var canvas = document.getElementById('game-surface');	//get information about the canvas
var gl = canvas.getContext('webgl');	//used for webGl calls

if (!gl) {
	console.log('WebGL not supported, falling back on experimental-webgl');
	gl = canvas.getContext('experimental-webgl');
}

if (!gl) {
	alert('Your browser does not support WebGL');
}

//this acts like main() in c++
var RealTimeView = function (vertexShaderText, fragmentShaderText, simpleFragText, simpleVertText, CylModel, bunnyModel, planeModel, sphereModel, teapotModel, evaModel) 	//the input arguments to this function are importing models and shader files
{
	console.log('Have entered the RealTimeView Function');	//making sure that the function has been entered

	//initializing rendering settings
	gl.clearColor(0.75, 0.85, 0.8, 1.0);	//background color
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);	//clearing buffers
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);	//back of the face of triangles will not be rendered

	//initializing the program for rendering
	testingProgram = new Program();
	testingProgram.setShaderNames(vertexShaderText, fragmentShaderText);
	testingProgram.init();
	testingProgram.bind();
	testingProgram.addAttribute('vertPosition');
	testingProgram.addAttribute('vertTexCoord');
	testingProgram.addAttribute('vertNormal');
	testingProgram.addUniform('MV');
	testingProgram.addUniform('P');
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
	//add phong values to program
	gl.uniform3f(testingProgram.getUniform("kd"), 0.3, 0.3, 0.0);
	gl.uniform3f(testingProgram.getUniform("ks"), 0.5, 0.5, 0.5);
	gl.uniform3f(testingProgram.getUniform("ka"), 0.01, 0.01, 0.01);
	gl.uniform1f(testingProgram.getUniform("s"), 5.0);
	gl.uniform3f(testingProgram.getUniform("lPos0"), -5.0, 5.0, 5.0);
	gl.uniform3f(testingProgram.getUniform("lPos1"), 0.01, 0.01, 0.01);
	gl.uniform1f(testingProgram.getUniform("lInt0"), 0.8);
	gl.uniform1f(testingProgram.getUniform("lInt1"), 0.0);
	gl.uniform1f(testingProgram.getUniform("alpha"), 1.0);

	//initialize the program for drawing lines
	lineProgram = new Program();
	lineProgram.setShaderNames(simpleVertText, simpleFragText);
	lineProgram.init();
	lineProgram.bind();
	lineProgram.addUniform('MV');
	lineProgram.addUniform('P');
	lineProgram.addAttribute('vertPosition')
	lineProgram.addUniform('inputColor');
	

	//creating shapes
	testingShape = new Shape();
	testingShape.init(CylModel);

	bunnyShape = new Shape();
	bunnyShape.init(bunnyModel);

	planeShape = new Shape();
	planeShape.init(planeModel);

	sphereShape = new Shape();
	sphereShape.init(sphereModel);

	teapotShape = new Shape();
	teapotShape.init(teapotModel);

	evaShape = new Shape();
	evaShape.init(evaModel);

	//creating lights
	light0 = new Light();

	//creating camera
	camera = new Camera();

	//creating the scene
	let sceneTest = new Scene();
	//need to initially load so that something shows up on screen without the user needing to interact first
	sceneTest.load(0, CylModel, bunnyModel, planeModel, sphereModel, teapotModel, evaModel);
	document.getElementById('img').src = "s0.png";	//initiallizing the full render				

	let obj = {	//used for the keyboard call back, can bring in an object, cannot pass by reference
		camera: camera,
		scene: sceneTest,
		cyl: CylModel,
		bunny: bunnyModel,
		plane: planeModel,
		sphere: sphereModel,
		teapot: teapotModel,
		eva: evaModel
	}

	//Mouse Detection
	canvas.addEventListener( "mousemove", movingMouse.bind(null, camera));
	canvas.addEventListener( "mousedown", clickingMouse.bind(null, camera));
	canvas.addEventListener("mouseup", notClicking.bind(null, camera));
	canvas.addEventListener( "wheel", scrollWheel.bind(null, camera));
	//end of mouse detection

	//keyboard detection
	const bodyElement = document.querySelector( "body" );
	bodyElement.addEventListener( "keydown", keyPress.bind(null, obj));
	bodyElement.addEventListener( "keyup", keyReleased.bind(null, obj));
	//end of keyboard detection

	 //checking for errors
	 let glErr = gl.getError();
	 if(glErr != gl.NO_ERROR) 
	 {
		 console.log("GL_ERROR from before render loop = %s.\n", glErr);
	 }
	

	var loopIterations = 0;	//can set how many frames in the viewport to render
	var infinite = true;	//determines if the viewport goes on forever

	var loop = function () {
		//reset the background color
		gl.clearColor(0.04, 0.04, 0.04, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);	//clear buffers

		P = new MatrixStack();
    	MV = new MatrixStack();

		P.pushMatrix();
        	camera.applyProjectionMatrix(P);
			MV.pushMatrix();
				MV.loadIdentity();
				camera.applyViewMatrix(MV);
				gl.uniformMatrix4fv(testingProgram.getUniform("P"), gl.FALSE, P.topMatrix());
				// gl.uniformMatrix4fv(program.getUniform("P"), gl.FALSE, P.topMatrix());

				//drawing the camera
				camera.draw(MV, lineProgram, testingProgram, planeShape);

				testingProgram.bind();	//bind the program needed
				sceneTest.draw(MV, testingProgram);

				if(loopIterations < 50 || infinite === true)
				{
					requestAnimationFrame(loop);	//calling this function again
					loopIterations += 1;
				}
			MV.popMatrix();
		P.popMatrix();
	};
	requestAnimationFrame(loop);
};
