import React, { Component, PropTypes } from 'react'
import { cloneDeep, merge } from 'lodash'

const CONSTANT = {
	isClear: false,
	canvasId: 'myCanvas',
	font: '20px Comic Sans MS',
	message: 'Hello World',
	lineWidth: 5,
	xStart: 0,
	yStart: 0,
	xEnd: 200,
	yEnd: 200,
	r: 50,
	startangle: 0,
	endangle: 2 * Math.PI,
	fillStyle: '',
	strokeStyle: '',
	textAlign: '',
	height: 100,
	width: 100,
	shadowBlur: 0,
	shadowColor: '',
	shadowOffsetX: 0,	// can be < 0
	shadowOffsetY: 0,
	imgId: 'image-id',
	direction: 'repeat'
}

export default class Canvas extends Component {
	static propTypes = {
	}
	static contextTypes = {
		i18n: PropTypes.func.isRequired
	}

	state = {
	}

	componentDidMount() {
		// this.drawLine()

		const c = document.getElementById('myCanvas');
		const { offsetLeft, offsetTop } = c
		c.addEventListener('click', (event) => {
			console.log('addEventListener')
			const x = event.pageX - offsetLeft;
			const y = event.pageY - offsetTop;

			// Collision detection between clicked offset and element.
			if (y > 0 && x > 0) {
				console.log(`clicked an element, ${x}, ${y}`);
			}
		}, false);
	}

	initCanvasDom(params = {}) {
		const { isClear, canvasId, fillStyle, strokeStyle, textAlign, font, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY } = params
		const c = document.getElementById(canvasId);
		const ctx = c.getContext('2d');

		ctx.fillStyle = fillStyle
		ctx.strokeStyle = strokeStyle
		ctx.textAlign = textAlign
		ctx.font = font
		ctx.shadowBlur = shadowBlur
		ctx.shadowColor = shadowColor
		ctx.shadowOffsetX = shadowOffsetX
		ctx.shadowOffsetY = shadowOffsetY

		if (isClear) {
			ctx.clearRect(0, 0, c.width, c.height);
		}
		return ctx
	}

	drawLine(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, xEnd, yEnd } = params

