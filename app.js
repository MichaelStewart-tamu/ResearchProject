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
											RunDemo(vsText, fsText, model0Obj, model1Obj, model2Obj);	//finally calling the next function to render
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
}

const keyReleased = function(cam, event)
{
	if("Shift" === event.key)
	{
		cam.shiftBool = false;
	}
	console.log("have released the key", event.key);
}

// function KeyDown( event )
// 	{
// 		// console.log(event.key);
// 		if ( "ArrowUp" === event.key )
// 		{
// 			console.log("^");
// 			console.log('|');
// 		}
// 		else if ( "ArrowDown" === event.key )
// 		{
// 			console.log("|");
// 			console.log('V');
// 		}
// 		else if ( "ArrowRight" === event.key )
// 		{
// 			console.log("pressed the ->");
// 		}
// 		else if ( "ArrowLeft" === event.key )
// 		{
// 			console.log("pressed the <-");
// 		}

// 		if("Shift" === event.key)
// 		{
// 			console.log(event.key);
// 		}
// 	}





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
var RunDemo = function (vertexShaderText, fragmentShaderText, SusanModel, bunnyModel, planeModel) 
{
	console.log('Have entered teh runDemo Function');	//making sure that the function has been entered
	model = SusanModel;


	//initializing rendering settings
	gl.clearColor(0.75, 0.85, 0.8, 1.0);	//background color
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);	//clearing buffers
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);	//back of the face of triangles will not be rendered

	//initializing the program
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



	//creating shapes
	testingShape = new Shape();
	testingShape.init(SusanModel);

	bunnyShape = new Shape();
	bunnyShape.init(bunnyModel);

	planeShape = new Shape();
	planeShape.init(planeModel);

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

	var loop = function () {
		//reset the background color
		gl.clearColor(0.40, 0.40, 0.40, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);	//clear buffers

		// SceneTest(testingProgram, bunnyModel, SusanModel, viewMatrix, worldMatrix, invertedMatrix, invertedTransposeMatrix, temp);
		// Scene0(testingProgram, planeModel, SusanModel, bunnyModel, viewMatrix, worldMatrix, invertedMatrix, invertedTransposeMatrix, temp);
		Scene1(camera, testingProgram, bunnyShape, testingShape);

		requestAnimationFrame(loop);	//calling this function again
	};
	requestAnimationFrame(loop);
};
