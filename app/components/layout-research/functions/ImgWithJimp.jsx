import React, { Component, PropTypes } from 'react'

/* Dependence : '/public/styles/lib/jimp/jimp.min.js' */

export default class ImgWithJimp extends Component {
    static propTypes = {
    }
    static contextTypes = {
        i18n: PropTypes.func.isRequired
    }

	state = {
		name: 'Image with Jimp',
		originSrc: 'http://static.pexels.com/photos/248797/pexels-photo-248797.jpeg',
		newSrc: '',
		functions: [
			{name: 'Write File', action: 'write', paramNum: 1, param1: 'lena-small-bw.jpg'  },
			{name: 'Quality', action: 'quality', paramNum: 1, param1: 10 },
			{name: 'Flip', action: 'flip', paramNum: 2, param1: true, param2: true  },
			{name: 'Invert', action: 'invert', paramNum: 0 },
			{name: 'Rotate', action: 'rotate', paramNum: 1, param1: 45 },
			{name: 'resize', action: 'resize', paramNum: 2, param1: 50, param2: window.Jimp.AUTO },
			{name: 'contain', action: 'contain', paramNum: 2, param1: 50, param2: 50 },
			{name: 'cover', action: 'cover', paramNum: 2, param1: 50, param2: 50 }
			// {name: 'scaleToFit', action: 'scaleToFit', paramNum: 2, param1: 50, param2: 50 }
			// {name: 'scale', action: 'scale', paramNum: 1, param1: 50 },
		]
	}

	// flip() {
	// 	const { originSrc } = this.state
	// 	window.Jimp.read(originSrc).then((image) => {
	// 		image.flip(true, true)
	// 			.getBase64(window.Jimp.MIME_JPEG, (err, base64Str) => {
	// 				this.setState({ newSrc: base64Str })
	// 			});
	// 	}).catch((err) => {
	// 		console.error(err);
	// 	});
	// }

	onGlobalChange({ paramNum = 0, action, param1, param2, param3, param4 } = {}) {
		const { originSrc } = this.state
		window.Jimp.read(originSrc).then((image) => {
			switch (paramNum) {
				case 1:
					image[action](param1)
						.getBase64(window.Jimp.MIME_JPEG, (err, base64Str) => {
							this.setState({ newSrc: base64Str })
					});
					break;
				case 2:
					image[action](param1, param2)
						.getBase64(window.Jimp.MIME_JPEG, (err, base64Str) => {
							this.setState({ newSrc: base64Str })
					});
					break;
				case 3:
					image[action](param1, param2, param3)
						.getBase64(window.Jimp.MIME_JPEG, (err, base64Str) => {
							this.setState({ newSrc: base64Str })
					});
					break;
				case 4:
					image[action](param1, param2, param3, param4)
						.getBase64(window.Jimp.MIME_JPEG, (err, base64Str) => {
							this.setState({ newSrc: base64Str })
					});
					break;
				default:
					image[action]()
						.getBase64(window.Jimp.MIME_JPEG, (err, base64Str) => {
							this.setState({ newSrc: base64Str })
					});
			}
		}).catch((err) => {
			console.error(err);
		});
	}

    render() {
		const { name: componentName, originSrc, newSrc, functions = [] } = this.state;
		
        return (
            <div className="container">
				<h3>{componentName} </h3>
				<div className="row">
					<div className="col-sm-6">
						<img width="100%" src={originSrc} />
					</div>
					<div className="col-sm-6">
						<img width="100%" src={newSrc} />
					</div>
				</div>
				<p>
					{functions.map((o, i) => {
						const { name } = o
						return (
							<button className="btn btn-primary" onClick={() => this.onGlobalChange(o)} key={i}>{name}</button>
						)
					})}
				</p>
			</div>
        )
    }
}
