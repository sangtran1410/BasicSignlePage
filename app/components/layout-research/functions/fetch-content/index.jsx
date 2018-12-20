import React, { Component, PropTypes } from 'react'
/*Private components*/

const API = require('components/api/common');

export default class ReactCycle extends Component {
	static propTypes = {
		inProgress: PropTypes.bool,
		session: PropTypes.object
	}
	static contextTypes = {
		locales: PropTypes.array.isRequired,
		flux: PropTypes.object.isRequired,
		i18n: PropTypes.func.isRequired
	}

	componentWillMount() {
		console.log('componentWillMount')
	}

	state = {
		url: 'http://khoahoc.tv/day-la-7-hang-o-tiem-nang-nhat-nguoi-ngoai-hanh-tinh-co-the-dang-tru-ngu-73181',
		isLoading: false,
		errMessage: ''
	}

	callGet() {
		this.setState({ isLoading: true });
		const params = {
			url: this.state.url
		};
		API.post('/api/read-meta-tag', params, (err, res) => {
			console.log(params)
			if (res && res.body) {
				this.setState({ isLoading: false, html: res.body.data });
			} else {
				this.setState({ isLoading: false, html: '' });
			}
		});
	}

	callGetWithJsdom() {
		this.setState({ isLoading: true });
		const params = {
			url: this.state.url
		};
		API.post('/api/read-meta-tag-with-jsdom', params, (err, res) => {
			console.log('callGetWithJsdom')
			if (res) {
				this.setState({ isLoading: false, html: res.body.body, dataStr: JSON.stringify(res.body.meta) });
			}
		});
	}

	callTranslate() {
		const params = {
			text: this.state.url
		};
		API.post('/api/google-translate', params, (err, res) => {
			console.log(res)
			console.log('google-translate')
			if (res) {
				this.setState({ isLoading: false, html: res.body.body, dataStr: JSON.stringify(res.body.meta) });
			}
		});
	}

	callReadFile() {
		this.setState({ isLoading: true });
		API.post('/read-file', {}, (err, res) => {
			if (res) {
				this.setState({ isLoading: false, html: res.body.body });
			}
		});
	}

	callGetBitlyLink() {
		console.log('callGetBitlyLink')
		this.setState({ isLoading: true });
		if (this.state.url) {
			const params = {
				url: this.state.url
			}
			API.post('/bitly/create', params, (err, res) => {
				console.log(res)
				this.setState({ isLoading: false, html: '', dataStr: res.body.shortUrl });
			});
		}
	}

	getGeoLocation() {
		/*
		http://www.latlong.net/c/?lat=10.852673099999999&long=106.634553
		http://www.latlong.net/
		*/
		console.log('callGetBitlyLink')
		navigator.geolocation.getCurrentPosition((position) => {
			const p = {
				accuracy: position.coords.accuracy,
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}
			this.setState({ isLoading: false, dataStr: JSON.stringify(p) });
		})
	}

	handlerOnChange(key, e) {
		this.state[key] = e.target.value;
		this.setState(this.state);
	}
	handleChange(evt) {
		this.setState({ html: evt.target.value });
	}

	render() {
		console.log('-------Render----')
		console.log(this.state)
		return (
			<div className="container" >
				<div className="row">
					<input className="form-control" value={this.state.url} onChange={(e) => this.handlerOnChange('url', e)} />
				</div>

				<hr />
				<div className="row">
					<div className="btn-group">
						<button onClick={() => this.callGet()} className="btn btn-info">Get Content html</button>
						<button onClick={() => this.callGetWithJsdom()} className="btn btn-success">Get Content + Jsdom</button>
						<button onClick={() => this.getGeoLocation()} className="btn btn-info">Get Location</button>
						<button onClick={() => this.callReadFile()} className="btn btn-success">Read file</button>
						<button onClick={() => this.callTranslate()} className="btn btn-success">Translate</button>
					</div>
				</div>

				<hr />
				<div className="row">
					<div className="btn-group">
						<button onClick={() => this.callGetBitlyLink()} className="btn btn-info">Get Bit.ly link</button>
					</div>
				</div>

				<hr />
				<div className="row">
					<div className="content-meta"> {this.state.dataStr}</div>
					<div className="content" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
				</div>

			</div>
		);
	}
}
