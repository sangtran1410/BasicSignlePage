import React, { Component, PropTypes } from 'react'

const API = require('components/api/common');

export default class Translate extends Component {
    static propTypes = {
    }
    static contextTypes = {
        i18n: PropTypes.func.isRequired
    }

	state = {
		language: {
			name: '',
			ho: ''
		},
		dataStr: ''
	}

	handlerOnChange(key, e) {
		console.log('handlerOnChange')
		const { language } = this.state;
		language[key] = e.target.value
		this.setState({ language })
	}

	callTranslate() {
		const params = {
			url: 'man'
		};
		API.post('/api/google-translate', params, (err, res) => {
			console.log(res)
			console.log('google-translate')
			if (res && res.body && res.body.arr) {
				this.setState({ isLoading: false, dataStr: JSON.stringify(res.body.arr) });
			}
		});
	}

    render() {
		const { language, dataStr } = this.state;
        return (
            <div className="container">
				{Object.keys(language).map((k) => {
					const value = language[k]
					return (
						<input key={k} className="form-control" value={value} onChange={(e) => this.handlerOnChange(k, e)} />
					)
				})}
				<button onClick={() => this.callTranslate()}>Translate</button>
				<p>{dataStr}</p>
			</div>
        )
    }
}
