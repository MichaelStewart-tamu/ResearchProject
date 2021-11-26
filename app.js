var InitDemo = function () {
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
					loadJSONResource('./sphere1.json', function (modelErr, modelObj) 
					{
						if (modelErr) 
						{
							alert('Fatal error getting Susan model (see console)');
							console.error(modelErr);
						} 
						else 
						{
							RunDemo(vsText, fsText, modelObj);
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

var RunDemo = function (vertexShaderText, fragmentShaderText, SusanModel) 
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
	
	// //
	// // Create shaders
	// // 
	// var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	// var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	// gl.shaderSource(vertexShader, vertexShaderText);
	// gl.shaderSource(fragmentShader, fragmentShaderText);

	// gl.compileShader(vertexShader);
	// if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	// 	console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
	// 	return;
	// }

	// gl.compileShader(fragmentShader);
	// if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	// 	console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
	// 	return;
	// }

	// var program = gl.createProgram();
	// gl.attachShader(program, vertexShader);
	// gl.attachShader(program, fragmentShader);
	// gl.linkProgram(program);
	// if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
	// 	console.error('ERROR linking program!', gl.getProgramInfoLog(program));
	// 	return;
	// }
	// gl.validateProgram(program);
	// if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
	// 	console.error('ERROR validating program!', gl.getProgramInfoLog(program));
	// 	return;
	// }

	//
	// Create buffer
	//
	// var susanVertices = SusanModel.verts;
	// var susanIndices = SusanModel.indices;
	// var susanTexCoords = SusanModel.texcoords;
	// var susanNormals = SusanModel.normals;

	// var susanPosVertexBufferObject = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanVertices), gl.STATIC_DRAW);

	// var susanTexCoordVertexBufferObject = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, susanTexCoordVertexBufferObject);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanTexCoords), gl.STATIC_DRAW);

	// var susanIndexBufferObject = gl.createBuffer();
	// gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, susanIndexBufferObject);
	// gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(susanIndices), gl.STATIC_DRAW);

	// var susanNormalBufferObject = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, susanNormalBufferObject);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(susanNormals), gl.STATIC_DRAW);

	//new way
	testingShape = new Shape();
	testingShape.init(SusanModel);

	// gl.bindBuffer(gl.ARRAY_BUFFER, susanPosVertexBufferObject);
	// // var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
	// var positionAttribLocation = testingProgram.getAttribute("vertPosition");
	// gl.vertexAttribPointer(
	// 	positionAttribLocation, // Attribute location
	// 	3, // Number of elements per attribute
	// 	gl.FLOAT, // Type of elements
	// 	gl.FALSE,
	// 	3 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
	// 	0 // Offset from the beginning of a single vertex to this attribute
	// );
	// gl.enableVertexAttribArray(positionAttribLocation);

	// gl.bindBuffer(gl.ARRAY_BUFFER, susanTexCoordVertexBufferObject);
	// // var texCoordAttribLocation = gl.getAttribLocation(program, 'vertTexCoord');
	// var texCoordAttribLocation = testingProgram.getAttribute("vertTexCoord");
	// gl.vertexAttribPointer(
	// 	texCoordAttribLocation, // Attribute location
	// 	2, // Number of elements per attribute
	// 	gl.FLOAT, // Type of elements
	// 	gl.FALSE,
	// 	2 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
	// 	0
	// );
	// gl.enableVertexAttribArray(texCoordAttribLocation);

	// gl.bindBuffer(gl.ARRAY_BUFFER, susanNormalBufferObject);
	// // var normalAttribLocation = gl.getAttribLocation(program, 'vertNormal');
	// var normalAttribLocation = testingProgram.getAttribute("vertNormal");
	// gl.vertexAttribPointer(
	// 	normalAttribLocation,
	// 	3, gl.FLOAT,
	// 	gl.TRUE,
	// 	3 * Float32Array.BYTES_PER_ELEMENT,
	// 	0
	// );
	// gl.enableVertexAttribArray(normalAttribLocation);

	// //
	// // Create texture
	// //
	// var susanTexture = gl.createTexture();
	// gl.bindTexture(gl.TEXTURE_2D, susanTexture);
	// gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	// gl.texImage2D(
	// 	gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
	// 	gl.UNSIGNED_BYTE,
	// 	SusanImage
	// );
	// gl.bindTexture(gl.TEXTURE_2D, null);

	// Tell OpenGL state machine which program should be active.
	// gl.useProgram(program);

	//calculating 
	// var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
	var matWorldUniformLocation = testingProgram.getUniform("mWorld");
	// var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
	var matViewUniformLocation = testingProgram.getUniform("mView");
	// var matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
	var matProjUniformLocation = testingProgram.getUniform("mProj");
	// MVit
	var matInvertedUniformLocation = testingProgram.getUniform('MVit');

	var worldMatrix = new Float32Array(16);
	var viewMatrix = new Float32Array(16);
	var projMatrix = new Float32Array(16);
	//view then world
	var invertedMatrix = new Float32Array(16);
	var temp = new Float32Array(16);
	mat4.identity(worldMatrix);
	mat4.lookAt(viewMatrix, [0, 0, -8], [0, 0, 0], [0, 1, 0]);
	mat4.perspective(projMatrix, glMatrix.toRadian(45), canvas.clientWidth / canvas.clientHeight, 0.1, 1000.0);

	
	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
	gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
	gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
	mat4.multiply(temp, viewMatrix, worldMatrix);
	mat4.invert(invertedMatrix, temp);
	console.log("trying to find undefined", invertedMatrix, temp, viewMatrix, worldMatrix);
	gl.uniformMatrix4fv(matInvertedUniformLocation, gl.FALSE, invertedMatrix);

	var xRotationMatrix = new Float32Array(16);
	var yRotationMatrix = new Float32Array(16);

	//
	// Lighting information
	//
	// gl.useProgram(program);

	// var ambientUniformLocation = gl.getUniformLocation(program, 'ambientLightIntensity');
	var ambientUniformLocation = testingProgram.getUniform("ambientLightIntensity");
	// var sunlightDirUniformLocation = gl.getUniformLocation(program, 'sun.direction');
	var sunlightDirUniformLocation = testingProgram.getUniform("sun.direction");
	// var sunlightIntUniformLocation = gl.getUniformLocation(program, 'sun.color');
	var sunlightIntUniformLocation = testingProgram.getUniform("sun.color");
	

	gl.uniform3f(ambientUniformLocation, 0.2, 0.2, 0.2);
	gl.uniform3f(sunlightDirUniformLocation, 3.0, 4.0, -2.0);
	gl.uniform3f(sunlightIntUniformLocation, 0.9, 0.9, 0.9);

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
		gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

		//new
		mat4.multiply(temp, viewMatrix, worldMatrix);
		mat4.invert(invertedMatrix, temp);
		gl.uniformMatrix4fv(matInvertedUniformLocation, gl.FALSE, invertedMatrix);


		gl.clearColor(0.40, 0.00, 0.0, 1.0);
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		// gl.bindTexture(gl.TEXTURE_2D, susanTexture);
		// gl.activeTexture(gl.TEXTURE0);

		//gl.drawElements(gl.TRIANGLES, susanIndices.length, gl.UNSIGNED_SHORT, 0);
		testingShape.draw(testingProgram);

		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};
