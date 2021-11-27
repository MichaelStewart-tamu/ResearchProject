var InitDemo = function () 
{
	loadTextResource('./shader.vs.glsl', function (vsErr, vsText) 
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
									RunDemo(vsText, fsText, model0Obj, model1Obj);
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

var RunDemo = function (vertexShaderText, fragmentShaderText, SusanModel, bunnyModel) 
{
	console.log('This is working');
	model = SusanModel;

	

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	//initializing the program
	testingProgram = new Program();
	// testingProgram.setShaderNames('./shader.vs.glsl', './shader.fs.glsl');
	testingProgram.setShaderNames(vertexShaderText, fragmentShaderText);
	console.log("after setShaderNames");
	testingProgram.init();
	testingProgram.bind();
	testingProgram.addAttribute('vertPosition');
	testingProgram.addAttribute('vertTexCoord');
	testingProgram.addAttribute('vertNormal');
	//mWorld, mView, mProj
	testingProgram.addUniform('mWorld');
	testingProgram.addUniform('mView');
	testingProgram.addUniform('mProj');
	testingProgram.addUniform('MVit');
	//ambientLightIntensity, sun.direction, sun.color
	testingProgram.addUniform('ambientLightIntensity');
	testingProgram.addUniform('sun.direction');
	testingProgram.addUniform('sun.color');
	
	
	//creating shapes
	testingShape = new Shape();
	testingShape.init(SusanModel);

	bunnyShape = new Shape();
	bunnyShape.init(bunnyModel);

	//starting matrix creating
	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	//view then world
	var invertedMatrix = new Float32Array(16);
	var invertedTransposeMatrix = new Float32Array(16);
	var temp = new Float32Array(16);
	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	
	gl.uniformMatrix4fv(testingProgram.getUniform("mWorld"), gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(testingProgram.getUniform("mView"), gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(testingProgram.getUniform("mProj"), gl.FALSE, projMatrix);
	mat4.multiply(temp, viewMatrix, worldMatrix);
	mat4.invert(invertedMatrix, temp);
	console.log("trying to find undefined", invertedMatrix, temp, viewMatrix, worldMatrix);
	gl.uniformMatrix4fv(testingProgram.getUniform('MVit'), gl.FALSE, invertedMatrix);

	var xRotationMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);

	//
	// Lighting information
	//
	// gl.useProgram(program);

	gl.uniform3f(testingProgram.getUniform("ambientLightIntensity"), 0.2, 0.2, 0.2);
	gl.uniform3f(testingProgram.getUniform("sun.direction"), 3.0, 4.0, -2.0);
	gl.uniform3f(testingProgram.getUniform("sun.color"), 0.9, 0.9, 0.9);

	 //checking for errors
	 let glErr = gl.getError();
	 if(glErr != gl.NO_ERROR) 
	 {
		 console.log("GL_ERROR from before render loop = %s.\n", glErr);
	 }
	//
	// Main render loop
	//
	var identityMatrix = new Float32Array(16);
	mat4.identity(identityMatrix);
	var angle = 0;
	var anglex = 1;
	var angley = 1;
	var loop = function () {

		angle = performance.now() / 1000 / 6 * 2 * Math.PI;
		mat4.rotate(yRotationMatrix, identityMatrix, angle + anglex, [0, 1, 0]);
		mat4.rotate(xRotationMatrix, identityMatrix, (angle / 4) + angley, [1, 0, 0]);
		mat4.mul(worldMatrix, yRotationMatrix, xRotationMatrix);
		gl.uniformMatrix4fv(testingProgram.getUniform("mWorld"), gl.FALSE, worldMatrix);

		//new
		mat4.multiply(temp, viewMatrix, worldMatrix);
		mat4.invert(invertedMatrix, temp);	//invert
		//now transpose
		mat4.transpose(invertedTransposeMatrix, invertedMatrix);
		gl.uniformMatrix4fv(testingProgram.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);


		gl.clearColor(0.40, 0.00, 0.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
		
		bunnyShape.init(bunnyModel);
		console.log("drawing bunny");
		bunnyShape.draw(testingProgram);

		var translation = vec3.create();
		vec3.set(translation, 0.0, -0.65, 0.0);
		mat4.translate(worldMatrix, worldMatrix, translation);
		gl.uniformMatrix4fv(testingProgram.getUniform("mWorld"), gl.FALSE, worldMatrix);
		

		mat4.multiply(temp, viewMatrix, worldMatrix);
		mat4.invert(invertedMatrix, temp);	//invert
		mat4.transpose(invertedTransposeMatrix, invertedMatrix);
		gl.uniformMatrix4fv(testingProgram.getUniform('MVit'), gl.FALSE, invertedTransposeMatrix);
		
		testingShape.init(SusanModel);
		console.log("drawing cylinder");
		testingShape.draw(testingProgram);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};
