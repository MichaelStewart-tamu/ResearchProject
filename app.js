//This function will be called from the index.html page
var InitDemo = function () 
{
	loadTextResource('./shader.vs.glsl', function (vsErr, vsText) //this is loading resources and calling functions from inside the parameter while it is loading the files.
	{
		if (vsErr) 
		{
			alert('Fatal error getting vertex shader (see console)');
			console.error(vsErr);
		} 
		else 
		{
			loadTextResource('./shader.fs.glsl', function (fsErr, fsText) 
			{
				if (fsErr) 
				{
					alert('Fatal error getting fragment shader (see console)');
					console.error(fsErr);
				} 
				else 
				{
					loadJSONResource('./cylinder.json', function (model0Err, model0Obj) 
					{
						if (model0Err) 
						{
							alert('Fatal error getting Susan model (see console)');
							console.error(model0Err);
						} 
						else 
						{
							loadJSONResource('./bunny.json', function (model1Err, model1Obj) 
							{
								if (model1Err) 
								{
									alert('Fatal error getting Susan model (see console)');
									console.error(model1Err);
								} 
								else
								{
									loadJSONResource('./plane.json', function (model2Err, model2Obj) 
									{
										if (model2Err) 
										{
											alert('Fatal error getting Susan model (see console)');
											console.error(model2Err);
										} 
										else
										{
											loadTextResource('./simple_frag.glsl', function (simplefsErr, simpleFragText) 
											{
												if (simplefsErr) 
												{
													alert('Fatal error getting fragment shader (see console)');
													console.error(simplefsErr);
												} 
												else 
												{
													loadTextResource('./simple_vert.glsl', function (simplevsErr, simpleVertText) 
													{
														if (simplevsErr) 
														{
															alert('Fatal error getting vertex shader (see console)');
															console.error(simplevsErr);
														} 
														else 
														{
															RunDemo(vsText, fsText, simpleFragText, simpleVertText, model0Obj, model1Obj, model2Obj);	//finally calling the next function to render
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

//functions for mouse input
const movingMouse = function(cam, event)
	{
		if(cam.currentlyClicking === true)
		{
			// console.log( event.clientX + " : " + event.clientY );
			//console.log( event );
			cam.mouseMoved(event.clientX, event.clientY);
		}
	}

const clickingMouse = function(cam, event)
{
	if ( 0 === event.button )
	{
		// console.log( "Left mouse button pressed", event);
		cam.mouseClicked(event.clientX, event.clientY, false, false, true);
		cam.currentlyClicking = true;
	}
	if ( 1 === event.button )
	{
		// console.log( "Middle mouse button pressed" );
		cam.mouseClicked(event.clientX, event.clientY, false, true, false);
		cam.currentlyClicking = true;
	}
	if (cam.shiftBool === true)
	{
		cam.mouseClicked(event.clientX, event.clientY, true, false, false);
		cam.currentlyClicking = true;
	}
}

const notClicking = function(cam, event)
{
	cam.currentlyClicking = false;
}

const scrollWheel = function(cam, event)
{
	cam.scrolling(event.deltaY);
}

//functions for keyboard input
const keyPress = function(cam, event)
{
	console.log("have entered key press, and pressed ", event.key);
	if("Shift" === event.key)
	{
		cam.shiftBool = true;
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

const keyReleased = function(cam, event)
{
	if("Shift" === event.key)
	{
		cam.shiftBool = false;
	}
	console.log("have released the key", event.key);
}

var canvas = document.getElementById('game-surface');
var gl = canvas.getContext('webgl');

if (!gl) {
	console.log('WebGL not supported, falling back on experimental-webgl');
	gl = canvas.getContext('experimental-webgl');
}

if (!gl) {
	alert('Your browser does not support WebGL');
}

//this is sort of the main	
var RunDemo = function (vertexShaderText, fragmentShaderText, simpleFragText, simpleVertText, CylModel, bunnyModel, planeModel) 
{
	console.log('Have entered the runDemo Function');	//making sure that the function has been entered


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
	// testingProgram.addUniform('mWorld');
	// testingProgram.addUniform('mView');
	// testingProgram.addUniform('mProj');
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
	gl.uniform3f(testingProgram.getUniform("kd"), 0.3, 0.3, 0.3);
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
	// Main render loop
	//

	var loopIterations = 0;
	var infinite = true;

	var loop = function () {
		//reset the background color
		gl.clearColor(0.40, 0.40, 0.40, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);	//clear buffers


		//drawing the camera
		lineProgram.bind();
		// drawingCamera(camera, lineProgram);
		camera.draw(lineProgram);
		lineProgram.unbind();


		// SceneTest(testingProgram, bunnyModel, CylModel, viewMatrix, worldMatrix, invertedMatrix, invertedTransposeMatrix, temp);
		// Scene0(testingProgram, planeModel, CylModel, bunnyModel, viewMatrix, worldMatrix, invertedMatrix, invertedTransposeMatrix, temp);
		

		testingProgram.bind();
		if("0" == camera.keyNumber)
		{
			Scene0(camera, testingProgram, bunnyShape, testingShape, planeShape, light0);
		}
		else if(camera.keyNumber == "1")
		{
			Scene1(camera, testingProgram, bunnyShape, testingShape, light0);
		}
		else if("2" == camera.keyNumber)
		{
			Scene2(camera, testingProgram, bunnyShape, testingShape, light0);
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
			Scene0(camera, testingProgram, bunnyShape, testingShape, planeShape, light0);
		}

		if(loopIterations < 50 || infinite === true)
		{
			requestAnimationFrame(loop);	//calling this function again
			loopIterations += 1;
		}
	};
	requestAnimationFrame(loop);
};