		ctx.moveTo(xStart, yStart);		// moveTo(x,y) - defines the starting point of the line
		ctx.lineTo(xEnd, yEnd);	// lineTo(x,y) - defines the ending point of the line
		ctx.stroke();
	}
	// drawCircle({ isClear = false, xStart = 95, yStart = 50, r = 200, startangle = 0, endangle = 2*Math.PI } = {}) {
	drawCircle(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, startangle, endangle, r } = params

		ctx.beginPath();					// beginPath() - begins a path
		ctx.arc(xStart, yStart, r, startangle, endangle);	// arc(x,y,r,startangle,endangle) 
		// Set start angle to 0 and end angle to 2*Math.PI. 
		// The x and y parameters define the x- and y-coordinates of the center of the circle. 
		// The r parameter defines the radius of the circle.
		ctx.stroke();
	}

	// drawText({ isClear = false, fillStyle = '', font = '30px Comic Sans MS', textAlign = '', message = 'Hello World', xStart = 95, yStart = 50 } = {}) {
	drawText(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, message } = params

		ctx.fillText(message, xStart, yStart);// fillText(text,x,y) - draws "filled" text on the canvas
	}

	// drawStrokeText({ isClear = false, font = '30px Comic Sans MS', message = 'Hello World', xStart = 95, yStart = 50 } = {}) {
	drawStrokeText(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, message } = params
		let { strokeStyle } = params

		const c = document.getElementById('myCanvas')

		// Create gradient
		strokeStyle = ctx.createLinearGradient(0, 0, c.width, 0);
		strokeStyle.addColorStop('0', 'magenta');
		strokeStyle.addColorStop('0.5', 'blue');
		strokeStyle.addColorStop('1', 'red');
		// Fill with gradient
		ctx.strokeStyle = strokeStyle;
		ctx.strokeText(message, xStart, yStart);	// strokeText(text,x,y) - draws text on the canvas (no fill)
	}

	drawStrokeRect(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, width, height, lineWidth } = params
		let { strokeStyle } = params

		strokeStyle = ctx.createLinearGradient(0, 0, 170, 0);
		strokeStyle.addColorStop('0', 'magenta');
		strokeStyle.addColorStop('0.5', 'blue');
		strokeStyle.addColorStop('1.0', 'red');
		// Fill with gradient
		ctx.strokeStyle = strokeStyle;
		ctx.lineWidth = lineWidth;
		ctx.strokeRect(xStart, yStart, width, height);	// context.strokeRect(x,y,width,height);
	}

	drawLinearGradient(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, width, height, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY } = params
		let { fillStyle } = params

		// Create gradient
		fillStyle = ctx.createLinearGradient(0, 0, 200, 0);	// createLinearGradient(x,y,x1,y1) - creates a linear gradient
		fillStyle.addColorStop(0, 'red');		// The addColorStop() method specifies the color stops, and its position along the gradient. 
		// Gradient positions can be anywhere between 0 to 1.
		fillStyle.addColorStop(1, 'white');
		// Fill with gradient
		ctx.fillStyle = fillStyle;
		// shadow
		ctx.shadowBlur = shadowBlur;
		ctx.shadowColor = shadowColor;
		ctx.shadowOffsetX = shadowOffsetX;	// can be < 0
		ctx.shadowOffsetY = shadowOffsetY;
		ctx.fillRect(xStart, yStart, width, height);	// fillRect(x,y,width,height)
	}

	drawRect(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, width, height } = params

		ctx.fillRect(xStart, yStart, width, height)
	}

	drawCircularGradient(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, width, height } = params
		let { fillStyle } = params

		// Create gradient
		fillStyle = ctx.createRadialGradient(75, 50, 5, 90, 60, 100);	// createRadialGradient(x,y,r,x1,y1,r1) - creates a radial/circular gradient
		fillStyle.addColorStop(0, 'red');
		fillStyle.addColorStop(1, 'white');
		// Fill with gradient
		ctx.fillStyle = fillStyle;
		ctx.fillRect(xStart, yStart, width, height);
	}

	drawImage(params = {}) {
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, imgId } = params

		const img = document.getElementById(imgId);
		ctx.drawImage(img, xStart, yStart);		// drawImage(image,x,y)
	}

	drawWithPattern(params = {}) {
		// direction: repeat, no-repeat, repeat-x, repeat-y
		params = merge(cloneDeep(CONSTANT), params)
		const ctx = this.initCanvasDom(params)
		const { xStart, yStart, direction, width, height, canvasId } = params
		
		const c = document.getElementById(canvasId)

		ctx.clearRect(0, 0, c.width, c.height);
		const img = document.getElementById('image-sm-id')
		const pat = ctx.createPattern(img, direction);
		ctx.rect(xStart, yStart, width, height);
		ctx.fillStyle = pat;
		ctx.fill();
	}

	drawAll() {
		this.drawLine({ isClear: true })
		this.drawCircle()
		this.drawText()
		this.drawStrokeText()
		this.drawStrokeRect()
		this.drawLinearGradient()
		this.drawCircularGradient()
	}

	drawItem() {
		const { canvasId } = CONSTANT
		const xStart = document.querySelector(`#${canvasId}`).width/2
		const yStart = document.querySelector(`#${canvasId}`).height/2
		const isClear = true 
		const width = 200 
		const height = 100

		const space = 200

		/* center item */
		this.drawRect({xStart, yStart, isClear, width, height})
		this.drawStrokeText({xStart, yStart: yStart+30})

		/* right item */
		const xStartR = xStart + width + space
		const yStartR = yStart
		this.drawLine({xStart: xStart + width, yStart: yStart + height/2, xEnd: xStartR, yEnd: yStartR + height/2})
		this.drawRect({xStart: xStartR, yStart: yStartR, width, height})
		this.drawStrokeText({xStart: xStartR, yStart: yStartR+30})

		/* right bottom item */
		const xStartRB = xStartR
		const yStartRB = yStartR + space
		this.drawLine({xStart: xStart + width, yStart: yStart + height/2, xEnd: xStartRB, yEnd: yStartRB + height/2})
		this.drawRect({xStart: xStartRB, yStart: yStartRB, width, height})
		this.drawStrokeText({xStart: xStartRB, yStart: yStartRB+30})

		/* right top item */
		const xStartRT = xStartR
		const yStartRT = yStart - space
		this.drawLine({xStart: xStart + width, yStart: yStart + height/2, xEnd: xStartRT, yEnd: yStartRT + height/2})
		this.drawRect({xStart: xStartRT, yStart: yStartRT, width, height})
		this.drawStrokeText({xStart: xStartRT, yStart: yStartRT+30})

		/* left item */
		const xStartL = xStart - space - width
		const yStartL = yStart
		this.drawLine({xStart, yStart: yStart + height/2, xEnd: xStart - space, yEnd: yStartL + height/2})
		this.drawRect({xStart: xStartL, yStart: yStartL, width, height})
		this.drawStrokeText({xStart: xStartL, yStart: yStartL+30})

		/* left bottom item */
		const xStartLB = xStartL
		const yStartLB = yStart + space
		this.drawLine({xStart, yStart: yStart + height/2, xEnd: xStart - space, yEnd: yStartLB + height/2})
		this.drawRect({xStart: xStartLB, yStart: yStartLB, width, height})
		this.drawStrokeText({xStart: xStartLB, yStart: yStartLB+30})

		/* left top item */
		const xStartLT = xStartL
		const yStartLT = yStart - space
		this.drawLine({xStart, yStart: yStart + height/2, xEnd: xStart - space, yEnd: yStartLT + height/2})
		this.drawRect({xStart: xStartLT, yStart: yStartLT, width, height})
		this.drawStrokeText({xStart: xStartLT, yStart: yStartLT+30})
	}


	render() {
		console.log('canvas page')
		const style = {
			border: '1px solid #000000'
		}
		const canvasWidth = window ? window.innerWidth - 500 : 500
		const canvasHeight = window ? window.innerHeight : 500
		return (
			<div className="container">
				<h1>Canvas demo</h1>
				<div className="row">
					<div className="btn-group">
						<button onClick={() => this.drawLine({ isClear: true })} className="btn btn-info">Draw line</button>
						<button onClick={() => this.drawCircle({ isClear: true, xStart: 95, yStart: 50 })} className="btn btn-info">Draw circle</button>
						<button onClick={() => this.drawText({ isClear: true, xStart: 95, yStart: 50 })} className="btn btn-info">Draw text</button>
						<button onClick={() => this.drawStrokeText({ isClear: true, xStart: 95, yStart: 50 })} className="btn btn-info">Draw stroke text</button>
						<button onClick={() => this.drawStrokeRect({ isClear: true })} className="btn btn-info">Draw stroke rect</button>
						<button onClick={() => this.drawLinearGradient({ isClear: true })} className="btn btn-info">Draw Linear Gradient</button>
						<button onClick={() => this.drawCircularGradient({ isClear: true })} className="btn btn-info">Draw Circular Gradient</button>
						<button onClick={() => this.drawImage({ isClear: true })} className="btn btn-info">Draw Image</button>
						<button onClick={() => this.drawWithPattern({ isClear: true })} className="btn btn-info">Draw With pattern</button>
						<button onClick={() => this.drawAll()} className="btn btn-info">Draw All</button>
						<button onClick={() => this.drawItem()} className="btn btn-info">Draw Item</button>
					</div>
				</div>
				<div className="row" id="canvas-container">
					<canvas id="myCanvas" width={canvasWidth} height={canvasHeight} style={style}>
						Your browser does not support the HTML5 canvas tag.</canvas>
				</div>
				<img id="image-id" src="https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg" />
				<img id="image-sm-id" src="https://www.w3schools.com/tags/img_lamp.jpg" />
			</div>
		)
	}
}
