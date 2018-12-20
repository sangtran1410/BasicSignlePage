import React, { Component, PropTypes } from 'react'
import connect from 'connect-alt'

@connect(({ requests: { inProgress }, session: { session } }) => ({ inProgress, session }))

export default class ChildCom extends Component {
    static propTypes = {
        inProgress: PropTypes.bool
    }
	componentWillMount() {
		this.state = this.props;
	}

    render() {
        return (
            <div>
				{this.state.data}
			</div>
        )
    }
}
