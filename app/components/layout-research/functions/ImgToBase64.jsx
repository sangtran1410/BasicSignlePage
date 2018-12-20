import React, { Component, PropTypes } from 'react'
import { set } from 'lodash'

const API = require('components/api/common');

export default class ImgToBase64 extends Component {
	static propTypes = {
	}
	static contextTypes = {
		i18n: PropTypes.func.isRequired
	}

	state = {
		isLoading: false,
		imgURL: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/flip.jpg',
		file: {},
		minFile: {}
	}

	handleImgBase64WithURL() {
		this.setState({ isLoading: true });
		const { imgURL } = this.state
		const params = {
			url: imgURL
		}
		API.post('/api/image/base64', params, (err, res) => {
			const { file } = this.state;
			file.base64Str = res.body.base64Str
			this.setState({ isLoading: false, file });
		});
	}

	handleValue(path, e) {
		set(this.state, path, e.target.value);
		this.setState(this.state);
	}

	onDragOver(e) {
		e.preventDefault();
	}
	onDrop(e) {
		console.log('---------', 'onDrop')
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			this.readImage(files[0]);
		}
	}

	colectFromBrowser() {
		const files = document.getElementById('readimg').files;
		if (files.length > 0) {
			this.readImage(files[0]);
		}
	}

	simulateclick() {
		document.getElementById('readimg').click();
	}

	readImage(file) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);
		fileReader.onload = (e) => {
			file.base64Str = e.target.result;
			this.setState({ file })
			/** scale image */
			this.scaleImgByJimp(file.base64Str)
		};
	}

	bytesToSize(bytes) {
		const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB' ];
		if (bytes === 0) return '0 Bytes';
		const i = window.parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		const result = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		return result;
	}

	scaleImgByJimp(data) {
		console.log('---------', 'handleBuJimp')
		/** data = base64 or blobUrl*/
		window.Jimp.read(data).then((image) => {
			image.resize(250, window.Jimp.AUTO)            // resize
				.quality(10)                 // set JPEG quality
				// .greyscale()                 // set greyscale
				.getBase64(window.Jimp.MIME_JPEG, (err, base64Str) => {
					const minFile = { base64Str }
					this.setState({ minFile })
				});
		}).catch((err) => {
			console.error(err);
		});
	}

	render() {
		const { file = {}, imgURL, minFile = {} } = this.state;
		return (
			<div className="container" >
				<div className="col-sm-6">
					<input className="form-control" type="text" onChange={(e) => this.handleValue('imgURL', e)} value={imgURL} />
				</div>
				<div className="col-sm-6">
					<img src={imgURL} width="100" height="100" />
				</div>
				<button className="btn btn-primary" onClick={() => this.handleImgBase64WithURL()}>Handle Img To Base64 With URL</button>
				<hr />
				<div>
					<p>Get Image by browse:</p>
					<input style={{ display: 'none' }} id="readimg" onChange={() => this.colectFromBrowser()} type="file" name="imagereader" />
					<button id="openimage" onClick={() => this.simulateclick()}>open image form file system</button>
					<hr />
					<p>Or Get Image by Drag & Drop</p>
					<div id="getimage"></div>
					<div id="zona-drop" style={{ width: '200px', height: '200px', border: '1px dashed green' }} onDrop={(e) => this.onDrop(e)} onDragOver={(e) => this.onDragOver(e)}>
					</div>
				</div>

				<hr />
				<h3>Ogirin Image:</h3>
				<div className="row">
					<div className="col-sm-6">
						<img className="panel" src={file.base64Str} />
					</div>
					<div className="col-sm-3">
						<p>Name: {file.name}</p>
						<p>Size: {this.bytesToSize(file.size)}</p>
						<p>Type: {file.type}</p>
					</div>
					<div className="col-sm-3">
						<textarea id="getbase64" className="form-control" rows="10" value={file.base64Str} ></textarea>
					</div>
				</div>

				<h3>Min Image:</h3>
				<div className="row">
					<div className="col-sm-6">
						<img className="panel" src={minFile.base64Str} />
					</div>
					<div className="col-sm-6">
						<textarea id="getbase64" className="form-control" rows="10" value={minFile.base64Str} ></textarea>
					</div>
				</div>

			</div>
		)
	}
}
