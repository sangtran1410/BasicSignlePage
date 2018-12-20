import React, { Component, PropTypes } from 'react'
import Loading from 'components/shared/loading'
const API = require('components/api/common');

export default class PublishingFacebook extends Component {
    static propTypes = {
    }
    static contextTypes = {
        i18n: PropTypes.func.isRequired
    }

	state = {}

	publishing(type = '') {
		this.setState({isLoading: true})
		const params = {
			url: 'man'
		};
		API.post(`/api/sharesocial/${type}`, params, (err, res) => {
			console.log(res.body)
			this.setState({respond: res.body, isLoading: false})
		});
	}
	getProfile() {
		const params = {
			url: 'man'
		};
		API.post('/api/getprofile', params, (err, res) => {
			this.setState({respond: res.body, isLoading: false})
			console.log(res.body)
		});
	}

    render() {
		const { respond = [], isLoading } = this.state
        return (
            <div className="container">
				<Loading isLoading={isLoading}/>
				<div className="row">
					<button onClick={() => this.publishing('facebook')} className="btn btn-primary">1.Share Facebook</button> 
					- 
					<button onClick={() => this.publishing('twitter')} className="btn btn-primary">2.Share Twitter</button>
					-
					<button onClick={() => this.publishing('linkedin')} className="btn btn-primary">3.Share LinkedIn</button>
					-
					<button onClick={() => this.publishing('all')} className="btn btn-primary">4.Share All</button>
				</div>
				<hr />
				<div className="row">
					<button onClick={() => this.getProfile()} className="btn btn-primary">5.Get Facebook Profile</button>
				</div>
				<hr />
				<div className="row">
					{respond.map((e, i) => {
						const { type, data = {} } = e
						console.log(e)
						let name = ''
						let user = ''
						let image = ''
						switch (type) {
							case 'facebook':
								name = data.name || ''
								user = data.screen_name || ''
								user = data.screen_name || ''
								break;
							case 'twitter':
								name = data.name || ''
								user = data.screen_name || ''
								image = data.profile_image_url || ''
								break;
							case 'linkedin':
								name = data.headline || ''
								user = data.firstName || ''
								image = data.pictureUrl || ''
								break;
							default:
						}
						return (
							<div key={i} style={{ width: '100%', float: 'left'}}>
								<span>Type: {type} --- </span>
								<span>User: {user} --- </span>
								<span>Name: {name} --- </span>
								<img src={image} width="30" height="30" />
							</div>
						)
					})}
				</div>
				-------------------------------------
				<div>
					{JSON.stringify(respond)}
				</div>
			</div>
        )
    }
}
