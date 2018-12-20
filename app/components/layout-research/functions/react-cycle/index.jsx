import React, { Component, PropTypes } from 'react'
/*Private components*/
import ChildCom from './ChildCom';

export default class ReactCycle extends Component {
	static propTypes = {
		inProgress: PropTypes.bool
	}

	componentWillMount() {
		console.log('componentWillMount')
		this.state = {
			default: 'new',
			id: 'id'
		}
	}
	componentDidMount() {
		console.log('componentDidMount')
	}
	componentWillReceiveProps() {
		console.log('componentWillReceiveProps')
	}
	shouldComponentUpdate() {
		/*
		true (default): allow run render()
		false : not allow run render()
		*/
		console.log('shouldComponentUpdate')
		return true;
	}
	componentWillUpdate() {
		console.log('componentWillUpdate')
	}
	componentDidUpdate() {
		console.log('componentDidUpdate')
	}
	componentWillUnmount() {
		console.log('componentWillUnmount')
	}
	handleOnChange(e) {
		this.setState({ id: e.target.value });
	}
	testReplaceState() {
		this.setState({ id: new Date().getTime() })
	}
	testKey() {
		this.setState({ id: new Date().getTime() })
	}
	testForceUpdate() {
		/*Calling forceUpdate() will cause render() to be called on the component, skipping shouldComponentUpdate()*/
		this.forceUpdate(this.setState({ id: 'force' }))
	}
	test() {
		this.setState({ id: 'no force' })
	}

	render() {
		console.log('-------Render----')
		console.log(this.state)
		const { id } = this.state;
		return (
			<div>
				<h2>
					name 2
				</h2>
				<h3>
					name 2
				</h3>
				<h2>
					name 22
				</h2>
				<div className='input-group'>
					<span className='input-group-addon'>@</span>
					<input className='form-control' onChange={(e) => this.handleOnChange(e)} value={this.state.id} />
				</div>
				<div className='btn-group' role='group'>
					<button className='btn btn-info' onClick={(e) => this.testReplaceState(e)}>testReplaceState</button>
					<button className='btn btn-info' onClick={(e) => this.testKey(e)}>testKey</button>
					<button className='btn btn-info' onClick={(e) => this.testForceUpdate(e)}>testForceUpdate</button>
				</div>
				<br />
				<div className='btn-group' role='group'>
					<button className='btn btn-success' onClick={(e) => this.test(e)}>test</button>
				</div>
				{/*test children*/}
				<ChildCom data={`${id}-no key`} />
				<ChildCom key='static key' data={`${id}-static key`} />
				<ChildCom key={new Date().getTime()} data={`${id}-dynamic key`} />
			</div>
		);
	}
}
