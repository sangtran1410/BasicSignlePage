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
	saveImageFromUrl() {
		// to folder: /home/binh.nguyen/Documents/files/images
		const params = {
			url: 'man'
		};
		API.post('/api/saveImageFromUrl', params, (res) => {
			console.log('End saveImageFromUrl', res)
		});
	}
	saveStrToFile() {
		// to folder: app/images/upload/222.txt
		const params = {
			url: 'man'
		};
		API.post('/api/saveStrToFile', params, () => {
			console.log('End saveStrToFile')
		});
	}

    render() {
        return (
            <div className="container">
				<p>
					<button className="form-control" onClick={() => this.saveImageFromUrl()}>saveImageFromUrl</button>
				</p>
				<p>
					<button className="form-control" onClick={() => this.saveStrToFile()}>save String to File</button>
				</p>
			</div>
        )
    }
}
