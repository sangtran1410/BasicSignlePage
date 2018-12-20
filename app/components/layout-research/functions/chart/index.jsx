import React, { Component, PropTypes } from 'react'


export default class Translate extends Component {
    static propTypes = {
    }
    static contextTypes = {
        i18n: PropTypes.func.isRequired
    }

	state = {
	}

    render() {
        return (
            <div className="container">
				<h1>Chart</h1>
			</div>
        )
    }
}
