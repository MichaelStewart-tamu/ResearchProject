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

	/*
	*****************************************
	**********MOUSE DETECTION START**********
	*****************************************
	*/
	var rotationSpeed = 1.0;

	canvas.addEventListener( "mousemove", MouseMove, false );
	canvas.addEventListener( "mousedown", MouseDown, false );
	canvas.addEventListener( "wheel", MouseWheel, false );

	function MouseMove( event )
	{
		// console.log( event.clientX + " : " + event.clientY );
		//console.log( event );
	}

	function MouseDown( event )
	{
		if ( 0 === event.button )
		{
			console.log( "Left mouse button pressed" );
		}
		if ( 1 === event.button )
		{
			console.log( "Middle mouse button pressed" );
		}
		if ( 2 === event.button )
		{
			console.log( "Right mouse button pressed" );
		}
		//console.log( event );
	}

	function MouseWheel( event )
	{
		rotationSpeed += 0.001 * event.deltaY;
		//console.log( event );
	}
	/*
	***************************************
	**********MOUSE DETECTION END**********
	***************************************
	*/

	// //TESTING
	// testingMatrixStack = new MatrixStack();
	// testingMatrixStack.pushMatrix();
	// 	testingMatrixStack.loadIdentity();
	// 	console.log("testing Matrix output should be identity", testingMatrixStack.topMatrix());
	// 	testingMatrixStack.print();

	// 	testingMatrixStack.pushMatrix();
	// 		testingMatrixStack.translate(1.5, 0.75, 0.3);
	// 		console.log("testing Matrix output for push, should be translated", testingMatrixStack.topMatrix());
	// 		testingMatrixStack.print();
	// 	testingMatrixStack.popMatrix();
	// 	console.log("testing Matrix output for pop, should just be identity", testingMatrixStack.topMatrix());
	// 	testingMatrixStack.print();

	// 	testingMatrixStack.pushMatrix();
	// 		testingMatrixStack.print();
	// 		console.log("now testing rotation on x axis");
	// 		testingMatrixStack.rotate(0.0, 0.0, 2.0);
	// 		testingMatrixStack.print();

	// 		testingMatrixStack.pushMatrix();
	// 			testingMatrixStack.print();
	// 			console.log("now testing scale");
	// 			testingMatrixStack.scale(0.5, 0.5, 0.5);
	// 			testingMatrixStack.print();
	// 		testingMatrixStack.popMatrix();
	// 	testingMatrixStack.popMatrix();

	// 	testingMatrixStack.pushMatrix();
	// 		testingMatrixStack.translate(1.5, 0.75, 0.3);
	// 		testingMatrixStack.print();

	// 		testingMatrixStack.pushMatrix();
	// 			testingMatrixStack.print();
	// 			console.log("testing Inverted matrix", testingMatrixStack.topMatrixIT());
	// 		testingMatrixStack.popMatrix();
	// 	testingMatrixStack.popMatrix();
			
	// 	testingMatrixStack.print();

		
		

	// testingMatrixStack.popMatrix();


	// 	// testingMatrixStack.pushMatrix();
	// 	// testingMatrixStack.translate(0.0, 0.0, 1.8);
	// 	// testingMatrixStack.pushMatrix();
	// 	// testingMatrixStack.translate(0.0, 3.3, 0.0);
	// 	// console.log("testing Matrix output at the end, should just be identity", testingMatrixStack.topMatrix());

	// testingMatrixStack.popMatrix();

	// testingCamera = new Camera();
	// // testingCamera.mouseClicked(0.1, 0.0, false, true, false);
	// // testingCamera.mouseMoved(0.5, 0.4);
	// P = new MatrixStack();

	// P.pushMatrix();
	// 	testingCamera.applyProjectionMatrix(P);
	// 	console.log("printing home made projection matrix");
	// 	P.print();
	// P.popMatrix();
	


	// //end of testing

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

	// //creating Matrix
	// var worldMatrix = new Float32Array(16);
	// var viewMatrix = new Float32Array(16);
	// var projMatrix = new Float32Array(16);
	// var invertedMatrix = new Float32Array(16);
	// var invertedTransposeMatrix = new Float32Array(16);
	// var temp = new Float32Array(16);
	// mat4.identity(worldMatrix);
	// mat4.lookAt(viewMatrix, [0, 0, -6], [0, 0, 0], [0, 1, 0]);
	// mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);
	// console.log("printing projection matrix", projMatrix);

	// //giving matrix values to shader
	// gl.uniformMatrix4fv(testingProgram.getUniform("mWorld"), gl.FALSE, worldMatrix);
	// gl.uniformMatrix4fv(testingProgram.getUniform("mView"), gl.FALSE, viewMatrix);
	// gl.uniformMatrix4fv(testingProgram.getUniform("mProj"), gl.FALSE, projMatrix);
	// mat4.multiply(temp, viewMatrix, worldMatrix);
	// mat4.invert(invertedMatrix, temp);
	// console.log("trying to find undefined", invertedMatrix, temp, viewMatrix, worldMatrix);
	// gl.uniformMatrix4fv(testingProgram.getUniform('MVit'), gl.FALSE, invertedMatrix);

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
		Scene1(testingProgram, bunnyModel, SusanModel);

		requestAnimationFrame(loop);	//calling this function again
	};
	requestAnimationFrame(loop);
};
