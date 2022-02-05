
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
const keyPress = function(cam, event)
{
	//DEBUG STATEMENT
	// console.log("have entered key press, and pressed ", event.key);

	if("Shift" === event.key)	//check if the key in quotes is one that the event is currently changing, NOTE:: three equation marks in javaScript acts as a check of definite certainty
	{
		cam.shiftBool = true;
		cam.toggleShowAll();
	}

	if("0" === event.key)
	{
		cam.keyNumber = 0;
		cam.reset();

	}
	if("1" === event.key)
	{
		cam.keyNumber = 1;
		cam.reset();
	}
	if("2" === event.key)
	{
		cam.keyNumber = 2;
		cam.reset();
	}
	if("3" === event.key)
	{
		cam.keyNumber = 3;
		cam.reset();
	}
	if("4" === event.key)
	{
		cam.keyNumber = 4;
		cam.reset();
	}
	if("5" === event.key)
	{
		cam.keyNumber = 5;
		cam.reset();
	}
	if("6" === event.key)
	{
		cam.keyNumber = 6;
		cam.reset();
	}
	if("7" === event.key)
	{
		cam.keyNumber = 7;
		cam.reset();
	}
	
	if("ArrowUp" === event.key)
	{
		cam.moveCurr(0, -1);
	}
	if("ArrowDown" === event.key)
	{
		cam.moveCurr(0, 1);
	}
	if("ArrowLeft" === event.key)
	{
		cam.moveCurr(1, 0);
	}
	if("ArrowRight" === event.key)
	{
		cam.moveCurr(-1, 0);
	}
}

//detecting when a key is no longer being pressed
const keyReleased = function(cam, event)
{
	if("Shift" === event.key)	//checking if it is the shift key being released
	{
		cam.shiftBool = false;
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
	gl.uniform1f(testingProgram.getUniform("alpha"), 1.0);

	//initialize the program for drawing lines
	lineProgram = new Program();
	lineProgram.setShaderNames(simpleVertText, simpleFragText);
	lineProgram.init();
	lineProgram.bind();
	lineProgram.addUniform('MV');
	lineProgram.addUniform('P');
	lineProgram.addAttribute('vertPosition')

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

	//Mouse Detection
	canvas.addEventListener( "mousemove", movingMouse.bind(null, camera));
	canvas.addEventListener( "mousedown", clickingMouse.bind(null, camera));
	canvas.addEventListener("mouseup", notClicking.bind(null, camera));
	canvas.addEventListener( "wheel", scrollWheel.bind(null, camera));
	//end of mouse detection

	//keyboard detection
	const bodyElement = document.querySelector( "body" );
	bodyElement.addEventListener( "keydown", keyPress.bind(null, camera));
	bodyElement.addEventListener( "keyup", keyReleased.bind(null, camera));
	//end of keyboard detection

	 //checking for errors
	 let glErr = gl.getError();
	 if(glErr != gl.NO_ERROR) 
	 {
		 console.log("GL_ERROR from before render loop = %s.\n", glErr);
	 }

	//
	// MAIN RENDER LOOP
	//

	let firstTimeRendering = false;	//TODO: come back and fix calling the raytrace function
	//testing new scene class
	let sceneTest = new Scene();

	var loopIterations = 0;
	var infinite = true;

	var loop = function () {
		//reset the background color
		gl.clearColor(0.40, 0.40, 0.40, 1.0);
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

				

				testingProgram.bind();
				if("0" == camera.keyNumber)
				{
					if(firstTimeRendering === false)
					{
						sceneTest.load(1, CylModel, bunnyModel, planeModel, sphereModel, teapotModel, evaModel);
						camera.raytrace(sceneTest);
						firstTimeRendering = true;
					}

					sceneTest.draw(MV, testingProgram);
					//variables needed for intersect call testing
					origin = vec3.create();
					origin = vec3.fromValues(0.0, 0.0, 3.0);
	
					direction = vec3.create();
					direction = vec3.fromValues(0.0, 0.0, -1.0);

					colorInput = vec3.create();

					// sceneTest.trace(camera, origin, direction, colorInput, 500, 4.0, true);
					// Scene5(camera, testingProgram, sphereShape, teapotShape, evaShape, light0);
				}
				else if(camera.keyNumber == "1")
				{
					Scene0(camera, testingProgram, sphereShape, testingShape, planeShape, light0);
				}
				else if("2" == camera.keyNumber)
				{
					Scene2(camera, testingProgram, bunnyShape, testingShape, light0);
				}
				else if("3" == camera.keyNumber)
				{
					Scene3(camera, testingProgram, teapotShape, evaShape, light0);
				}
				else if("4" == camera.keyNumber)
				{
					Scene4(camera, testingProgram, teapotShape, evaShape, light0);
				}
				else if("5" == camera.keyNumber)
				{
					Scene1(camera, testingProgram, bunnyShape, testingShape, light0);
				}
				else if("6" == camera.keyNumber)
				{
					Scene6(camera, testingProgram, bunnyShape, light0);
				}
				else if("7" == camera.keyNumber)
				{
					Scene7(camera, testingProgram, bunnyShape, light0);
				}
				else
				{
					Scene5(camera, testingProgram, teapotShape, evaShape, light0);
				}

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
